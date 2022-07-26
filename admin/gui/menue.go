package gui

import (
	ui "github.com/gizak/termui/v3"
	"github.com/gizak/termui/v3/widgets"
)

func RenderMenu() *widgets.TabPane {
	tabPane := widgets.NewTabPane("New Games", "Stats")
	tabPane.ActiveTabIndex = 0

	x, _ := ui.TerminalDimensions()

	tabPane.Title = "Menu"

	tabPane.SetRect(0, 1, x, 4)
	tabPane.Border = true

	tabPane.ActiveTabStyle = ui.Style{
		Fg:       ui.ColorWhite,
		Bg:       ui.ColorCyan,
		Modifier: ui.ModifierUnderline,
	}

	return tabPane
}
