import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-xl font-sans font-semibold text-skin-accent leading-snug",
  };

  return (
    <li className="post-card my-5 rounded-sm bg-skin-card border border-transparent shadow-sm transition-all duration-200 hover:border-skin-accent hover:translate-y-[-2px]">
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
        <div className="flex items-center justify-between flex-wrap gap-2">
          <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
          {tags && tags.length > 0 && (
            <ul className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map(tag => (
                <li
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-sm bg-skin-accent/15 text-skin-accent font-medium"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </a>
    </li>
  );
}
