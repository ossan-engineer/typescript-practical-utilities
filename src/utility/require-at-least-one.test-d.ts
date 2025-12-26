import type { RequireAtLeastOne } from './require-at-least-one'

type Filter = RequireAtLeastOne<{
  name?: string
  age?: number
  email?: string
}>

// 正常系: 1つ以上指定
const valid1: Filter = { name: 'John' }
const valid2: Filter = { age: 30 }
const valid3: Filter = { name: 'John', age: 30 }
const valid4: Filter = { name: 'John', age: 30, email: 'john@example.com' }

// 異常系: 空オブジェクトはエラー
// @ts-expect-error - 最低1つは必須
const invalid: Filter = {}
