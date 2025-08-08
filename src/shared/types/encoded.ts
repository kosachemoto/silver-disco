export type TEncoded<T> = T extends ArrayBuffer
    ? Base64URLString
    : T extends Array<infer U>
      ? Array<TEncoded<U>>
      : T extends object
        ? { [K in keyof T]: TEncoded<T[K]> }
        : T;
