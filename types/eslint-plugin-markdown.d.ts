declare module "eslint-plugin-markdown" {
  import type { Linter } from "eslint";
  interface MarkdownPlugin {
    configs: {
      recommended: Partial<Linter.Config>[];
    }
  }
  const markdownPlugin: MarkdownPlugin
  export = markdownPlugin
}
