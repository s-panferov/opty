"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Some {
    constructor(v) {
        this.value = v;
    }
    static wrapNull(value) {
        if (value == null) {
            return new None();
        }
        else {
            return new Some(value);
        }
    }
    map(fn) {
        return new Some(fn(this.value));
    }
    match(p) {
        return p.some(this.value);
    }
    isSome() {
        return true;
    }
    isNone() {
        return false;
    }
    isSomeAnd(fn) {
        return fn(this.value);
    }
    isNoneAnd(fn) {
        return false;
    }
    unwrap() {
        return this.value;
    }
    unwrapOr(def) {
        return this.value;
    }
    unwrapOrElse(f) {
        return this.value;
    }
    mapOr(def, f) {
        return f(this.value);
    }
    mapOrElse(def, f) {
        return f(this.value);
    }
    okOr(err) {
        return new Ok(this.value);
    }
    okOrElse(err) {
        return new Ok(this.value);
    }
    and(optb) {
        return optb;
    }
    andThen(f) {
        return f(this.value);
    }
    or(optb) {
        return this;
    }
    orElse(f) {
        return this;
    }
    toString() {
        return "Some " + this.value;
    }
}
exports.Some = Some;
class None {
    constructor() {
    }
    match(p) {
        if (typeof p.none === 'function') {
            return p.none();
        }
        else {
            return p.none;
        }
    }
    map(fn) {
        return None._instance;
    }
    isSome() {
        return false;
    }
    isNone() {
        return true;
    }
    isSomeAnd(fn) {
        return false;
    }
    isNoneAnd(fn) {
        return fn();
    }
    unwrap() {
        throw "None.get";
    }
    unwrapOr(def) {
        return def;
    }
    unwrapOrElse(f) {
        return f();
    }
    mapOr(def, f) {
        return def;
    }
    mapOrElse(def, f) {
        return def();
    }
    okOr(err) {
        return new Err(err);
    }
    okOrElse(err) {
        return new Err(err());
    }
    and(optb) {
        return None.instance();
    }
    andThen(f) {
        return None.instance();
    }
    or(optb) {
        return optb;
    }
    orElse(f) {
        return f();
    }
    static instance() {
        return None._instance;
    }
    toString() {
        return "None";
    }
}
None._instance = new None();
exports.None = None;
class Ok {
    constructor(v) {
        this.value = v;
    }
    map(fn) {
        return new Ok(fn(this.value));
    }
    mapErr(fn) {
        return new Ok(this.value);
    }
    isOk() {
        return true;
    }
    isErr() {
        return false;
    }
    ok() {
        return new Some(this.value);
    }
    err() {
        return None.instance();
    }
    and(res) {
        return res;
    }
    andThen(op) {
        return op(this.value);
    }
    or(res) {
        return this;
    }
    orElse(op) {
        return new Ok(this.value);
    }
    unwrapOr(optb) {
        return this.value;
    }
    unwrapOrElse(op) {
        return this.value;
    }
    unwrap() {
        return this.value;
    }
    toString() {
        return "Some " + this.value;
    }
}
exports.Ok = Ok;
class Err {
    constructor(error) {
        this.error = error;
    }
    map(fn) {
        return new Err(this.error);
    }
    mapErr(fn) {
        return new Err(fn(this.error));
    }
    isOk() {
        return false;
    }
    isErr() {
        return false;
    }
    ok() {
        return None.instance();
    }
    err() {
        return new Some(this.error);
    }
    and(res) {
        return new Err(this.error);
    }
    andThen(op) {
        return new Err(this.error);
    }
    or(res) {
        return res;
    }
    orElse(op) {
        return op(this.error);
    }
    unwrapOr(optb) {
        return optb;
    }
    unwrapOrElse(op) {
        return op(this.error);
    }
    unwrap() {
        throw "Err.get";
    }
    toString() {
        return "None";
    }
}
exports.Err = Err;
//# sourceMappingURL=index.js.map