"use client";

import { useTranslation } from "@/i18n/client/use-translation";

type Props = {
  dateString: string;
};

const DateFormatter = ({ dateString }: Props) => {
  const { i18n } = useTranslation();
  const date = new Intl.DateTimeFormat(i18n.resolvedLanguage, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
  return <time dateTime={dateString}>{date}</time>;
};

export default DateFormatter;
