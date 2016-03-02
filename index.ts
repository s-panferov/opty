export interface Option<T> {
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

export class Some<T> implements Option<T> {
    private value: T;

    constructor(v: T) {
        this.value = v;
    }

    static wrapNull<T>(value: T): Option<T> {
        if (value == null) {
            return new None<T>();
        } else {
            return new Some<T>(value);
        }
    }

    map <U>(fn: (a: T) => U): Option<U> {
        return new Some(fn(this.value))
    }

    isSome(): boolean {
        return true;
    }

    isNone(): boolean {
        return false;
    }

    isSomeAnd(fn: (a: T) => boolean): boolean {
        return fn(this.value)
    }

    isNoneAnd(fn: () => boolean): boolean {
        return false
    }

    unwrap(): T {
        return this.value
    }

    unwrapOr(def: T): T {
        return this.value;
    }

    unwrapOrElse(f: () => T): T {
        return this.value;
    }

    mapOr<U>(def: U, f: (a: T) => U): U {
        return f(this.value)
    }

    mapOrElse<U>(def: () => U, f: (a: T) => U): U {
        return f(this.value)
    }

    okOr<E>(err: E): Result<T, E> {
        return new Ok<T, E>(this.value)
    }

    okOrElse<E>(err: () => E): Result<T, E> {
        return new Ok<T, E>(this.value)
    }

    and<U>(optb: Option<U>): Option<U> {
        return optb;
    }

    andThen<U>(f: (a: T) => Option<U>): Option<U> {
        return f(this.value);
    }

    or(optb: Option<T>): Option<T> {
        return this;
    }

    orElse(f: () => Option<T>): Option<T> {
        return this;
    }

    toString(): string {
        return "Some " + this.value;
    }
}

export class None<T> implements Option<T> {

    constructor() {

    }

    map <U>(fn: (a: T) => U): Option<U> {
        return <Option<U>>None._instance;
    }

    isSome(): boolean {
        return false;
    }

    isNone(): boolean {
        return true;
    }

    isSomeAnd(fn: (a: T) => boolean): boolean {
        return false
    }

    isNoneAnd(fn: () => boolean): boolean {
        return fn()
    }

    unwrap(): T {
        throw "None.get";
    }

    unwrapOr(def: T): T {
        return def;
    }

    unwrapOrElse(f: () => T): T {
        return f()
    }

    mapOr<U>(def: U, f: (a: T) => U): U {
        return def;
    }

    mapOrElse<U>(def: () => U, f: (a: T) => U): U {
        return def();
    }

    okOr<E>(err: E): Result<T, E> {
        return new Err<T, E>(err)
    }

    okOrElse<E>(err: () => E): Result<T, E> {
        return new Err<T, E>(err())
    }

    and<U>(optb: Option<U>): Option<U> {
        return None.instance<U>();
    }

    andThen<U>(f: (a: T) => Option<U>): Option<U> {
        return None.instance<U>();
    }

    or(optb: Option<T>): Option<T> {
        return optb;
    }

    orElse(f: () => Option<T>): Option<T> {
        return f();
    }

    private static _instance: Option<any> = new None();

    public static instance<X>(): Option<X> {
        return <Option<X>> None._instance;
    }

    public toString(): string {
        return "None";
    }
}

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

export class Ok<T, E> implements Result<T, E> {
    private value: T;

    constructor(v: T) {
        this.value = v;
    }

    map <U>(fn: (a: T) => U): Result<U, E> {
        return new Ok<U, E>(fn(this.value))
    }

    mapErr <U>(fn: (a: E) => U): Result<T, U> {
        return new Ok<T, U>(this.value);
    }

    isOk(): boolean {
        return true;
    }

    isErr(): boolean {
        return false;
    }

    ok(): Option<T> {
        return new Some(this.value);
    }

    err(): Option<E> {
        return None.instance<E>();
    }

    and<U>(res: Result<U,E>): Result<U,E> {
        return res;
    }

    andThen<U>(op: (a: T) => Result<U,E>): Result<U,E> {
        return op(this.value);
    }

    or(res: Result<T,E>): Result<T,E> {
        return this;
    }

    orElse<U>(op: (a: E) => Result<T,U>): Result<T,U> {
        return new Ok<T,U>(this.value);
    }

    unwrapOr(optb: T): T {
        return this.value;
    }

    unwrapOrElse(op: (e: E) => T): T {
        return this.value;
    }

    unwrap(): T {
        return this.value
    }

    toString(): string {
        return "Some " + this.value;
    }
}

export class Err<T, E> implements Result<T, E> {
    private error: E;

    constructor(error: E) {
        this.error = error;
    }

    map <U>(fn: (a: T) => U): Result<T, E> {
        return this;
    }

    mapErr <U>(fn: (a: E) => U): Result<T, U> {
        return new Err<T,U>(fn(this.error));
    }

    isOk(): boolean {
        return false;
    }

    isErr(): boolean {
        return false;
    }

    ok(): Option<T> {
        return None.instance<T>();
    }

    err(): Option<E> {
        return new Some(this.error);
    }

    and<U>(res: Result<U,E>): Result<U,E> {
        return new Err<U,E>(this.error);
    }

    andThen<U>(op: (e: T) => Result<U,E>): Result<U,E> {
        return new Err<U,E>(this.error);
    }

    or(res: Result<T,E>): Result<T,E> {
        return res;
    }

    orElse<U>(op: (a: E) => Result<T,U>): Result<T,U> {
        return op(this.error);
    }

    unwrapOr(optb: T): T {
        return optb;
    }

    unwrapOrElse(op: (e: E) => T): T {
        return op(this.error);
    }

    unwrap(): T {
        throw "Err.get"
    }

    public toString(): string {
        return "None";
    }
}