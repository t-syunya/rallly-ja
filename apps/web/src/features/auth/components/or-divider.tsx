import { getTranslation } from "@/i18n/server";

export async function OrDivider() {
  const { t } = await getTranslation();
  return (
    <div className="flex items-center gap-x-2.5 py-2">
      <hr className="grow border-gray-100 dark:border-gray-700" />
      <div className="text-muted-foreground text-xs">{t("orContinueWith")}</div>
      <hr className="grow border-gray-100 dark:border-gray-700" />
    </div>
  );
}
