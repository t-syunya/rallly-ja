"use client";

import languages, { supportedLngs } from "@rallly/languages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rallly/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "@/i18n/client/use-translation";
import { defaultLocale } from "@/i18n/settings";

export const LanguageSelect = () => {
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const { t, i18n } = useTranslation();
  return (
    <Select
      items={languages}
      value={i18n.language}
      onValueChange={(newLocale) => {
        if (!newLocale) {
          return;
        }

        const localeInPath = supportedLngs.find(
          (lng) => pathname === `/${lng}` || pathname.startsWith(`/${lng}/`),
        );

        const newPath = localeInPath
          ? pathname.slice(localeInPath.length + 1)
          : pathname;

        const prefix = newLocale === defaultLocale ? "" : `/${newLocale}`;
        router.replace(`${prefix}${newPath}` || "/");
      }}
    >
      <SelectTrigger
        className="w-full"
        aria-label={t("language", { defaultValue: "Language" })}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(languages).map(([code, name]) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
