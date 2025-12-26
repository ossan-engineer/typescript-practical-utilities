/**
 * 空配列を型レベルで禁止する
 *
 * @problem
 * 配列を受け取る関数で空配列が渡されると実行時エラーになる。
 * array[0] へのアクセスが undefined になるリスクを型で防げない。
 *
 * @solution
 * 最低1要素を持つタプル型として定義。
 * 空配列を渡そうとするとコンパイルエラーになる。
 *
 * @example
 * type Users = NonEmptyArray<User>
 * const valid: Users = [user1] // OK
 * const invalid: Users = [] // エラー
 *
 * function getFirst<T>(arr: NonEmptyArray<T>): T {
 *   return arr[0] // 安全にアクセス可能
 * }
 */
export type NonEmptyArray<T> = readonly [T, ...T[]]
