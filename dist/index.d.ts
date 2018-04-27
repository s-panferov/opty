export interface MatchPattern<T, S, N> {
    some: (_: T) => S;
    none: (() => N) | N;
}
export interface Option<T> {
    match<S, N>(p: MatchPattern<T, S, N>): S | N;
    isSome(): boolean;
    isNone(): boolean;
    isSomeAnd(fn: (a: T) => boolean): boolean;
    isNoneAnd(fn: () => boolean): boolean;
    unwrap(): T;
    unwrapOr(def: T): T;
    unwrapOrElse(f: () => T): T;
    map<U>(f: (a: T) => U): Option<U>;
    mapOr<U>(def: U, f: (a: T) => U): U;
    mapOrElse<U>(def: () => U, f: (a: T) => U): U;
    okOr<E>(err: E): Result<T, E>;
    okOrElse<E>(err: () => E): Result<T, E>;
    and<U>(optb: Option<U>): Option<U>;
    andThen<U>(f: (a: T) => Option<U>): Option<U>;
    or(optb: Option<T>): Option<T>;
    orElse(f: () => Option<T>): Option<T>;
}
export declare class Some<T> implements Option<T> {
    private value;
    constructor(v: T);
    static wrapNull<T>(value: T): Option<T>;
    map<U>(fn: (a: T) => U): Option<U>;
    match<S, N>(p: MatchPattern<T, S, N>): S;
    isSome(): boolean;
    isNone(): boolean;
    isSomeAnd(fn: (a: T) => boolean): boolean;
    isNoneAnd(fn: () => boolean): boolean;
    unwrap(): T;
    unwrapOr(def: T): T;
    unwrapOrElse(f: () => T): T;
    mapOr<U>(def: U, f: (a: T) => U): U;
    mapOrElse<U>(def: () => U, f: (a: T) => U): U;
    okOr<E>(err: E): Result<T, E>;
    okOrElse<E>(err: () => E): Result<T, E>;
    and<U>(optb: Option<U>): Option<U>;
    andThen<U>(f: (a: T) => Option<U>): Option<U>;
    or(optb: Option<T>): Option<T>;
    orElse(f: () => Option<T>): Option<T>;
    toString(): string;
}
export declare class None<T> implements Option<T> {
    constructor();
    match<S, N>(p: MatchPattern<never, S, N>): N;
    map<U>(fn: (a: T) => U): Option<U>;
    isSome(): boolean;
    isNone(): boolean;
    isSomeAnd(fn: (a: T) => boolean): boolean;
    isNoneAnd(fn: () => boolean): boolean;
    unwrap(): T;
    unwrapOr(def: T): T;
    unwrapOrElse(f: () => T): T;
    mapOr<U>(def: U, f: (a: T) => U): U;
    mapOrElse<U>(def: () => U, f: (a: T) => U): U;
    okOr<E>(err: E): Result<T, E>;
    okOrElse<E>(err: () => E): Result<T, E>;
    and<U>(optb: Option<U>): Option<U>;
    andThen<U>(f: (a: T) => Option<U>): Option<U>;
    or(optb: Option<T>): Option<T>;
    orElse(f: () => Option<T>): Option<T>;
    private static _instance;
    static instance<X>(): Option<X>;
    toString(): string;
}
export interface Result<T, E> {
    isOk(): boolean;
    isErr(): boolean;
    ok(): Option<T>;
    err(): Option<E>;
    map<U>(fn: (a: T) => U): Result<U, E>;
    mapErr<U>(fn: (a: E) => U): Result<T, U>;
    and<U>(res: Result<U, E>): Result<U, E>;
    andThen<U>(op: (a: T) => Result<U, E>): Result<U, E>;
    or(res: Result<T, E>): Result<T, E>;
    orElse<U>(op: (a: E) => Result<T, U>): Result<T, U>;
    unwrap(): T;
    unwrapOr(optb: T): T;
    unwrapOrElse(op: (u: E) => T): T;
}
export declare class Ok<T, E> implements Result<T, E> {
    private value;
    constructor(v: T);
    map<U>(fn: (a: T) => U): Result<U, E>;
    mapErr<U>(fn: (a: E) => U): Result<T, U>;
    isOk(): boolean;
    isErr(): boolean;
    ok(): Option<T>;
    err(): Option<E>;
    and<U>(res: Result<U, E>): Result<U, E>;
    andThen<U>(op: (a: T) => Result<U, E>): Result<U, E>;
    or(res: Result<T, E>): Result<T, E>;
    orElse<U>(op: (a: E) => Result<T, U>): Result<T, U>;
    unwrapOr(optb: T): T;
    unwrapOrElse(op: (e: E) => T): T;
    unwrap(): T;
    toString(): string;
}
export declare class Err<T, E> implements Result<T, E> {
    private error;
    constructor(error: E);
    map<U>(fn: (a: T) => U): Result<U, E>;
    mapErr<U>(fn: (a: E) => U): Result<T, U>;
    isOk(): boolean;
    isErr(): boolean;
    ok(): Option<T>;
    err(): Option<E>;
    and<U>(res: Result<U, E>): Result<U, E>;
    andThen<U>(op: (e: T) => Result<U, E>): Result<U, E>;
    or(res: Result<T, E>): Result<T, E>;
    orElse<U>(op: (a: E) => Result<T, U>): Result<T, U>;
    unwrapOr(optb: T): T;
    unwrapOrElse(op: (e: E) => T): T;
    unwrap(): T;
    toString(): string;
}
