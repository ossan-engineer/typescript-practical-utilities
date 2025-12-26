# TypeScript Practical Utilities

TypeScript の型機能を用いて、実務における事故を未然に防ぐためのユーティリティ集。

## Why

TypeScript は「書ける」だけでは不十分。
実務では以下のような事故が繰り返し起きる：

- `any` の蔓延による型崩壊
- API レスポンスやフォーム入力の仕様逸脱
- オプション指定の曖昧さによるバグ
- 空配列・不正構造による実行時エラー

本リポジトリは、これらの事故を **型で防ぐ** ことを目的とする。

## Philosophy

- 型安全は「賢さ」ではなく **防御**
- 書く人より **保守する人** のための型
- 型はドキュメントであり、ガードレール
- 実務で「やらかした経験」から逆算する
- フレームワークや UI に依存しない
- 標準で足りるものは作らない

## Non-Goals

- 型パズル・型体操
- Conditional Types の技巧自慢
- 標準ユーティリティの再実装（`Awaited<T>` など）
- 網羅的な util コレクション
- use case を文章で説明できない型

## Utilities

### Object / 構造制御

#### `StrictOmit<T, K>`

標準の `Omit` と異なり、存在しないキーを指定するとコンパイルエラーになる。

```ts
type User = { id: string; name: string; password: string }

type SafeUser = StrictOmit<User, 'password'> // OK
type Invalid = StrictOmit<User, 'foo'> // コンパイルエラー
```

#### `XOR<T, U>`

排他的なオプション指定を型で保証。両方指定・両方未指定はエラー。

```ts
type Props = XOR<{ userId: string }, { guestToken: string }>

const valid1: Props = { userId: '123' } // OK
const valid2: Props = { guestToken: 'abc' } // OK
const invalid: Props = { userId: '123', guestToken: 'abc' } // エラー
```

### Utility / 制約表現

#### `RequireAtLeastOne<T>`

オブジェクトに「最低1つは必須」を課す。空オブジェクトはエラー。

```ts
type Filter = RequireAtLeastOne<{
  name?: string
  age?: number
  email?: string
}>

const valid: Filter = { name: 'John' } // OK
const invalid: Filter = {} // エラー
```

#### `RequireOnlyOne<T>`

複数候補のうち「必ず1つだけ」を保証。複数指定・未指定はエラー。

```ts
type PaymentMethod = RequireOnlyOne<{
  creditCard?: { number: string }
  bankTransfer?: { accountId: string }
  cash?: boolean
}>

const valid: PaymentMethod = { creditCard: { number: '1234' } } // OK
const invalid: PaymentMethod = { creditCard: { number: '1234' }, cash: true } // エラー
```

#### `NonEmptyArray<T>`

空配列を型レベルで禁止。`arr[0]` への安全なアクセスを保証。

```ts
type Users = NonEmptyArray<User>

const valid: Users = [user1] // OK
const invalid: Users = [] // エラー

function getFirst<T>(arr: NonEmptyArray<T>): T {
  return arr[0] // undefined の可能性なし
}
```

#### `DeepReadonly<T>`

オブジェクトを再帰的に読み取り専用にする。ネストしたプロパティも保護。

```ts
type Config = DeepReadonly<{
  api: { endpoint: string; timeout: number }
  features: string[]
}>

const config: Config = { api: { endpoint: '/api', timeout: 3000 }, features: ['a'] }
config.api.timeout = 5000 // エラー
config.features.push('b') // エラー
```

## License

MIT
