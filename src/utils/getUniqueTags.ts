import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]): Tag[] => {
  const filtered = posts.filter(postFilter);
  const countMap: Record<string, Tag> = {};
  for (const post of filtered) {
    for (const tagName of post.data.tags) {
      const tag = slugifyStr(tagName);
      if (countMap[tag]) {
        countMap[tag].count++;
      } else {
        countMap[tag] = { tag, tagName, count: 1 };
      }
    }
  }
  return Object.values(countMap).sort((a, b) => a.tag.localeCompare(b.tag));
};

export default getUniqueTags;
