import * as path from "node:path";
import { readdirSync } from "node:fs";
import type { Linter } from "eslint";
import { Entries, Entry } from "type-fest";

type MonkeyCodeNamesTypeDef = "array" | "record";

/**
 * Gets the installed version of a module from the path and name.
 *
 * @param {string} name The name of the module to query.
 * @returns {string | null}
 */
function getInstalledVersion(name: string): string | null {
  /** @type {string[]} */
  const folders: string[] = readdirSync(path.join(__dirname, "..", "node_modules"));

  for (const item of folders) {
    if (item.startsWith(`${name}@`)) {
      return item;
    }
  }

  return null;
}

type _GetMoneyCodeNamesFunc = <T extends MonkeyCodeNamesTypeDef>(type: T) => _GetMoneyCodeNamesReturn<T>;
type _GetMoneyCodeNamesInnerReturn<T extends MonkeyCodeNamesTypeDef> =
  T extends "array" ? (keyof Linter.Globals)[] :
  T extends "record" ? Linter.Globals :
  never;

type _GetMoneyCodeNamesReturn<T extends MonkeyCodeNamesTypeDef> = _GetMoneyCodeNamesInnerReturn<T>[];

/**
 * Gets a list of monkey code names. And parses them into types.
 *
 * @param {Partial<import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>>[]} config
 * @returns {_GetMoneyCodeNamesFunc}
 */
export function getMonkeyCodeNames(config: Linter.Config<Linter.RulesRecord>[]): _GetMoneyCodeNamesFunc {
  /**
   * @template {MonkeyCodeNamesTypeDef} T
   * @type {_GetMoneyCodeNamesFunc<T>}
   */
  const output: _GetMoneyCodeNamesFunc = <T extends MonkeyCodeNamesTypeDef>(type: T): _GetMoneyCodeNamesReturn<T> => {
    return config.map((item: Linter.Config<Linter.RulesRecord>): _GetMoneyCodeNamesInnerReturn<T> => {
      /** @type {import("eslint").Linter.Globals | undefined} */
      const entries: Linter.Globals | undefined = item.languageOptions?.globals as Linter.Globals;

      if (!entries) {
        switch (type) {
          case "array":
            return [] as string[] as _GetMoneyCodeNamesInnerReturn<T>;
          case "record":
            return {} as Linter.Globals as _GetMoneyCodeNamesInnerReturn<T>;
        }
      }

      /** @type {(keyof import("eslint").Linter.Globals)[]} */
      const customLibraries: (keyof Linter.Globals)[] = [
        "GM_config",
        "GM_configStruct",
        "GM_configField",
        "GM_config",
      ];

      switch (type) {
        case "array":
          return Object.keys<Linter.Globals>(entries).concat<keyof Linter.Globals>(customLibraries) as _GetMoneyCodeNamesInnerReturn<T>;
        case "record":
          return Object.assign<Linter.Globals, Linter.Globals>(
            entries,
            Object.fromEntries<Linter.Globals>(
              customLibraries.map<Entry<Linter.Globals>>((key: keyof Linter.Globals): Entry<Linter.Globals> => [key, "readonly"])
            )
          ) as _GetMoneyCodeNamesInnerReturn<T>;
      }
    });
  };

  return output as _GetMoneyCodeNamesFunc;
}
