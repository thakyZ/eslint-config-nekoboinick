/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

import { Entries, Entry, ValueOf } from "type-fest";

declare global {

  interface ObjectConstructor {

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source The source object from which to copy properties.
     */
    assign<T extends object, U>(target: T, source: U): T & U;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     */
    assign<T extends object, U, V>(target: T, source1: U, source2: V): T & U & V;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param source1 The first source object from which to copy properties.
     * @param source2 The second source object from which to copy properties.
     * @param source3 The third source object from which to copy properties.
     */
    assign<T extends object, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;

    /**
     * Copy the values of all of the enumerable own properties from one or more source objects to a
     * target object. Returns the target object.
     * @param target The target object to copy to.
     * @param sources One or more source objects from which to copy properties
     */
    assign(target: object, ...sources: any[]): any;

    /**
     * Returns an array of all symbol properties found directly on object o.
     * @template {object} T
     * @param {T} o Object to retrieve the symbols from.
     * @returns {symbol[]}
     */
    getOwnPropertySymbols<T>(o: T): symbol[];
    /**
     * Returns the names of the enumerable string properties and methods of an object.
     * @template {object} T
     * @param {T} o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     */
    keys<T extends object>(o: T): (keyof T)[];

    /**
     * Returns true if the values are the same value, false otherwise.
     * @template {object} T1
     * @template {object} T2
     * @param {T1} value1 The first value.
     * @param {T2} value2 The second value.
     * @returns {boolean}
     */
    is<T1 extends object, T2 extends object>(value1: T1, value2: T2): value1 is typeof value2;

    /**
     * Returns true if the values are the same value, false otherwise.
     * @template {object} T1
     * @template {object} T2
     * @param {T1} value1 The first value.
     * @param {T2} value2 The second value.
     * @returns {boolean}
     */
    is<T1 extends object, T2 extends object>(value1: T1, value2: T2): value2 is typeof value1;

    /**
     * Sets the prototype of a specified object o to object proto or null. Returns the object o.
     * @template {object} T
     * @template {object} TProto
     * @template {object} TOut
     * @param {T} o The object to change its prototype.
     * @param {TProto | null} proto The value of the new prototype or null.
     * @returns {TOut}
     */
    setPrototypeOf<T extends object, TProto extends object, TOut extends object>(o: T, proto: TProto | null): TOut;

    /**
     * Returns an object created by key-value entries for properties and methods
     * @template {object} T
     * @param {import("type-fest").Entries<T>} entries An iterable object that contains key-value entries for properties and methods.
     * @returns {T}
     */
    fromEntries<T extends object>(entries: Entries<T>): T;

    /**
     * Returns an object created by key-value entries for properties and methods
     * @param {import("type-fest").Entries<any>} entries An iterable object that contains key-value entries for properties and methods.
     * @returns {any}
     */
    fromEntries(entries: Entries<any>): any;

    /**
     * Returns an array of values of the enumerable own properties of an object
     * @template {object} T
     * @param {T | ArrayLike<T>} o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @returns {import("type-fest").ValueOf<T>[]}
     */
    values<T extends object>(o: T | ArrayLike<T>): ValueOf<T>[];

    /**
     * Returns an array of values of the enumerable own properties of an object
     * @template {object} T
     * @param {T} o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @returns {any[]}
     */
    values<T extends object>(o: T): any[];

    /**
     * Returns an array of key/values of the enumerable own properties of an object
     * @template {object} T
     * @param {T | ArrayLike<T>} o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @returns {import("type-fest").Entry<T>[]}
     */
    entries<T extends object>(o: T | ArrayLike<T>): Entry<T>[];

    /**
     * Returns an array of key/values of the enumerable own properties of an object
     * @template {object} T
     * @param {T} o Object that contains the properties and methods. This can be an object that you created or an existing Document Object Model (DOM) object.
     * @returns {[string, any][]}
     */
    entries<T extends object>(o: T): [string, any][];

  }

  interface Array<T> {
    /**
     * Combines two or more arrays.
     * This method returns a new array without modifying any existing arrays.
     * @param {T} items Additional arrays and/or items to add to the end of the array.
     * @returns {T[]}
     */
    concat(...items: ConcatArray<T>[]): T[];
    /**
     * Combines two or more arrays.
     * This method returns a new array without modifying any existing arrays.
     * @param {T} items Additional arrays and/or items to add to the end of the array.
     * @returns {T[]}
     */
    concat(...items: (T | ConcatArray<T>)[]): T[];
    /**
     * Combines two or more arrays.
     * This method returns a new array without modifying any existing arrays.
     * @template TOut
     * @param {T} items Additional arrays and/or items to add to the end of the array.
     * @returns {TOut[]}
     */
    concat<TOut>(...items: ConcatArray<T>[]): TOut[];
    /**
     * Combines two or more arrays.
     * This method returns a new array without modifying any existing arrays.
     * @template TOut
     * @param {T} items Additional arrays and/or items to add to the end of the array.
     * @returns {TOut[]}
     */
    concat<TOut>(...items: (T | ConcatArray<T>)[]): TOut[];
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @template U
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     * @returns {U[]}
     */
    map<U>(callbackfn: (value: T, index: number, array: T[]) => unknown, thisArg?: any): U[];
  }
}
