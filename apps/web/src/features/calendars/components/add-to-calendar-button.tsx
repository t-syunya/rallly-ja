"use client";

import { Button } from "@rallly/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@rallly/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import type * as React from "react";
import GoogleCalendarIcon from "@/features/calendars/assets/google-calendar.svg";
import { AddToCalendarMenuItems } from "@/features/calendars/components/add-to-calendar-menu-items";

import { Trans } from "@/i18n/client";

export function AddToCalendarButton({
  eventId,
  size,
  className,
}: {
  eventId: string;
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="primary"
        size={size}
        className={className}
        render={
          <a
            href={`/api/event/${eventId}/google-calendar`}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <GoogleCalendarIcon className="size-4" />
        <Trans
          i18nKey="addToGoogleCalendar"
          defaults="Add to Google Calendar"
        />
      </Button>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          render={<Button size={size} className={className} />}
        >
          <PlusIcon data-icon="inline-start" />
          <Trans i18nKey="addToCalendar" defaults="Add to calendar" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <AddToCalendarMenuItems eventId={eventId} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
