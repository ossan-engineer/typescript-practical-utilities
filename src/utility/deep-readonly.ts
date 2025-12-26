/**
 * オブジェクトを再帰的に読み取り専用にする
 *
 * @problem
 * APIレスポンスや共有オブジェクトを誤って変更してしまう。
 * 標準の Readonly は浅いため、ネストしたプロパティは保護されない。
 *
 * @solution
 * 再帰的に全プロパティを readonly にする。
 * 破壊的変更を試みるとコンパイルエラーになる。
 *
 * @why-not-as-const
 * - 既存オブジェクトへの後付け適用が可能
 * - 関数の戻り値型として明示的に使用できる
 * - ジェネリクスと組み合わせた型制約として機能する
 *
 * @example
 * type Config = DeepReadonly<{
 *   api: { endpoint: string; timeout: number }
 *   features: string[]
 * }>
 * const config: Config = { api: { endpoint: '/api', timeout: 3000 }, features: ['a'] }
 * config.api.timeout = 5000 // エラー
 * config.features.push('b') // エラー
 */
export type DeepReadonly<T> = T extends readonly (infer U)[]
  ? readonly DeepReadonly<U>[]
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T
