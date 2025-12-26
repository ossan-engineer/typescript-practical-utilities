import type { NonEmptyArray } from './non-empty-array'

type User = { id: string; name: string }

// 正常系: 1つ以上の要素
const valid1: NonEmptyArray<number> = [1]
const valid2: NonEmptyArray<number> = [1, 2, 3]
const valid3: NonEmptyArray<string> = ['hello', 'world']

const users: NonEmptyArray<User> = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

// 異常系: 空配列はエラー
// @ts-expect-error - 空配列は不可
const invalidPrimitive: NonEmptyArray<number> = []

// @ts-expect-error - 空配列は不可
const invalidObject: NonEmptyArray<User> = []

// 関数での使用例
const getFirst = <T>(arr: NonEmptyArray<T>): T => {
  return arr[0] // undefined の可能性なし
}

const first = getFirst([1, 2, 3]) // number型として推論される

// @ts-expect-error - 空配列は渡せない
const shouldFail = getFirst([])

// readonly との互換性
const readonlyArr: NonEmptyArray<number> = [1, 2, 3] as const
