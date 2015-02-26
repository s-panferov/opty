# Opty

This library contains `Option` and `Result` types ported from Rust. You can use it for JavaScript 
and TypeScript projects to create `null`-safe applications.

## Usage

```
npm install --save opty
```

```
var opty = require("opty");
```

**Require .d.ts for typescript:**

```typescript
/// <reference path="./node_modules/opty/index.d.ts" />
```

```
import opty = require("opty");
```

## Interfaces

### Option

```typescript
interface Option<T> {
    /**
     * Returns true if the option is a Some value
     */
    isSome(): boolean;

    /**
     * Returns true if the option is a None value
     */
    isNone(): boolean;

    /**
     * Returns check result if the option is a Some value
     */
    isSomeAnd(fn: (a: T) => boolean): boolean;

    /**
     * Returns check result if the option is a None value
     */
    isNoneAnd(fn: () => boolean): boolean;

    /**
     * Returns the inner T of a Some(T). Throws an exception if the self value equals None.
     */
    unwrap(): T;

    /**
     * Returns the contained value or a default.
     * @param def
     */
    unwrapOr(def: T): T;

    /**
     * Returns the contained value or computes it from a closure.
     * @param f
     */
    unwrapOrElse(f: () => T): T;

    /**
     * Maps an Option<T> to Option<U> by applying a function to a contained value
     * @param f
     */
    map<U>(f: (a: T) => U): Option<U>;

    /**
     * Applies a function to the contained value or returns a default.
     * @param def
     * @param f
     */
    mapOr<U>(def: U, f: (a: T) => U): U;

    /**
     * Applies a function to the contained value or computes a default.
     * @param def
     * @param f
     */
    mapOrElse<U>(def: () => U, f: (a: T) => U): U;

    /**
     * Transforms the Option<T> into a Result<T, E>, mapping Some(v) to Ok(v) and None to Err(err).
     * @param err
     */
    okOr<E>(err: E): Result<T, E>;

    /**
     * Transforms the Option<T> into a Result<T, E>, mapping Some(v) to Ok(v) and None to Err(err()).
     * @param err
     */
    okOrElse<E>(err: () => E): Result<T, E>;

    /**
     * Returns None if the option is None, otherwise returns optb.
     * @param optb
     */
    and<U>(optb: Option<U>): Option<U>;

    /**
     * Returns None if the option is None, otherwise calls f with the wrapped value and returns the result.
     * Some languages call this operation flatmap.
     * @param f
     */
    andThen<U>(f: (a: T) => Option<U>): Option<U>;

    /**
     * Returns the option if it contains a value, otherwise returns optb.
     * @param optb
     */
    or(optb: Option<T>): Option<T>;

    /**
     * Returns the option if it contains a value, otherwise calls f and returns the result.
     * @param f
     */
    orElse(f: () => Option<T>): Option<T>;
}
```

### Result

```typescript
export interface Result<T, E> {
    /**
     * Returns true if the result is Ok
     */
    isOk(): boolean;

    /**
     * Returns true if the result is Err
     */
    isErr(): boolean;

    /**
     * Convert from Result<T, E> to Option<T>
     * Converts self into an Option<T>, and discarding the error, if any.
     */
    ok(): Option<T>;

    /**
     * Convert from Result<T, E> to Option<E>
     * Converts self into an Option<E>, and discarding the value, if any.
     */
    err(): Option<E>;

    /**
     * Maps a Result<T, E> to Result<U, E> by applying a function to an contained Ok value, leaving an Err value untouched.
     * This function can be used to compose the results of two functions.
     * @param fn
     */
    map<U>(fn: (a: T) => U): Result<U, E>;

    /**
     * Maps a Result<T, E> to Result<T, F> by applying a function to an contained Err value, leaving an Ok value untouched.
     * This function can be used to pass through a successful result while handling an error.
     * @param fn
     */
    mapErr<U>(fn: (a: E) => U): Result<T, U>;

    /**
     * Returns res if the result is Ok, otherwise returns the Err value of self.
     * @param res
     */
    and<U>(res: Result<U,E>): Result<U,E>;

    /**
     * Calls op if the result is Ok, otherwise returns the Err value of self.
     * This function can be used for control flow based on result values.
     * @param op
     */
    andThen<U>(op: (a: T) => Result<U,E>): Result<U,E>;

    /**
     * Returns res if the result is Err, otherwise returns the Ok value of self.
     * @param res
     */
    or(res: Result<T,E>): Result<T,E>;

    /**
     * Calls op if the result is Err, otherwise returns the Ok value of self.
     * This function can be used for control flow based on result values.
     * @param op
     */
    orElse<U>(op: (a: E) => Result<T,U>): Result<T,U>;

    /**
     * Unwraps a result, yielding the content of an Ok.
     */
    unwrap(): T;

    /**
     * Unwraps a result, yielding the content of an Ok. Else it returns optb.
     */
    unwrapOr(optb: T): T;

    /**
     * Unwraps a result, yielding the content of an Err.
     * @param op
     */
    unwrapOrElse(op: (u: E) => T): T
}
```