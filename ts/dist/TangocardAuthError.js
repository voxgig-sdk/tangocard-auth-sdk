"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TangocardAuthError = void 0;
class TangocardAuthError extends Error {
    isTangocardAuthError = true;
    sdk = 'TangocardAuth';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TangocardAuthError = TangocardAuthError;
//# sourceMappingURL=TangocardAuthError.js.map