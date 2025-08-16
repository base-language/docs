import nextra from "nextra";
import { bundledLanguages, createHighlighter } from "shiki";
import { readFileSync } from "fs";
import { join } from "path";

const base = JSON.parse(
  readFileSync(
    join(process.cwd(), "public/syntax/base.tmLanguage.json"),
    "utf-8"
  )
);

const withNextra = nextra({
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePrettyCodeOptions: {
      createHighlighter: (options) =>
        createHighlighter({
          theme: "nord",
          ...options,
          langs: [
            ...bundledLanguages,
            {
              id: "base",
              name: "base",
              scopeName: "source.base",
              ...base,
            },
          ],
        }),
    },
  },
});

export default withNextra({
  devIndicators: false,
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.tsx",
    },
  },
});
