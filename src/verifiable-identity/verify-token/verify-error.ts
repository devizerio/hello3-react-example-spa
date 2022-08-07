import { VerifyErrorCode } from "./types";

export class VerifyError extends Error {
  code: VerifyErrorCode;

  constructor(code: VerifyErrorCode) {
    super(`[VerifyError]: ${code}`);
    this.code = code;

    Object.setPrototypeOf(this, VerifyError.prototype);
  }
}
