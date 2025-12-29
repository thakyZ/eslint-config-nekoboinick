import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportModuleSafe } from "../types.ts";

type ModuleType = typeof import("typescript-eslint");

/**
 * Exports the `typescript-eslint` config.
 *
 * @returns {Promise<ImportModuleSafe<ModuleType>>}
 */
export default async function (): Promise<ImportModuleSafe<ModuleType>> {
  try {
    const module = await import("typescript-eslint");

    if ("default" in module) {
      return module.default as ImportModuleSafe<ModuleType>;
    }

    return module;
  } catch (error: unknown) {
    console.error(serialize(ensureError(error)));
    return {} as ImportModuleSafe<ModuleType>;
  }
}
