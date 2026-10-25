"use client";

import DateFormatter from "@/components/blog/date-formatter";
import { LinkBase } from "@/i18n/client/link";

type Props = {
  title: string;
  category?: string;
  date: string;
  excerpt?: string;
  slug: string;
};

export const PostPreview = ({
  title,
  category,
  date,
  excerpt,
  slug,
}: Props) => {
  return (
    <article className="py-8">
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        {category ? (
          <>
            <span>{category}</span>
            <span aria-hidden="true">·</span>
          </>
        ) : null}
        <DateFormatter dateString={date} />
      </div>
      <h2 className="mt-2 text-balance font-medium text-gray-800 text-xl tracking-tight">
        <LinkBase href={`/blog/${slug}`} className="hover:underline">
          {title}
        </LinkBase>
      </h2>
      <p className="mt-2 max-w-prose text-pretty text-base/6 text-gray-500">
        {excerpt}
      </p>
    </article>
  );
};
