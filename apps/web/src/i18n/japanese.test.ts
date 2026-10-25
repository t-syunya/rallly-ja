import { IntlMessageFormat } from "intl-messageformat";
import { describe, expect, it } from "vitest";
import englishEmails from "../../../../packages/emails/locales/en/emails.json";
import japaneseEmails from "../../../../packages/emails/locales/ja/emails.json";
import englishBlog from "../../../landing/public/locales/en/blog.json";
import englishCommon from "../../../landing/public/locales/en/common.json";
import englishHome from "../../../landing/public/locales/en/home.json";
import englishPricing from "../../../landing/public/locales/en/pricing.json";
import japaneseBlog from "../../../landing/public/locales/ja/blog.json";
import japaneseCommon from "../../../landing/public/locales/ja/common.json";
import japaneseHome from "../../../landing/public/locales/ja/home.json";
import japanesePricing from "../../../landing/public/locales/ja/pricing.json";
import english from "../../public/locales/en/app.json";
import japanese from "../../public/locales/ja/app.json";
import { initI18next } from "./i18n";

function argumentsIn(message: IntlMessageFormat) {
  const names = new Set<string>();
  function visit(elements: ReturnType<IntlMessageFormat["getAst"]>) {
    for (const element of elements) {
      if (element.type !== 0 && element.type !== 7) {
        names.add(element.value);
      }
      if ("options" in element) {
        for (const option of Object.values(element.options)) {
          visit(option.value);
        }
      }
    }
  }
  visit(message.getAst());
  return [...names].sort();
}

const tagsIn = (message: string) =>
  [...new Set(message.match(/<\/?[\w]+\s*\/?>/g) ?? [])].sort();

const translations: {
  name: string;
  english: Record<string, string>;
  japanese: Record<string, string>;
}[] = [
  { name: "app", english, japanese },
  { name: "emails", english: englishEmails, japanese: japaneseEmails },
  { name: "common", english: englishCommon, japanese: japaneseCommon },
  { name: "home", english: englishHome, japanese: japaneseHome },
  { name: "pricing", english: englishPricing, japanese: japanesePricing },
  { name: "blog", english: englishBlog, japanese: japaneseBlog },
];

describe.each(translations)("Japanese $name translations", ({
  english,
  japanese,
}) => {
  it("covers every English translation key", () => {
    expect(Object.keys(japanese).sort()).toEqual(Object.keys(english).sort());
  });

  it("preserves ICU arguments and markup and formats every message", () => {
    for (const key of Object.keys(english)) {
      const source = new IntlMessageFormat(english[key], "en", undefined, {
        ignoreTag: true,
      });
      const translated = new IntlMessageFormat(japanese[key], "ja", undefined, {
        ignoreTag: true,
      });
      const names = argumentsIn(source);
      expect(argumentsIn(translated), key).toEqual(names);
      expect(tagsIn(japanese[key]), key).toEqual(tagsIn(english[key]));
      for (const count of [0, 1, 2]) {
        expect(
          translated.format(
            Object.fromEntries(names.map((name) => [name, count])),
          ),
          key,
        ).toBeTruthy();
      }
    }
  });
});

it("loads Japanese through the app's translation backend", async () => {
  const { i18n } = await initI18next({ lng: "ja" });
  expect(i18n.language).toBe("ja");
  expect(i18n.getResourceBundle("ja", "app")).toEqual(japanese);
});

it.each([
  ["admin", "管理者"],
  ["member", "メンバー"],
])("translates the %s role in Japanese space invitations", (role, label) => {
  const message = new IntlMessageFormat(
    japaneseEmails.spaceInvite_content,
    "ja",
  );
  expect(message.format({ inviterName: "山田", spaceName: "開発", role })).toBe(
    `山田さんから、開発スペースの${label}としての招待が届いています。`,
  );
});
