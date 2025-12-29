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

/**
 *
 * @template {MonkeyCodeNamesTypeDef} T
 * @param {T} type ---
 * @returns {(T extends "array" ? (keyof import('eslint').Linter.Globals)[] : T extends "record" ? import('eslint').Linter.Globals : never)[]}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function GetMonkeyCodeNames<T extends MonkeyCodeNamesTypeDef>(type: T): (T extends "array" ? (keyof Linter.Globals)[] : T extends "record" ? Linter.Globals : never)[] {
  throw new Error("This is a dumby method.");
}

/**
 * Gets a list of monkey code names. And parses them into types.
 *
 * @param {Partial<import("eslint").Linter.Globals>[]} config
 * @returns {typeof GetMonkeyCodeNames}
 */
export function getMonkeyCodeNames<A extends Linter.Globals = Linter.Globals>(...config: Partial<A>[]): typeof GetMonkeyCodeNames {
  /** @type {typeof GetMonkeyCodeNames} */
  return <T extends MonkeyCodeNamesTypeDef>(type: T): ReturnType<typeof GetMonkeyCodeNames<T>> => {
    return config.map<ReturnType<typeof GetMonkeyCodeNames<T>>[number]>(
      /**
       * @param {import('eslint').Linter.Config} item
       * @returns {ReturnType<typeof GetMonkeyCodeNames<T>>[number]}
       */
      (item: Partial<A>): ReturnType<typeof GetMonkeyCodeNames<T>>[number] => {
        if (!item) {
          switch (type) {
            case "array":
              return [] as (keyof Linter.Globals)[] as ReturnType<typeof GetMonkeyCodeNames<T>>[number];
            case "record":
              return {} as ReturnType<typeof GetMonkeyCodeNames<T>>[number];
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
            return Object.keys<Partial<A>>(item).concat<keyof Linter.Globals>(customLibraries) as ReturnType<typeof GetMonkeyCodeNames<T>>[number];
          case "record":
            return Object.assign<Partial<A>, Linter.Globals>(
              item,
              Object.fromEntries<Linter.Globals>(
                customLibraries.map<Entry<Linter.Globals>>(
                  /**
                   * @param {keyof import('eslint').Linter.Globals} key
                   * @returns {import("type-fest").Entry<import("eslint").Linter.Globals>}
                   */
                  (key: keyof Linter.Globals): Entry<Linter.Globals> => [key, "readonly"]),
              ),
            ) as Linter.Globals as ReturnType<typeof GetMonkeyCodeNames<T>>[number];
        }
      },
    );
  };
}
