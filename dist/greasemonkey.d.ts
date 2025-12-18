import type { Linter } from "eslint";
type MonkeyCodeNamesTypeDef = "array" | "record";
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
export declare function getMonkeyCodeNames<T extends Linter.Config<Linter.RulesRecord> = Linter.Config<Linter.RulesRecord>>(...config: Partial<T>[]): GetMoneyCodeNamesFunc;
export {};
