import type { Linter } from "eslint";
import type { GetMoneyCodeNamesFunc } from "./greasemonkey.js";
/**
*
*
* @param {GetMoneyCodeNamesFunc} callback
* @returns {import('eslint').Linter.RulesRecord}
*/
export default function customRules(callback: GetMoneyCodeNamesFunc): Linter.RulesRecord;
