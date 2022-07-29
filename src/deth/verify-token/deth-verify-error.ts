import { DethVerifyErrorCode } from "./types";

export class DethVerifyError extends Error {
  code: DethVerifyErrorCode;

  constructor(code: DethVerifyErrorCode) {
    super(`[DethVerifyError]: ${code}`);
    this.code = code;

    Object.setPrototypeOf(this, DethVerifyError.prototype);
  }
}
