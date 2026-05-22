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
    className:
      "text-xl font-sans font-semibold text-skin-accent leading-snug",
  };

  return (
    <li className="my-5 rounded-sm bg-skin-card shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
      <a
        href={href}
        className="block p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-skin-accent"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}
        <p className="text-sm mt-2 mb-3 leading-relaxed opacity-80">{description}</p>
        <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      </a>
    </li>
  );
}
