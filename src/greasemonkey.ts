// import * as path from "node:path";
// import { readdirSync } from "node:fs";
import type { Linter } from "eslint";
import { Entry } from "type-fest";

type MonkeyCodeNamesTypeDef = "array" | "record";

// /**
//  * Gets the installed version of a module from the path and name.
//  *
//  * @param {string} name The name of the module to query.
//  * @returns {string | null}
//  */
// function getInstalledVersion(name: string): string | null {
//   /** @type {string[]} */
//   const folders: string[] = readdirSync(path.join(__dirname, "..", "node_modules"));

//   for (const item of folders) {
//     if (item.startsWith(`${name}@`)) {
//       return item;
//     }
//   }

//   return null;
// }

type _GetMoneyCodeNamesFuncReturn<T> = T extends "array" ? (keyof Linter.Globals)[] : T extends "record" ? Linter.Globals : never;
type _GetMoneyCodeNamesFuncReturnArray<T> = _GetMoneyCodeNamesFuncReturn<T>[];
export interface GetMoneyCodeNamesFunc {
  <T extends MonkeyCodeNamesTypeDef>(type: T): _GetMoneyCodeNamesFuncReturnArray<T>;
}

/**
 * Gets a list of monkey code names. And parses them into types.
 *
 * @param {Partial<import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>>[]} config
 * @returns {GetMoneyCodeNamesFunc}
 */
export function getMonkeyCodeNames<T extends Linter.Config<Linter.RulesRecord> = Linter.Config<Linter.RulesRecord>>(...config: Partial<T>[]): GetMoneyCodeNamesFunc {
  /** @type {GetMoneyCodeNamesFunc} */
  return <T extends MonkeyCodeNamesTypeDef>(type: T): _GetMoneyCodeNamesFuncReturnArray<T> => {
    return config.map<_GetMoneyCodeNamesFuncReturn<T>>(
      /**
       * @param {import('eslint').Linter.Config<import('eslint').Linter.RulesRecord>} item
       * @returns {_GetMoneyCodeNamesFuncReturn<T>}
       */
      (item: Linter.Config<Linter.RulesRecord>): _GetMoneyCodeNamesFuncReturn<T> => {
        /** @type {import("eslint").Linter.Globals | undefined} */
        const entries: Linter.Globals | undefined = item.languageOptions?.globals as Linter.Globals;

        if (!entries) {
          switch (type) {
            case "array":
              return [] as (keyof Linter.Globals)[] as _GetMoneyCodeNamesFuncReturn<T>;
            case "record":
              return {} as Linter.Globals as _GetMoneyCodeNamesFuncReturn<T>;
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
            return Object.keys<Linter.Globals>(entries).concat<keyof Linter.Globals>(customLibraries) as _GetMoneyCodeNamesFuncReturn<T>;
          case "record":
            return Object.assign<Linter.Globals, Linter.Globals>(
              entries,
              Object.fromEntries<Linter.Globals>(
                customLibraries.map<Entry<Linter.Globals>>(
                  /**
                   * @param {keyof Linter.Globals} key
                   * @returns {import("type-fest").Entry<import("eslint").Linter.Globals>}
                   */
                  (key: keyof Linter.Globals): Entry<Linter.Globals> => [key, "readonly"]),
              ),
            ) as _GetMoneyCodeNamesFuncReturn<T>;
        }
      },
    );
  };
}
