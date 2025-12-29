import { serialize } from "error-serializer";
import ensureError from "ensure-error";
import type { ImportModuleSafe, ImportValue } from "../types.ts";

type ModuleType = typeof import("typescript-eslint");

/**
 * Exports the `typescript-eslint` plugin.
 *
 * @returns {Promise<ImportValue<ImportModuleSafe<ModuleType>, "plugin">>}
 */
export default async function (): Promise<ImportValue<ImportModuleSafe<ModuleType>, "plugin">> {
  try {
    const module = await import("typescript-eslint");

    if ("default" in module) {
      return module.default.plugin;
    }

    return (module as ImportModuleSafe<ModuleType>).plugin;
  } catch (error: unknown) {
    console.error(serialize(ensureError(error)));
    return {} as ImportValue<ImportModuleSafe<ModuleType>, "plugin">;
  }
}
