/**
 * オブジェクトに「最低1つは必須」を課す
 *
 * @problem
 * 設定オブジェクトで「全てオプショナルだが、最低1つは指定必須」
 * という制約を型で表現できない。空オブジェクトが許容されてしまう。
 *
 * @solution
 * 各プロパティを1つずつ必須にしたユニオン型を生成。
 * 空オブジェクトはコンパイルエラーになる。
 *
 * @example
 * type Filter = RequireAtLeastOne<{
 *   name?: string
 *   age?: number
 *   email?: string
 * }>
 * const valid: Filter = { name: 'John' } // OK
 * const invalid: Filter = {} // エラー
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]
