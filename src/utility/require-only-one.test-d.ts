import type { RequireOnlyOne } from './require-only-one'

type PaymentMethod = RequireOnlyOne<{
  creditCard?: { number: string }
  bankTransfer?: { accountId: string }
  cash?: boolean
}>

// 正常系: 1つだけ指定
const valid1: PaymentMethod = { creditCard: { number: '1234-5678' } }
const valid2: PaymentMethod = { bankTransfer: { accountId: 'ACC001' } }
const valid3: PaymentMethod = { cash: true }

// 異常系: 複数指定はエラー
// @ts-expect-error - 1つだけ許可
const invalid1: PaymentMethod = {
  creditCard: { number: '1234' },
  cash: true,
}

// @ts-expect-error - 1つだけ許可
const invalid2: PaymentMethod = {
  creditCard: { number: '1234' },
  bankTransfer: { accountId: 'ACC001' },
  cash: true,
}

// 異常系: 未指定はエラー
// @ts-expect-error - 1つは必須
const invalid3: PaymentMethod = {}

// シンプルなプリミティブ型でも動作確認
type AuthMethod = RequireOnlyOne<{
  password?: string
  oauth?: string
  biometric?: boolean
}>

const auth1: AuthMethod = { password: 'secret' }
const auth2: AuthMethod = { oauth: 'token123' }
const auth3: AuthMethod = { biometric: true }

// @ts-expect-error - 複数指定は不可
const invalidAuth: AuthMethod = { password: 'secret', oauth: 'token' }
