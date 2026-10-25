import { beforeEach, describe, expect, it, vi } from "vitest";
import { getScheduledEventCalendarData } from "@/features/scheduled-event/data";
import { GET } from "./route";

vi.mock("server-only", () => ({}));
vi.mock("@/features/scheduled-event/data", () => ({
  getScheduledEventCalendarData: vi.fn(),
}));
vi.mock("@/lib/rate-limit", () => ({ createRatelimit: () => undefined }));
vi.mock("@/features/location/data", () => ({
  parseLocation: (value: unknown) => value,
}));
vi.mock("@/features/conferencing/data", () => ({
  parseConferencing: () => undefined,
}));

const event = {
  id: "event-123",
  uid: "event-123@example.test",
  sequence: 0,
  title: "交流会 & 打ち合わせ",
  description: "議題の説明",
  location: { provider: "custom", address: "東京の会議室" },
  conferencing: null,
  start: new Date("2026-11-07T00:00:00Z"),
  end: new Date("2026-11-07T01:00:00Z"),
  allDay: false,
  timeZone: "Asia/Tokyo",
  status: "confirmed" as const,
  user: { name: "Host", email: "host@example.test" },
};

const request = () =>
  GET(new Request("http://localhost/api/event/event-123/google-calendar"));

describe("Google calendar registration link", () => {
  beforeEach(() => {
    vi.mocked(getScheduledEventCalendarData).mockResolvedValue(event);
  });

  it("preserves the title, instants, timezone, location and description", async () => {
    const response = await request();
    expect(response.status).toBe(302);
    const url = new URL(response.headers.get("location") ?? "");
    expect(url.origin).toBe("https://calendar.google.com");
    expect(url.searchParams.get("text")).toBe(event.title);
    expect(url.searchParams.get("dates")).toBe(
      "20261107T000000Z/20261107T010000Z",
    );
    expect(url.searchParams.get("ctz")).toBe("Asia/Tokyo");
    expect(url.searchParams.get("location")).toBe("東京の会議室");
    expect(url.searchParams.get("details")).toBe(event.description);
  });

  it("keeps floating times in the viewer's local clock", async () => {
    vi.mocked(getScheduledEventCalendarData).mockResolvedValue({
      ...event,
      timeZone: null,
    });
    const response = await request();
    const url = new URL(response.headers.get("location") ?? "");
    expect(url.searchParams.get("dates")).toBe(
      "20261107T000000/20261107T010000",
    );
    expect(url.searchParams.has("ctz")).toBe(false);
  });

  it("uses floating dates and an exclusive end for an all-day event", async () => {
    vi.mocked(getScheduledEventCalendarData).mockResolvedValue({
      ...event,
      allDay: true,
      end: new Date("2026-11-08T00:00:00Z"),
    });
    const response = await request();
    const url = new URL(response.headers.get("location") ?? "");
    expect(url.searchParams.get("dates")).toBe("20261107/20261108");
    expect(url.searchParams.has("ctz")).toBe(false);
  });

  it.each([
    "canceled",
    "unconfirmed",
  ] as const)("does not register a %s event", async (status) => {
    vi.mocked(getScheduledEventCalendarData).mockResolvedValue({
      ...event,
      status,
    });
    const response = await request();
    expect(response.status).toBe(409);
    expect(response.headers.has("location")).toBe(false);
  });

  it("returns 404 for a missing or deleted event", async () => {
    vi.mocked(getScheduledEventCalendarData).mockResolvedValue(null);
    expect((await request()).status).toBe(404);
  });
});
