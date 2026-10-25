import { describe, expect, it } from "vitest";
import { weekdayColor } from "./weekday-color";

describe("weekday colors", () => {
  it.each([
    ["2026-11-07T12:00:00Z", "text-blue-600 dark:text-blue-400"],
    ["2026-11-08T12:00:00Z", "text-red-600 dark:text-red-400"],
    ["2026-11-09T12:00:00Z", undefined],
  ])("colors the actual weekday of %s", (date, expected) => {
    expect(weekdayColor(new Date(date).getUTCDay())).toBe(expected);
  });
});
