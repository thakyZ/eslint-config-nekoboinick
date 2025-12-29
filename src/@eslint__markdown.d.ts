import type { LanguageOptions, RuleVisitor } from "@eslint/core";
import type { Linter } from "eslint";
import type {
  Data, Literal, Parent, Blockquote, Break, Code, Definition, Emphasis, Heading, Html, Image,
  ImageReference, InlineCode, Link, LinkReference, List, ListItem, Paragraph, Root, Strong, Text,
  ThematicBreak, Delete, FootnoteDefinition, FootnoteReference, Table, TableCell, TableRow, Yaml,
} from "mdast";
import type { MarkdownLanguage, MarkdownRuleDefinition } from "@eslint/markdown";

declare module "@eslint/markdown" {
  /**
   * Extracts lintable code blocks from Markdown text.
   * @param {string} sourceText The text of the file.
   * @param {string} filename The filename of the file.
   * @returns {Array<{ filename: string, text: string }>} Source code blocks to lint.
   */
  function preprocess(sourceText: string, filename: string): Array<{
    filename: string;
    text: string;
  }>;

  /**
   * Transforms generated messages for output.
   * @param {Array<Linter.LintMessage[]>} messages An array containing one array of messages
   *     for each code block returned from `preprocess`.
   * @param {string} filename The filename of the file
   * @returns {Linter.LintMessage[]} A flattened array of messages with mapped locations.
   */
  function postprocess(messages: Array<Linter.LintMessage[]>, filename: string): Linter.LintMessage[];

  /** Adds matching `:exit` selectors for all properties of a `RuleVisitor`. */
  type WithExit<RuleVisitorType extends RuleVisitor> = {
    [Key in keyof RuleVisitorType as Key | `${Key & string}:exit`]: RuleVisitorType[Key];
  };
  export interface RangeMap {
    indent: number;
    js: number;
    md: number;
  }
  export interface BlockBase {
    baseIndentText: string;
    comments: string[];
    rangeMap: RangeMap[];
  }
  /**
   * Markdown TOML.
   */
  export interface Toml extends Literal {
  /**
       * Node type of mdast TOML.
       */
    type: "toml";
    /**
       * Data associated with the mdast TOML.
       */
    data?: TomlData | undefined;
  }
  /**
   * Info associated with mdast TOML nodes by the ecosystem.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface TomlData extends Data {
  }
  /**
   * Markdown JSON.
   */
  export interface Json extends Literal {
  /**
       * Node type of mdast JSON.
       */
    type: "json";
    /**
       * Data associated with the mdast JSON.
       */
    data?: JsonData | undefined;
  }
  /**
   * Info associated with mdast JSON nodes by the ecosystem.
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface JsonData extends Data {
  }
  /**
   * Language options provided for Markdown files.
   */
  export interface MarkdownLanguageOptions extends LanguageOptions {
    /**
     * The options for parsing frontmatter.
     */
    frontmatter?: false | "yaml" | "toml" | "json";
  }
  export interface MarkdownRuleVisitor extends RuleVisitor, WithExit<{
    root?(node: Root): void;
  } & {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    [NodeType in Blockquote | Break | Code | Definition | Emphasis | Heading | Html | Image | ImageReference | InlineCode | Link | LinkReference | List | ListItem | Paragraph | Strong | Text | ThematicBreak | Delete | FootnoteDefinition | FootnoteReference | Table | TableCell | TableRow | Yaml | Toml | Json as NodeType["type"]]?: (node: NodeType, parent?: Parent) => void;
  }> {
  }

  declare const plugin: {
    readonly meta: {
      readonly name: string;
      readonly version: string;
    };
    readonly processors: {
      readonly markdown: {
        readonly meta: {
          readonly name: string;
          readonly version: string;
        };
        readonly preprocess: typeof preprocess;
        readonly postprocess: typeof postprocess;
        readonly supportsAutofix: true;
      };
    };
    readonly languages: {
      readonly commonmark: MarkdownLanguage;
      readonly gfm: MarkdownLanguage;
    };
    readonly rules: {
      readonly "fenced-code-language": MarkdownRuleDefinition<{
        RuleOptions: [{
          required?: string[];
        }];
        MessageIds: "missingLanguage" | "disallowedLanguage";
      }>;
      readonly "heading-increment": MarkdownRuleDefinition<{
        RuleOptions: [{
          frontmatterTitle?: string;
        }];
        MessageIds: "skippedHeading";
      }>;
      readonly "no-bare-urls": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "bareUrl";
      }>;
      readonly "no-duplicate-definitions": MarkdownRuleDefinition<{
        RuleOptions: [{
          allowDefinitions?: string[];
          allowFootnoteDefinitions?: string[];
        }];
        MessageIds: "duplicateDefinition" | "duplicateFootnoteDefinition";
      }>;
      readonly "no-duplicate-headings": MarkdownRuleDefinition<{
        RuleOptions: [{
          checkSiblingsOnly?: boolean;
        }];
        MessageIds: "duplicateHeading";
      }>;
      readonly "no-empty-definitions": MarkdownRuleDefinition<{
        RuleOptions: [{
          allowDefinitions?: string[];
          allowFootnoteDefinitions?: string[];
          checkFootnoteDefinitions?: boolean;
        }];
        MessageIds: "emptyDefinition" | "emptyFootnoteDefinition";
      }>;
      readonly "no-empty-images": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "emptyImage";
      }>;
      readonly "no-empty-links": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "emptyLink";
      }>;
      readonly "no-html": MarkdownRuleDefinition<{
        RuleOptions: [{
          allowed?: string[];
          allowedIgnoreCase?: boolean;
        }];
        MessageIds: "disallowedElement";
      }>;
      readonly "no-invalid-label-refs": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "invalidLabelRef";
      }>;
      readonly "no-missing-atx-heading-space": MarkdownRuleDefinition<{
        RuleOptions: [{
          checkClosedHeadings?: boolean;
        }];
        MessageIds: "missingSpace";
      }>;
      readonly "no-missing-label-refs": MarkdownRuleDefinition<{
        RuleOptions: [{
          allowLabels?: string[];
        }];
        MessageIds: "notFound";
      }>;
      readonly "no-missing-link-fragments": MarkdownRuleDefinition<{
        RuleOptions: [{
          ignoreCase?: boolean;
          allowPattern?: string;
        }];
        MessageIds: "invalidFragment";
      }>;
      readonly "no-multiple-h1": MarkdownRuleDefinition<{
        RuleOptions: [{
          frontmatterTitle?: string;
        }];
        MessageIds: "multipleH1";
      }>;
      readonly "no-reference-like-urls": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "referenceLikeUrl";
      }>;
      readonly "no-reversed-media-syntax": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "reversedSyntax";
      }>;
      readonly "no-space-in-emphasis": MarkdownRuleDefinition<{
        RuleOptions: [{
          checkStrikethrough?: boolean;
        }];
        MessageIds: "spaceInEmphasis";
      }>;
      readonly "no-unused-definitions": MarkdownRuleDefinition<{
        RuleOptions: [{
          allowDefinitions?: string[];
          allowFootnoteDefinitions?: string[];
        }];
        MessageIds: "unusedDefinition" | "unusedFootnoteDefinition";
      }>;
      readonly "require-alt-text": MarkdownRuleDefinition<{
        RuleOptions: [];
        MessageIds: "altTextRequired";
      }>;
      readonly "table-column-count": MarkdownRuleDefinition<{
        RuleOptions: [{
          checkMissingCells?: boolean;
        }];
        MessageIds: "extraCells" | "missingCells";
      }>;
    };
    readonly configs: {
      readonly "recommended-legacy": {
        readonly plugins: string[];
        readonly overrides: ({
          readonly files: string[];
          readonly processor: string;
          readonly parserOptions?: undefined;
          readonly rules?: undefined;
        } | {
          readonly files: string[];
          readonly parserOptions: {
            readonly ecmaFeatures: {
              readonly impliedStrict: boolean;
            };
          };
          readonly rules: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            readonly [key: string]: import("@eslint/core", { with: { "resolution-mode": "require" } }).RuleConfig<unknown[]>;
          };
          readonly processor?: undefined;
        })[];
      };
      readonly "recommended": {
        readonly name: string;
        readonly files: string[];
        readonly language: string;
        // eslint-disable-next-line @typescript-eslint/no-empty-object-type
        readonly plugins: {};
        readonly rules: {
          readonly "markdown/fenced-code-language": "error";
          readonly "markdown/heading-increment": "error";
          readonly "markdown/no-duplicate-definitions": "error";
          readonly "markdown/no-empty-definitions": "error";
          readonly "markdown/no-empty-images": "error";
          readonly "markdown/no-empty-links": "error";
          readonly "markdown/no-invalid-label-refs": "error";
          readonly "markdown/no-missing-atx-heading-space": "error";
          readonly "markdown/no-missing-label-refs": "error";
          readonly "markdown/no-missing-link-fragments": "error";
          readonly "markdown/no-multiple-h1": "error";
          readonly "markdown/no-reference-like-urls": "error";
          readonly "markdown/no-reversed-media-syntax": "error";
          readonly "markdown/no-space-in-emphasis": "error";
          readonly "markdown/no-unused-definitions": "error";
          readonly "markdown/require-alt-text": "error";
          readonly "markdown/table-column-count": "error";
        };
      }[];
      readonly "processor": Linter.Config[];
    };
  };
}
