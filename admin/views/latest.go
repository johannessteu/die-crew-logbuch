package views

import (
	"github.com/johannesste/die-crew-logbuch/admin/svc"
	"github.com/jroimartin/gocui"
)

type LatestFrame struct {
	name    string
	logbuch *svc.Logbuch
}

func NewLatestFrame(name string, logbuch *svc.Logbuch) *LatestFrame {
	return &LatestFrame{name: name, logbuch: logbuch}
}

func (l LatestFrame) Render(g *gocui.Gui, v *gocui.View) string {
	return "Frame Latest"
}

func (l LatestFrame) Name() string {
	return l.name
}
