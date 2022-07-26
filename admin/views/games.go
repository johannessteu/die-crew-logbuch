package views

import (
	"fmt"
	"github.com/johannesste/die-crew-logbuch/admin/svc"
	"github.com/johannesste/die-crew-logbuch/admin/util"
	"github.com/jroimartin/gocui"
	"math"
	"strings"
)

type GamesFrame struct {
	name    string
	logbuch *svc.Logbuch
}

func NewGamesFrame(name string, logbuch *svc.Logbuch) *GamesFrame {
	return &GamesFrame{name: name, logbuch: logbuch}
}

func (l GamesFrame) Render(g *gocui.Gui, v *gocui.View) string {
	var out string

	x, y := v.Size()
	games := l.logbuch.NewestGames(y)

	v.Highlight = true

	out += fmt.Sprintf("%s | %s | %s | %s | %s | %s | %s \n",
		fmt.Sprintf("%8s", "ID"),
		fmt.Sprintf("%6s", "Type"),
		fmt.Sprintf("%10s", "Datum"),
		fmt.Sprintf("%8s", "Mission"),
		fmt.Sprintf("%9s", "Spieler"),
		fmt.Sprintf("%13s", "Played minutes"),
		"Crew",
	)

	out += strings.Repeat("=", x) + "\n"

	g.SetKeybinding("content", gocui.KeyEnter, gocui.ModNone, l.RenderGamePopup)
	g.SetKeybinding("content", gocui.KeyCtrlF, gocui.ModNone, l.RenderSearchPopUp)

	for _, game := range games {
		out += fmt.Sprintf("%s | %s | %s | %s | %s | %s | %s \n",
			fmt.Sprintf("%8s", game.Id),
			fmt.Sprintf("%6s", game.Type),
			game.StartedAt.Format("02.01 15:04"),
			fmt.Sprintf("%8d", game.CurrentMission),
			fmt.Sprintf("%9d", len(game.Players)),
			fmt.Sprintf("%13s", util.FormatSecondsToTimeString(game.TookTotal)),
			game.CrewName)
	}

	return out
}

func (l GamesFrame) RenderSearchPopUp(g *gocui.Gui, v *gocui.View) error {
	if _, err := g.SetView("search", 0, 0, 30, 10); err != nil {
		if err != gocui.ErrUnknownView {
			return err
		}
		v.Title = "Search"
		v.Wrap = true
		v.Autoscroll = true
		v.Editable = true
		v.Editable = true
		v.Frame = true
		v.Highlight = true
		v.SelFgColor = gocui.ColorGreen
		v.SelBgColor = gocui.ColorBlack
		v.SetCursor(0, 0)
	}
	return nil
}

func (l GamesFrame) RenderGamePopup(g *gocui.Gui, v *gocui.View) error {
	x, y := g.Size()
	_, cy := v.Cursor()
	line, _ := v.Line(cy)

	percentileX := x / 10
	percentileY := y / 10

	v, _ = g.SetView("popup", percentileX, percentileY, percentileX*8, percentileY*8)

	g.DeleteKeybinding("popup", gocui.KeyArrowUp, gocui.ModNone)
	g.DeleteKeybinding("popup", gocui.KeyArrowDown, gocui.ModNone)

	g.SetKeybinding("popup", gocui.KeySpace, gocui.ModNone, func(g *gocui.Gui, v *gocui.View) error {
		g.DeleteView("popup")
		g.SetCurrentView("content")
		return nil
	})

	if err := g.SetKeybinding("popup", gocui.KeyArrowUp, gocui.ModNone,
		func(g *gocui.Gui, v *gocui.View) error {
			scrollView(v, -1)
			return nil
		}); err != nil {
		return err
	}
	if err := g.SetKeybinding("popup", gocui.KeyArrowDown, gocui.ModNone,
		func(g *gocui.Gui, v *gocui.View) error {
			scrollView(v, 1)
			return nil
		}); err != nil {
		return err
	}

	gameId := strings.TrimSpace(line[:strings.IndexByte(line, '|')])
	game, err := l.logbuch.FindGame(gameId)

	if err != nil {
		fmt.Fprintln(v, "Game not found!", err)
	}

	var out, rightSide, leftSide string

	// Add player output
	leftSide += "Players:\n \n"
	for i, player := range game.Players {
		leftSide += fmt.Sprintf("%d. %s\n", i+1, player)
	}

	// Add stats output
	rightSide += "Stats:\n \n"
	rightSide += fmt.Sprintf("%s: %s\n", "Type", game.Type)
	rightSide += fmt.Sprintf("%s: %s\n", "CrewName", game.CrewName)
	rightSide += fmt.Sprintf("%s: %s\n", "Started at", game.StartedAt.Format("02.01 15:04"))
	rightSide += fmt.Sprintf("%s: %d\n", "Current mission", game.CurrentMission)
	rightSide += fmt.Sprintf("%s: %s\n", "Played time", util.FormatSecondsToTimeString(game.TookTotal))

	// combine left and right side
	leftParts := strings.Split(leftSide, "\n")
	rightParts := strings.Split(rightSide, "\n")

	maxLen := int(math.Max(float64(len(leftParts)), float64(len(rightParts))))
	sideLength := int(percentileX*6/2 - 2)

	for i := 0; i < maxLen; i++ {
		var line string

		if i < len(leftParts) {
			line += fmt.Sprintf("%-*s", sideLength, leftParts[i])
		} else {
			line += strings.Repeat(" ", sideLength)
		}

		line += "  ##  "

		if i < len(rightParts) {
			line += fmt.Sprintf("%-*s", sideLength, rightParts[i])
		} else {
			line += strings.Repeat(" ", sideLength)
		}
		out += line + "\n"
	}

	out += strings.Repeat("#", percentileX*8) + "\n \n"

	out += "Missions:\n \n"

	for _, mission := range game.Missions {
		out += fmt.Sprintf("%3d) Trials: %d | Time: %s | Date: %s\n",
			mission.Number,
			mission.Trials, fmt.Sprintf("%8s", util.FormatSecondsToTimeString(mission.Took)),
			mission.StartedAt.Format("02.01. 15:04 Uhr"))

		if len(mission.Note) > 0 {
			out += fmt.Sprintf("  Note: %s \n", mission.Note)
		}
		out += strings.Repeat(" . ", percentileX) + "\n"
	}

	v.Title = fmt.Sprintf("%s - %s", gameId, game.CrewName)

	fmt.Fprintln(v, out)

	g.SetCurrentView("popup")

	return nil
}

func (l GamesFrame) Name() string {
	return l.name
}

func scrollView(v *gocui.View, dy int) error {
	if v != nil {
		v.Autoscroll = false
		ox, oy := v.Origin()
		if err := v.SetOrigin(ox, oy+dy); err != nil {
			return err
		}
	}
	return nil
}
