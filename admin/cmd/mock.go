package cmd

import (
	"github.com/johannesste/die-crew-logbuch/admin/svc"
	"github.com/spf13/cobra"
	"log"
)

func init() {
	rootCmd.AddCommand(mockCommand)
}

var mockCommand = &cobra.Command{
	Use:   "mock",
	Short: "Update the mock data",
	Long:  `Update all current mock data`,
	Run: func(cmd *cobra.Command, args []string) {
		devMode, err := cmd.Flags().GetBool("devMode")

		if err != nil {
			log.Panicln(err)
		}

		logbuch := svc.NewLogbuch(devMode)
		logbuch.UpdateMockData()
	},
}
