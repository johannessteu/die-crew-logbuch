package views

import (
	"github.com/johannesste/die-crew-logbuch/admin/svc"
	"github.com/jroimartin/gocui"
)

type MissionsFrame struct {
	name    string
	logbuch *svc.Logbuch
}

func NewMissionsFrame(name string, logbuch *svc.Logbuch) *MissionsFrame {
	return &MissionsFrame{name: name, logbuch: logbuch}
}

func (l MissionsFrame) Render(g *gocui.Gui, v *gocui.View) string {
	return "MFrame issions"
}

func (l MissionsFrame) Name() string {
	return l.name
}
