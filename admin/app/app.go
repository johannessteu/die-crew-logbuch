package app

import (
	ui "github.com/gizak/termui/v3"
	"github.com/gizak/termui/v3/widgets"
	"github.com/johannesste/die-crew-logbuch/admin/gui"
	"github.com/johannesste/die-crew-logbuch/admin/svc"
	"log"
)

type App struct {
	logbuch *svc.Logbuch
}

func NewApp(devMode bool) *App {
	logbuch := svc.NewLogbuch(devMode)

	return &App{logbuch: logbuch}
}

func (a *App) Run() {
	if err := ui.Init(); err != nil {
		log.Fatalf("failed to initialize termui: %v", err)
	}
	defer ui.Close()

	menu := gui.RenderMenu()

	renderContent := func() {
		switch menu.ActiveTabIndex {
		case 0:
			ui.Render(gui.RenderNewGames())
		}
	}

	ui.Render(menu)

	uiEvents := ui.PollEvents()

	for {
		e := <-uiEvents
		// Main menu navigation
		switch e.ID {
		case "<Shift+Tab>":
			fallthrough
		case "h":
			menu.FocusLeft()
			renderContent()

		case "<Tab>", "l":
			menu.FocusRight()
			ui.Clear()
			ui.Render(menu)
		case "q", "<C-c>":
			return
		default:
			w := widgets.NewParagraph()
			w.Text = "asdfsafsdf"
			w.SetRect(0, 50, 50, 70)
			ui.Clear()
			ui.Render(menu)
			ui.Render(w)
		}
	}
}
