package cmd

import (
	crewApp "github.com/johannesste/die-crew-logbuch/admin/app"
	"log"
	"os"

	"github.com/spf13/cobra"
)

// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "die-crew",
	Short: "Runs the crew admin tool",
	Long:  `A longer description that spans multiple lines and likely contains`,
	Run: func(cmd *cobra.Command, args []string) {
		devMode, err := cmd.Flags().GetBool("devMode")

		if err != nil {
			log.Fatal(err)
		}

		app := crewApp.NewApp(devMode)
		app.Run()
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.PersistentFlags().BoolP("devMode", "d", true, "Enable dev mode")
}
