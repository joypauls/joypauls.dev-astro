import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-xl font-semibold text-skin-accent",
  };

  return (
    <li className="my-6 rounded-md border border-skin-line transition-colors duration-200 hover:bg-skin-card/40 dark:border-gray-600">
      <a
        href={href}
        className="block p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skin-accent"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        <p className="text-sm mt-2 mb-2">{description}</p>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      </a>
    </li>
  );
}
