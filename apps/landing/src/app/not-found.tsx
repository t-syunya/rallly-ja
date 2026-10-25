import { buttonVariants } from "@rallly/ui";
import { FileSearchIcon } from "lucide-react";
import type { Metadata } from "next";
import "./[locale]/globals.css";
import { sans } from "@/fonts/sans";
import { defaultLocale } from "@/i18n/settings";
import japanese from "../../public/locales/ja/common.json";

export const metadata: Metadata = {
  title: `${japanese.notFoundTitle} | Rallly`,
  description: japanese.notFoundDescription,
};

// Renders outside the [locale] segment, so there is no locale and no
// I18nProvider to read from, so use the default language's dictionary directly.
export default function NotFound() {
  return (
    <html lang={defaultLocale} className={sans.className}>
      <body>
        <div className="inset-0 flex h-full w-full items-center justify-center lg:absolute">
          <div className="space-y-8">
            <div className="space-y-4">
              <FileSearchIcon className="mb-4 inline-block size-24 text-gray-400" />
              <div className="mb-2 font-semibold text-3xl text-primary">
                {japanese.notFoundTitle}
              </div>
              <p className="text-gray-600">{japanese.notFoundDescription}</p>
            </div>
            <div className="flex space-x-3">
              <a href="/" className={buttonVariants({ variant: "primary" })}>
                {japanese.goToHome}
              </a>
              <a href="https://support.rallly.co" className={buttonVariants()}>
                {japanese.support}
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
