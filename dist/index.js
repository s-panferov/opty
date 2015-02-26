var Some = (function () {
    function Some(v) {
        this.value = v;
    }
    Some.wrapNull = function (value) {
        if (value == null) {
            return new None();
        }
        else {
            return new Some(value);
        }
    };
    Some.prototype.map = function (fn) {
        return new Some(fn(this.value));
    };
    Some.prototype.isSome = function () {
        return true;
    };
    Some.prototype.isNone = function () {
        return false;
    };
    Some.prototype.isSomeAnd = function (fn) {
        return fn(this.value);
    };
    Some.prototype.isNoneAnd = function (fn) {
        return false;
    };
    Some.prototype.unwrap = function () {
        return this.value;
    };
    Some.prototype.unwrapOr = function (def) {
        return this.value;
    };
    Some.prototype.unwrapOrElse = function (f) {
        return this.value;
    };
    Some.prototype.mapOr = function (def, f) {
        return f(this.value);
    };
    Some.prototype.mapOrElse = function (def, f) {
        return f(this.value);
    };
    Some.prototype.okOr = function (err) {
        return new Ok(this.value);
    };
    Some.prototype.okOrElse = function (err) {
        return new Ok(this.value);
    };
    Some.prototype.and = function (optb) {
        return optb;
    };
    Some.prototype.andThen = function (f) {
        return f(this.value);
    };
    Some.prototype.or = function (optb) {
        return this;
    };
    Some.prototype.orElse = function (f) {
        return this;
    };
    Some.prototype.toString = function () {
        return "Some " + this.value;
    };
    return Some;
})();
exports.Some = Some;
var None = (function () {
    function None() {
    }
    None.prototype.map = function (fn) {
        return None._instance;
    };
    None.prototype.isSome = function () {
        return false;
    };
    None.prototype.isNone = function () {
        return true;
    };
    None.prototype.isSomeAnd = function (fn) {
        return false;
    };
    None.prototype.isNoneAnd = function (fn) {
        return fn();
    };
    None.prototype.unwrap = function () {
        console.error("None.unwrap()");
        throw "None.get";
        return null;
    };
    None.prototype.unwrapOr = function (def) {
        return def;
    };
    None.prototype.unwrapOrElse = function (f) {
        return f();
    };
    None.prototype.mapOr = function (def, f) {
        return def;
    };
    None.prototype.mapOrElse = function (def, f) {
        return def();
    };
    None.prototype.okOr = function (err) {
        return new Err(err);
    };
    None.prototype.okOrElse = function (err) {
        return new Err(err());
    };
    None.prototype.and = function (optb) {
        return None.instance();
    };
    None.prototype.andThen = function (f) {
        return None.instance();
    };
    None.prototype.or = function (optb) {
        return optb;
    };
    None.prototype.orElse = function (f) {
        return f();
    };
    None.instance = function () {
        return None._instance;
    };
    None.prototype.toString = function () {
        return "None";
    };
    None._instance = new None();
    return None;
})();
exports.None = None;
var Ok = (function () {
    function Ok(v) {
        this.value = v;
    }
    Ok.prototype.map = function (fn) {
        return new Ok(fn(this.value));
    };
    Ok.prototype.mapErr = function (fn) {
        return new Ok(this.value);
    };
    Ok.prototype.isOk = function () {
        return true;
    };
    Ok.prototype.isErr = function () {
        return false;
    };
    Ok.prototype.ok = function () {
        return new Some(this.value);
    };
    Ok.prototype.err = function () {
        return None.instance();
    };
    Ok.prototype.and = function (res) {
        return res;
    };
    Ok.prototype.andThen = function (op) {
        return op(this.value);
    };
    Ok.prototype.or = function (res) {
        return this;
    };
    Ok.prototype.orElse = function (op) {
        return new Ok(this.value);
    };
    Ok.prototype.unwrapOr = function (optb) {
        return this.value;
    };
    Ok.prototype.unwrapOrElse = function (op) {
        return this.value;
    };
    Ok.prototype.unwrap = function () {
        return this.value;
    };
    Ok.prototype.toString = function () {
        return "Some " + this.value;
    };
    return Ok;
})();
exports.Ok = Ok;
var Err = (function () {
    function Err(error) {
        this.error = error;
    }
    Err.prototype.map = function (fn) {
        return this;
    };
    Err.prototype.mapErr = function (fn) {
        return new Err(fn(this.error));
    };
    Err.prototype.isOk = function () {
        return false;
    };
    Err.prototype.isErr = function () {
        return false;
    };
    Err.prototype.ok = function () {
        return None.instance();
    };
    Err.prototype.err = function () {
        return new Some(this.error);
    };
    Err.prototype.and = function (res) {
        return new Err(this.error);
    };
    Err.prototype.andThen = function (op) {
        return new Err(this.error);
    };
    Err.prototype.or = function (res) {
        return res;
    };
    Err.prototype.orElse = function (op) {
        return op(this.error);
    };
    Err.prototype.unwrapOr = function (optb) {
        return optb;
    };
    Err.prototype.unwrapOrElse = function (op) {
        return op(this.error);
    };
    Err.prototype.unwrap = function () {
        throw "Err.get";
    };
    Err.prototype.toString = function () {
        return "None";
    };
    return Err;
})();
exports.Err = Err;
//# sourceMappingURL=index.js.map