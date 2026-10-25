export function SourceLinks() {
  return (
    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 p-3 text-muted-foreground text-sm">
      <a
        className="underline underline-offset-4"
        href={`https://github.com/t-syunya/rallly-ja/tree/${process.env.NEXT_PUBLIC_SOURCE_REVISION || "main"}`}
      >
        Rallly 日本語版 — Source code
      </a>
      <a
        className="underline underline-offset-4"
        href="https://github.com/t-syunya/rallly-ja/blob/main/LICENSE"
      >
        AGPLv3+
      </a>
    </div>
  );
}
