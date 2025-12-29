import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportModuleSafe } from "../types.ts";

type ModuleType = typeof import("@next/eslint-plugin-next");

/**
 * Exports the `@next/eslint-plugin-next` config.
 *
 * @returns {Promise<ImportModuleSafe<ModuleType>>}
 */
export default async function (): Promise<ImportModuleSafe<ModuleType>> {
  try {
    const module = await import("@next/eslint-plugin-next");

    if ("default" in module) {
      // @ts-expect-error --- Unknown as to why the `meta` property is expected/missing.
      return module.default;
    }

    return module;
  } catch (error: unknown) {
    console.error(serialize(ensureError(error)));
    return {} as ImportModuleSafe<ModuleType>;
  }
}
