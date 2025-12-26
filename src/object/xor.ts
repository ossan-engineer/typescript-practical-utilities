/**
 * 排他的なオプション指定を型で保証する
 *
 * @problem
 * フォームや設定オブジェクトで「AかBのどちらか一方のみ」を
 * 指定させたいが、両方指定や両方未指定を防げない。
 *
 * @solution
 * T と U のどちらか一方のみを許可する排他的ユニオン型を生成。
 * 両方指定・両方未指定はコンパイルエラーになる。
 *
 * @example
 * type Props = XOR<{ userId: string }, { guestToken: string }>
 * const valid1: Props = { userId: '123' } // OK
 * const valid2: Props = { guestToken: 'abc' } // OK
 * const invalid1: Props = { userId: '123', guestToken: 'abc' } // エラー
 * const invalid2: Props = {} // エラー
 */
type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U
