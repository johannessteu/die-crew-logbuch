package util

import (
	"fmt"
	"math"
)

func FormatSecondsToTimeString(milliSeconds int64) string {
	seconds := int(math.Ceil(float64(milliSeconds / 1000)))

	hours := seconds / 3600

	if hours > 0 {
		minutes := (seconds - hours*3600) / 60
		return fmt.Sprintf("%d Std %02d min", hours, minutes)
	}

	return fmt.Sprintf("%d min", seconds/60)
}
