package gui

import (
	"fmt"
	"github.com/johannesste/die-crew-logbuch/admin/svc"
	v "github.com/johannesste/die-crew-logbuch/admin/views"
	"github.com/jroimartin/gocui"
	"log"
)

type FrameType string

const (
	LatestView   FrameType = "latest"
	MissionsView FrameType = "missions"
	NewGamesView FrameType = "newGames"
)

type FrameInterface interface {
	Render(g *gocui.Gui, v *gocui.View) string
	Name() string
}

type Gui struct {
	g           *gocui.Gui
	logbuch     *svc.Logbuch
	currentView FrameType
	frames      map[FrameType]FrameInterface
}

func NewGui(g *gocui.Gui, l *svc.Logbuch) *Gui {
	latest := v.NewLatestFrame("latest", l)
	missions := v.NewMissionsFrame("missions", l)
	games := v.NewGamesFrame("newGames", l)

	var frames map[FrameType]FrameInterface = map[FrameType]FrameInterface{LatestView: latest, MissionsView: missions, NewGamesView: games}
	return &Gui{g: g, currentView: LatestView, frames: frames, logbuch: l}
}

func (gui *Gui) Init(g *gocui.Gui) {
	g.Cursor = true
	g.Mouse = false
	g.SelFgColor = gocui.ColorGreen
	g.Highlight = true

	g.SetManager(gui)

	if err := g.SetKeybinding("", gocui.KeyTab, gocui.ModNone, switchView); err != nil {
		log.Panicln(err)
	}

	if err := g.SetKeybinding("", gocui.KeyCtrlC, gocui.ModNone, quit); err != nil {
		log.Panicln(err)
	}

	if err := BindNavigationArrowKeys(g, "task"); err != nil {
		log.Panicln(err)
	}

	if err := BindNavigationArrowKeys(g, "content"); err != nil {
		log.Panicln(err)
	}

	if err := BindNavigationArrowKeys(g, "popup"); err != nil {
		log.Panicln(err)
	}

	if err := g.MainLoop(); err != nil && err != gocui.ErrQuit {
		log.Panicln(err)
	}
}

func (gui *Gui) Layout(g *gocui.Gui) error {
	maxX, maxY := g.Size()

	curView := g.CurrentView()

	if v, err := g.SetView("task", 0, 0, 16, maxY-1); err != nil {
		if err != gocui.ErrUnknownView {
			return err
		}
		v.Title = "Tasks"
		v.Editable = false

		if curView != nil && curView.Name() == "task" {
			v.Highlight = true
		}

		if err = g.SetKeybinding("task", gocui.KeyEnter, gocui.ModNone, gui.SelectFrame); err != nil {
			return err
		}

		if _, err = g.SetCurrentView("task"); err != nil {
			return err
		}

		fmt.Fprintln(v, renderTaskList())
	}

	if v, err := g.SetView("content", 17, 0, maxX-1, maxY-1); err != nil {
		if err != gocui.ErrUnknownView {
			return err
		}

		v.Title = "Tasks"
		v.Editable = false

		if curView != nil && curView.Name() == "content" {
			v.Highlight = true
		}

		fmt.Fprintln(v, g.CurrentView().Title)
	}

	return nil
}

func BindNavigationArrowKeys(g *gocui.Gui, viewName string) error {
	if err := g.SetKeybinding(viewName, gocui.KeyArrowDown, gocui.ModNone, bindKeyArrowDown); err != nil {
		return err
	}
	if err := g.SetKeybinding(viewName, gocui.KeyArrowUp, gocui.ModNone, bindKeyArrowUp); err != nil {
		return err
	}
	return nil
}

func (gui *Gui) SelectFrame(g *gocui.Gui, v *gocui.View) error {
	_, y := v.Cursor()

	text, err := v.Line(y)
	if err != nil {
		return err
	}

	if contentView, err := g.View("content"); contentView != nil && err == nil {
		contentView.Clear()
		contentView.Title = text
		switch text {
		case "New Games":
			fmt.Fprintln(contentView, gui.frames[NewGamesView].Render(g, contentView))
		case "Missions":
			fmt.Fprintln(contentView, gui.frames[MissionsView].Render(g, contentView))
		case "Latest":
			fmt.Fprintln(contentView, gui.frames[LatestView].Render(g, contentView))
		default:
			fmt.Println("Unknown view")
		}
	}

	g.SetCurrentView("content")

	return nil
}

func switchView(g *gocui.Gui, v *gocui.View) error {
	curView := g.CurrentView()
	if curView != nil {
		v.SetCursor(0, 0)
		if curView.Name() == "task" {
			if _, err := g.SetCurrentView("content"); err != nil {
				return err
			}
		} else {
			if _, err := g.SetCurrentView("task"); err != nil {
				return err
			}
		}
	}

	return nil
}

func bindKeyArrowDown(g *gocui.Gui, v *gocui.View) error {
	if v != nil {
		_, y := v.Cursor()
		if y < len(v.BufferLines())-2 {
			v.SetCursor(0, y+1)
		}
	}
	return nil
}

func bindKeyArrowUp(g *gocui.Gui, v *gocui.View) error {
	if v != nil {
		_, y := v.Cursor()
		if y > 0 {
			v.SetCursor(0, y-1)
		}
	}
	return nil
}

func quit(g *gocui.Gui, v *gocui.View) error {
	return gocui.ErrQuit
}

func renderTaskList() string {
	return fmt.Sprint("New Games" +
		"\n" + "Missions" + "\n" + "Latest" + "\n" + "Statistics")
}
