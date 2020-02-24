import { render as mustache } from "mustache";
import marked, { MarkedOptions } from "marked";

export const render = (
  markdown: string,
  view: any,
  partials?:
    | Record<string, string>
    | ((partialName: string) => string | undefined),
  tags?: [string, string],
  options?: MarkedOptions
) => {
  const md = mustache(markdown, view || {}, partials, tags);
  return marked(md, options);
};