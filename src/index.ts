import type { Plugin } from "@eslint/core";
import type { Linter } from "eslint";
import type { ConfigInitializationOptions, ConfigKeys, PluginKeys, IConfigInitializationOptions, Plugins } from "./types.js";

const keysToRemoveIfExists: Record<keyof Linter.RulesRecord, keyof Linter.RulesRecord> = {
  "key-spacing": "@stylistic/key-spacing",
};

/**
 * Modifies the given config(s) to ignore file extensions given an optional condition.
 *
 * @param {import("eslint").Linter.Config[]} configs The configs to patch.
 * @param {Partial<Record<import("./types.js").ConfigKeys|import("./types.js").PluginKeys,string[]>>|string[]} predicate A record of configs/plugins to test for being enabled and the file extension(s) to ignore.
 * @returns {import("eslint").Linter.Config[]}
 */
// eslint-disable-next-line complexity
function properlyIgnoreFileTypes<T extends Linter.Config | Linter.Config[]>(configs: T, predicate: Partial<Record<ConfigKeys | PluginKeys, string[]>> | string[], options?: IConfigInitializationOptions): T {
  if (Array.isArray(configs)) {
    return configs.map<Linter.Config>((value: Linter.Config): Linter.Config => {
      if (Array.isArray(predicate)) {
        if ("ignores" in value && typeof value.ignores === "string") {
          value.ignores = [value.ignores, ...predicate];
        } else if ("ignores" in value && typeof value.ignores === "object" && Array.isArray(value.ignores)) {
          value.ignores = [...value.ignores, ...predicate];
        } else if ("ignores" in value && typeof value.ignores === "object" && !Array.isArray(value.ignores)) {
          // TODO: Write warning here if the value of `Linter.Config.ignores` is not an array.
          console.warn("Got unexpected type for ESLint config option \"ignores\"");
        } else {
          value.ignores = [...predicate];
        }
      } else if (options) {
        if (Object.keys(predicate).some((config: string): boolean => options.configs?.includes(config as ConfigKeys) === true || options.plugins?.includes(config as PluginKeys) === true)) {
          if ("ignores" in value && typeof value.ignores === "string") {
            value.ignores = [value.ignores, ...Object.values(predicate).flatMap((x: string[] | undefined): string[] => x!)];
          } else if ("ignores" in value && typeof value.ignores === "object" && Array.isArray(value.ignores)) {
            value.ignores = [...value.ignores, ...Object.values(predicate).flatMap((x: string[] | undefined): string[] => x!)];
          } else if ("ignores" in value && typeof value.ignores === "object" && !Array.isArray(value.ignores)) {
            // TODO: Write warning here if the value of `Linter.Config.ignores` is not an array.
            console.warn("Got unexpected type for ESLint config option \"ignores\"");
          } else {
            value.ignores = [...Object.values(predicate).flatMap((x: string[] | undefined): string[] => x!)];
          }
        }
      } else {
        throw new TypeError("options must be defined if the predicate argument is an object!");
      }

      return value;
    }) as T;
  }

  if (Array.isArray(predicate)) {
    if ("ignores" in configs && typeof configs.ignores === "string") {
      configs.ignores = [configs.ignores, ...predicate];
    } else if ("ignores" in configs && typeof configs.ignores === "object" && Array.isArray(configs.ignores)) {
      configs.ignores = [...configs.ignores, ...predicate];
    } else if ("ignores" in configs && typeof configs.ignores === "object" && !Array.isArray(configs.ignores)) {
      // TODO: Write warning here if the value of `Linter.Config.ignores` is not an array.
      console.warn("Got unexpected type for ESLint config option \"ignores\"");
    } else {
      configs.ignores = [...predicate];
    }
  } else if (options) {
    if (Object.keys(predicate).some((config: string): boolean => options.configs?.includes(config as ConfigKeys) === true || options.plugins?.includes(config as PluginKeys) === true)) {
      if ("ignores" in configs && typeof configs.ignores === "string") {
        configs.ignores = [configs.ignores, ...Object.values(predicate).flatMap((x: string[] | undefined): string[] => x!)];
      } else if ("ignores" in configs && typeof configs.ignores === "object" && Array.isArray(configs.ignores)) {
        configs.ignores = [...configs.ignores, ...Object.values(predicate).flatMap((x: string[] | undefined): string[] => x!)];
      } else if ("ignores" in configs && typeof configs.ignores === "object" && !Array.isArray(configs.ignores)) {
        // TODO: Write warning here if the value of `Linter.Config.ignores` is not an array.
        console.warn("Got unexpected type for ESLint config option \"ignores\"");
      } else {
        configs.ignores = [...Object.values(predicate).flatMap((x: string[] | undefined): string[] => x!)];
      }
    }
  } else {
    throw new TypeError("options must be defined if the predicate argument is an object!");
  }

  return configs;
}

// eslint-disable-next-line complexity
export default async function init(options?: ConfigInitializationOptions): Promise<Linter.Config[]> {
  const output: Linter.Config[] = [];
  const plugins: Plugins = {
    jsPlugin: await (await import("./configs/js.ts")).default(),
    stylisticPlugin: await (await import("./configs/stylistic.ts")).default(),
    importXPlugin: await (await import("./configs/import-x.ts")).default(),
    jestPlugin: await (await import("./configs/jest.ts")).default(),
    jsxA11yPlugin: await (await import("./configs/jsx-a11y.ts")).default(),
    markdownPlugin: await (await import("./configs/markdown.ts")).default(),
    nPlugin: await (await import("./configs/n.ts")).default(),
    promisePlugin: await (await import("./configs/promise.ts")).default(),
    tsPlugin: await (await import("./configs/typescript.ts")).default(),
    unicornPlugin: await (await import("./configs/unicorn.ts")).default(),
    reactPlugin: await (await import("./configs/react.ts")).default(),
    reactHooksPlugin: await (await import("./configs/react-hooks.ts")).default(),
    reactRefreshPlugin: await (await import("./configs/react-refresh.ts")).default(),
    unusedImportsPlugin: await (await import("./configs/unused-imports.ts")).default(),
    nextPlugin: await (await import("./configs/next.ts")).default(),
    eslintCommentsPlugin: await (await import("./configs/eslint-comments.ts")).default(),
    flatGitignoreConfig: await (await import("./configs/flat-gitignore.ts")).default(),
    greasemonkeyConfig: await (await import("./configs/greasemonkey.ts")).default(),
    stylelintConfig: await (await import("./configs/stylelint.ts")).default(),
    stylelintJestConfig: await (await import("./configs/stylelint-jest.ts")).default(),
    jsoncPlugin: await (await import("./configs/jsonc.ts")).default(),
    jsdocPlugin: await (await import("./configs/jsdoc.ts")).default(),
    flatConfigUtils: await import("eslint-flat-config-utils"),
    customRules: (await import("./rules.js")).default,
    getMonkeyCodeNames: (await import("./greasemonkey.js")).getMonkeyCodeNames,
    FlatCompat: (await import("@eslint/eslintrc")).FlatCompat,
    tsConfigInit: (await (await import("./configs/typescript.ts")).default()).config,
    globals: await import("globals"),
  };

  const flatCompat = new plugins.FlatCompat({
    baseDirectory: __dirname,
  });

  if (typeof options === "function") {
    output.push(...options(plugins));
  } else if (options) {
    if (options?.plugins) {
      let index: number = 0;
      for (const plugin of options.plugins) {
        try {
          // eslint-disable-next-line max-depth
          switch (plugin) {
            case "ts":
              output.push({
                plugins: {
                  ts: plugins.tsPlugin.plugin as Plugin,
                },
              });
              break;
            case "unused-imports":
              output.push({
                plugins: {
                  "unused-imports": plugins.unusedImportsPlugin,
                },
              });
              break;
            default:
              console.warn(`Unknown plugin option ${(plugin as unknown)?.toString() ?? "unknown"} at index ${index}.`);
              break;
          }
        } finally {
          index++;
        }
      }
    }

    if (options?.configs) {
      let index: number = 0;
      for (const config of options.configs) {
        try {
          /* eslint "@typescript-eslint/switch-exhaustiveness-check": ["error",{considerDefaultExhaustiveForUnions:false}] */
          // eslint-disable-next-line
          switch (config) {
            case "flat-gitignore":
              // eslint-disable-next-line max-depth
              if (typeof options.flat_gitignore_config === "object") {
                output.push(plugins.flatGitignoreConfig(options.flat_gitignore_config));
              } else {
                console.warn("Config key `flat_gitignore_config` supplied but `options.flat_gitignore_config` was not specified.");
              }

              break;
            case "jsdoc_contents":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/contents"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_contents-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/contents-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_contents-typescript":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/contents-typescript"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_contents-typescript-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/contents-typescript-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_contents-typescript-flavor":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/contents-typescript-flavor"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_contents-typescript-flavor-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/contents-typescript-flavor-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_logical":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/logical"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_logical-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/logical-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_logical-typescript":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/logical-typescript"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_logical-typescript-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/logical-typescript-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_logical-typescript-flavor":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/logical-typescript-flavor"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_logical-typescript-flavor-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/logical-typescript-flavor-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_recommended":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/recommended"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_recommended-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/recommended-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_recommended-typescript":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/recommended-typescript"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_recommended-typescript-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/recommended-typescript-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_recommended-typescript-flavor":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/recommended-typescript-flavor"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_recommended-typescript-flavor-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/recommended-typescript-flavor-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_requirements":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/requirements"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_requirements-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/requirements-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_requirements-typescript":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/requirements-typescript"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_requirements-typescript-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/requirements-typescript-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_requirements-typescript-flavor":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/requirements-typescript-flavor"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_requirements-typescript-flavor-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/requirements-typescript-flavor-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_stylistic":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/stylistic"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_stylistic-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/stylistic-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_stylistic-typescript":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/stylistic-typescript"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_stylistic-typescript-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/stylistic-typescript-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_stylistic-typescript-flavor":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/stylistic-typescript-flavor"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_stylistic-typescript-flavor-error":
              output.push(...properlyIgnoreFileTypes([plugins.jsdocPlugin.configs["flat/stylistic-typescript-flavor-error"]], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_default-expressions":
              output.push(...properlyIgnoreFileTypes(plugins.jsdocPlugin.configs["default-expressions"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_examples":
              output.push(...properlyIgnoreFileTypes(plugins.jsdocPlugin.configs.examples, {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsdoc_examples-and-default-expressions":
              output.push(...properlyIgnoreFileTypes(plugins.jsdocPlugin.configs["examples-and-default-expressions"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsonc_all":
              output.push(...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/all"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsonc_base":
              output.push(...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/base"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsonc_prettier":
              output.push(...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/prettier"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsonc_recommended-with-json":
              output.push(...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/recommended-with-json"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsonc_recommended-with-json5":
              output.push(...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/recommended-with-json5"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "jsonc_recommended-with-jsonc":
              output.push(...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/recommended-with-jsonc"], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "greasemonkey":
              output.push({
                files: ["*.user.js", "*.user.mjs", "*.user.cjs", "*.user.ts", "*.user.mts", "*.user.cts"],
                languageOptions: plugins.greasemonkeyConfig,
              });
              break;
            case "js_all":
              output.push(...properlyIgnoreFileTypes([plugins.jsPlugin.configs.all], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "js_recommended":
              output.push(...properlyIgnoreFileTypes([plugins.jsPlugin.configs.recommended], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            case "stylistic_all":
              output.push(plugins.stylisticPlugin.configs.all);
              break;
            case "stylistic_customize":
              // eslint-disable-next-line max-depth
              if (typeof options.stylistic_customize === "object") {
                output.push(plugins.stylisticPlugin.configs.customize(options.stylistic_customize));
              } else {
                console.warn("Config key `stylistic_customize` supplied but `options.stylistic_customize` was not specified.");
              }

              break;
            case "stylistic_disable-legacy":
              output.push(plugins.stylisticPlugin.configs["disable-legacy"]);
              break;
            case "stylistic_recommended":
              output.push(plugins.stylisticPlugin.configs.recommended);
              break;
            case "import-x_electron":
              output.push(plugins.importXPlugin.configs["flat/electron"] as Linter.Config);
              break;
            case "import-x_errors":
              output.push(plugins.importXPlugin.configs["flat/errors"] as Linter.Config);
              break;
            case "import-x_react":
              output.push(plugins.importXPlugin.configs["flat/react"] as Linter.Config);
              break;
            case "import-x_react-native":
              output.push(plugins.importXPlugin.configs["flat/react-native"] as Linter.Config);
              break;
            case "import-x_recommended":
              output.push(plugins.importXPlugin.configs["flat/recommended"] as Linter.Config);
              break;
            case "import-x_stage-0":
              output.push(plugins.importXPlugin.configs["flat/stage-0"] as Linter.Config);
              break;
            case "import-x_typescript":
              output.push(plugins.importXPlugin.configs["flat/typescript"] as Linter.Config);
              break;
            case "import-x_warnings":
              output.push(plugins.importXPlugin.configs["flat/warnings"] as Linter.Config);
              break;
            case "jest_all":
              output.push(plugins.jestPlugin.configs["flat/all"]);
              break;
            case "jest_recommended":
              output.push(plugins.jestPlugin.configs["flat/recommended"]);
              break;
            case "jest_style":
              output.push(plugins.jestPlugin.configs["flat/style"]);
              break;
            case "jsx-a11y_recommended":
              output.push(plugins.jsxA11yPlugin.flatConfigs.recommended);
              break;
            case "jsx-a11y_strict":
              output.push(plugins.jsxA11yPlugin.flatConfigs.strict);
              break;
            case "markdown_recommended":
              output.push(...plugins.markdownPlugin.configs.recommended as Linter.Config[]);
              break;
            case "markdown_processor":
              output.push(...plugins.markdownPlugin.configs.processor);
              break;
            case "n_all":
              output.push(plugins.nPlugin.configs["flat/all"]);
              break;
            case "n_mixed-esm-and-cjs":
              output.push(...plugins.nPlugin.configs["flat/mixed-esm-and-cjs"]);
              break;
            case "n_recommended":
              output.push(plugins.nPlugin.configs["flat/recommended"]);
              break;
            case "n_recommended-module":
              output.push(plugins.nPlugin.configs["flat/recommended-module"]);
              break;
            case "n_recommended-script":
              output.push(plugins.nPlugin.configs["flat/recommended-script"]);
              break;
            case "promise_recommended":
              output.push(plugins.promisePlugin.configs["flat/recommended"]);
              break;
            case "ts_all":
              output.push(...plugins.tsPlugin.configs.all as Linter.Config[]);
              break;
            case "ts_base": {
              output.push(...properlyIgnoreFileTypes([plugins.tsPlugin.configs.base as Linter.Config], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_disableTypeChecked": {
              output.push(...properlyIgnoreFileTypes([plugins.tsPlugin.configs.disableTypeChecked as Linter.Config], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_eslintRecommended": {
              output.push(...properlyIgnoreFileTypes([plugins.tsPlugin.configs.eslintRecommended as Linter.Config], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_recommended": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.recommended as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_recommendedTypeChecked": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.recommendedTypeChecked as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_recommendedTypeCheckedOnly": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.recommendedTypeCheckedOnly as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_strict": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.strict as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_strictTypeChecked": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.strictTypeChecked as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_strictTypeCheckedOnly": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.strictTypeCheckedOnly as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_stylistic": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.stylistic as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_stylisticTypeChecked": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.stylisticTypeChecked as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "ts_stylisticTypeCheckedOnly": {
              output.push(...properlyIgnoreFileTypes(plugins.tsPlugin.configs.stylisticTypeCheckedOnly as Linter.Config[], {
                markdown_processor: ["*.md"],
                markdown_recommended: ["*.md"],
              }, options));
              break;
            }

            case "unicorn_all":
              output.push(plugins.unicornPlugin.configs.all);
              break;
            case "unicorn_recommended":
              output.push(plugins.unicornPlugin.configs.recommended);
              break;
            case "unicorn_unopinionated":
              output.push(plugins.unicornPlugin.configs.unopinionated);
              break;
            case "react_all":
              output.push(plugins.reactPlugin.configs.flat.all);
              break;
            case "react_recommended":
              output.push(plugins.reactPlugin.configs.flat.recommended);
              break;
            case "react_jsx-runtime":
              output.push(...flatCompat.config(plugins.reactPlugin.configs["jsx-runtime"]));
              break;
            case "react-hooks_recommended":
              output.push(plugins.reactHooksPlugin.configs.flat.recommended);
              break;
            case "react-hooks_recommended-latest":
              output.push(plugins.reactHooksPlugin.configs.flat["recommended-latest"]);
              break;
            case "react-refresh_next":
              output.push(plugins.reactRefreshPlugin.configs.next);
              break;
            case "react-refresh_recommended":
              output.push(plugins.reactRefreshPlugin.configs.recommended);
              break;
            case "react-refresh_vite":
              output.push(plugins.reactRefreshPlugin.configs.vite);
              break;
            case "next_core-web-vitals":
              output.push(plugins.nextPlugin.configs["core-web-vitals"]);
              break;
            case "next_recommended":
              output.push(plugins.nextPlugin.configs.recommended);
              break;
            case "eslint-comments_recommended":
              output.push(plugins.eslintCommentsPlugin.configs.recommended);
              break;
            case "stylelint":
              output.push(plugins.stylelintConfig);
              break;
            case "stylelint_jest":
              output.push(plugins.stylelintJestConfig);
              break;
            default:
              console.warn(`Unknown config option ${(config as unknown)?.toString() ?? "unknown"} at index ${index}.`);
              break;
          }
        } finally {
          index++;
        }
      }
    }

    let index: number = 0;

    for (const entry of output) {
      for (const key of Object.keys(keysToRemoveIfExists)) {
        const value: keyof Linter.RulesRecord = keysToRemoveIfExists[key];

        if (entry.rules && value in entry.rules && key in entry.rules) {
          const value: Linter.RuleEntry<unknown[]> | undefined = entry.rules[key];

          // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check, max-depth
          switch (typeof value) {
            case "string":
              // eslint-disable-next-line max-depth
              if (value !== "off") {
                entry.rules[key] = "off";
              }

              break;
            case "number":
              // eslint-disable-next-line max-depth
              if (value !== 0) {
                entry.rules[key] = 0;
              }

              break;
            case "object":
              // eslint-disable-next-line max-depth
              if (Array.isArray(value) && value.length >= 1) {
                // eslint-disable-next-line @typescript-eslint/switch-exhaustiveness-check, max-depth
                switch (typeof value[0]) {
                  case "string":
                    // eslint-disable-next-line max-depth
                    if (value[0] !== "off") {
                      entry.rules[key] = "off";
                    }

                    break;
                  case "number":
                    // eslint-disable-next-line max-depth
                    if (value[0] !== 0) {
                      entry.rules[key] = 0;
                    }

                    break;
                  default:
                    console.warn(`Expected rule severity for rule '${key}' in entry ${entry.name ? `named '${entry.name}'` : `at index ${index}`} to be a String or Number but got a ${typeof value[0]} instead.`);
                    break;
                }
              } else {
                console.warn(`Expected rule severity for rule '${key}' in entry ${entry.name ? `named '${entry.name}'` : `at index ${index}`} to be an Array but got an Object instead.`);
              }

              break;
            default:
              console.warn(`Expected rule severity for rule '${key}' in entry ${entry.name ? `named '${entry.name}'` : `at index ${index}`} to be a String, Number, or Array but got a ${typeof value} instead.`);
              break;
          }
        }
      }

      index++;
    }

    if (options?.override) {
      const override: Linter.Config[] = options.override(output, plugins);
      output.push(...override);
    }

    if (options?.additional) {
      output.push(...options.additional);
    }
  } else {
    output.push(...(await import("eslint/config")).defineConfig(
      {
        extends: [
          {
            ...plugins.jsPlugin.configs.recommended,
            ignores: [...(plugins.jsPlugin.configs.recommended as Linter.Config)?.ignores ?? [], "*.md"],
          },
          plugins.flatGitignoreConfig({
            root: true,
            strict: true,
            name: "gitignore",
          }),
          ...properlyIgnoreFileTypes(plugins.jsoncPlugin.configs["flat/recommended-with-json"], ["*.md"]).map<Linter.Config>((x: Linter.Config): Linter.Config => {
            // eslint-disable-next-line @stylistic/object-property-newline
            type ParserOptionsType = { projectService?: boolean | { allowDefaultProject?: string[]; loadTypeScriptPlugins: boolean }; extraFileExtensions?: string[] };
            x.languageOptions ??= {};
            x.languageOptions.parserOptions ??= {} as ParserOptionsType;
            (x.languageOptions.parserOptions as ParserOptionsType).projectService ??= {} as ParserOptionsType["projectService"];
            ((x.languageOptions.parserOptions as ParserOptionsType).projectService as Exclude<ParserOptionsType["projectService"], boolean>)!.allowDefaultProject ??= [];
            ((x.languageOptions.parserOptions as ParserOptionsType).projectService as Exclude<ParserOptionsType["projectService"], boolean>)!.allowDefaultProject = [...((x.languageOptions.parserOptions as ParserOptionsType).projectService as Exclude<ParserOptionsType["projectService"], boolean>)!.allowDefaultProject ?? [], "*.json"];
            ((x.languageOptions.parserOptions as ParserOptionsType).projectService as Exclude<ParserOptionsType["projectService"], boolean>)!.loadTypeScriptPlugins = Boolean(process.env.VSCODE_PID);
            (x.languageOptions.parserOptions as ParserOptionsType).extraFileExtensions ??= [];
            (x.languageOptions.parserOptions as ParserOptionsType).extraFileExtensions = [...(x.languageOptions.parserOptions as ParserOptionsType).extraFileExtensions ?? [], "*.json"];
            return x;
          }),
          ...properlyIgnoreFileTypes([
            plugins.jsdocPlugin.configs["flat/contents-typescript-error"],
            plugins.jsdocPlugin.configs["flat/logical-typescript-error"],
            plugins.jsdocPlugin.configs["flat/stylistic-typescript-error"],
            plugins.nPlugin.configs["flat/recommended"],
            plugins.stylisticPlugin.configs.customize({
              pluginName: "stylistic",
              indent: 2,
              quotes: "double",
              semi: true,
              jsx: true,
              braceStyle: "1tbs",
              commaDangle: "always-multiline",
              experimental: true,
              arrowParens: true,
              blockSpacing: true,
              quoteProps: "as-needed",
              severity: "warn",
            }),
            ...(plugins.tsPlugin.configs.recommendedTypeChecked as Linter.Config[]),
            {
              name: "Jest Configs",
              files: ["test/**", "tests/**"],
              ...plugins.jestPlugin.configs["flat/recommended"],
              rules: {
                ...plugins.jestPlugin.configs["flat/recommended"].rules,
              },
            },
          ], ["*.md", "*.json"]),
        ],

        languageOptions: {
          ecmaVersion: "latest",
          globals: {
            ...plugins.globals.es2021,
            ...plugins.globals.node,
            ...plugins.globals.commonjs,
            ...plugins.globals.nodeBuiltin,
            ...plugins.globals.builtin,
          },
        },
        plugins: {
          unicorn: plugins.unicornPlugin,
          ...plugins.stylisticPlugin.configs.recommended.plugins,
        },
        rules: {
          "@stylistic/key-spacing": ["error", {
            align: "value",
          }],
          "@stylistic/no-multi-spaces": ["error", {
            exceptions: {
              Property: true,
              VariableDeclarator: true,
            },
          }],
          // "@typescript-eslint/triple-slash-reference": "off",
          // "@typescript-eslint/no-unsafe-assignment": "off",
          // "@typescript-eslint/no-unsafe-call": "off",
          // "@typescript-eslint/no-unsafe-return": "off",
          // "@typescript-eslint/no-unsafe-argument": "off",
          // "@typescript-eslint/no-unsafe-member-access": "off",
          ...plugins.customRules(plugins.getMonkeyCodeNames(plugins.greasemonkeyConfig.globals)),
        },
      },
    ) as Linter.Config[]);
  }

  return output;
}
