import type { XOR } from './xor'

type UserAuth = XOR<{ userId: string }, { guestToken: string }>

// 正常系: どちらか一方のみ
const valid1: UserAuth = { userId: '123' }
const valid2: UserAuth = { guestToken: 'abc' }

// 異常系: 両方指定はエラー
// @ts-expect-error - 両方指定は不可
const invalid1: UserAuth = { userId: '123', guestToken: 'abc' }

// 異常系: 両方未指定はエラー
// @ts-expect-error - 空オブジェクトは不可
const invalid2: UserAuth = {}

// ネストしたオブジェクトでも動作確認
type PaymentAuth = XOR<{ card: { number: string; cvv: string } }, { bank: { accountId: string } }>

const cardPayment: PaymentAuth = { card: { number: '1234', cvv: '123' } }
const bankPayment: PaymentAuth = { bank: { accountId: 'acc123' } }

// @ts-expect-error - 両方指定は不可
const invalidPayment: PaymentAuth = {
  card: { number: '1234', cvv: '123' },
  bank: { accountId: 'acc123' },
}

// @ts-expect-error - 両方未指定は不可
const emptyPayment: PaymentAuth = {}
