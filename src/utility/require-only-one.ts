/**
 * 複数候補のうち「必ず1つだけ」を保証する
 *
 * @problem
 * API入力やUIの条件分岐で「複数の選択肢から1つだけ選ぶ」
 * という制約を型で表現できない。複数指定や未指定を防げない。
 *
 * @solution
 * 1つのプロパティを必須にし、他を never で禁止したユニオン型を生成。
 * 複数指定・未指定はコンパイルエラーになる。
 *
 * @example
 * type PaymentMethod = RequireOnlyOne<{
 *   creditCard?: { number: string }
 *   bankTransfer?: { accountId: string }
 *   cash?: boolean
 * }>
 * const valid: PaymentMethod = { creditCard: { number: '1234' } } // OK
 * const invalid1: PaymentMethod = { creditCard: { number: '1234' }, cash: true } // エラー
 * const invalid2: PaymentMethod = {} // エラー
 */
export type RequireOnlyOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & { [P in Exclude<keyof T, K>]?: never }
}[keyof T]
