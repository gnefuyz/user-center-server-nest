/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpException } from '@nestjs/common';

export const errorCode = {
  1001: ['用户未授权', 401],
  1002: ['账号或密码错误', 400],
};

export function throwError(code: keyof typeof errorCode) {
  return function (target, methodName: string, desc: any) {
    desc.value = async function (...args: unknown[]) {
      const message = <string>errorCode[code][0];
      const statusCode = <number>errorCode[code][1];
      throw new HttpException({ code, message }, statusCode);
    };
  };
}

export class ResponseException {
  @throwError(1001)
  static Unauthorized() {}

  @throwError(1002)
  static Validate_Login_Error() {}
}
