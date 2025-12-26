import type { StrictOmit } from './strict-omit'

type User = {
  id: string
  name: string
  password: string
}

// 正常系: 存在するキーを除外
type SafeUser = StrictOmit<User, 'password'>
const safeUser: SafeUser = { id: '1', name: 'John' }

// 正常系: 複数キーを除外
type PublicUser = StrictOmit<User, 'password' | 'id'>
const publicUser: PublicUser = { name: 'John' }

// 異常系: 存在しないキーを指定するとエラー
// @ts-expect-error - 'foo' は User に存在しない
type Invalid = StrictOmit<User, 'foo'>

// @ts-expect-error - 'email' は User に存在しない
type PartiallyInvalid = StrictOmit<User, 'password' | 'email'>
