declare module "eslint-plugin-markdown" {
  interface MarkdownPlugin {
    configs: {
      recommended: Partial<import("eslint").Linter.Config>[];
    }
  }

  const markdownPlugin: MarkdownPlugin

  export = markdownPlugin
}
