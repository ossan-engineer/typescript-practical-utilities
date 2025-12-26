/**
 * オブジェクトから指定キーを厳密に除外する
 *
 * @problem
 * 標準の Omit は存在しないキーも指定できてしまう。
 * タイポや仕様変更時に気づけず、意図しないプロパティが残る。
 *
 * @solution
 * K が T の keyof であることを型レベルで強制する。
 * 存在しないキーを指定するとコンパイルエラーになる。
 *
 * @example
 * type User = { id: string; name: string; password: string }
 * type SafeUser = StrictOmit<User, 'password'> // OK
 * type Invalid = StrictOmit<User, 'foo'> // コンパイルエラー
 */
export type StrictOmit<T, K extends keyof T> = Omit<T, K>
