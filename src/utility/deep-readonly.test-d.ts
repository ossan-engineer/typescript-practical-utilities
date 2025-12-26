import type { DeepReadonly } from './deep-readonly'

type Config = {
  api: {
    endpoint: string
    timeout: number
    headers: {
      authorization: string
    }
  }
  features: string[]
  metadata: {
    version: string
    tags: string[]
  }
}

const config: DeepReadonly<Config> = {
  api: {
    endpoint: '/api',
    timeout: 3000,
    headers: {
      authorization: 'Bearer token',
    },
  },
  features: ['feature1', 'feature2'],
  metadata: {
    version: '1.0.0',
    tags: ['prod', 'stable'],
  },
}

// 異常系: トップレベルのプロパティ変更はエラー
// @ts-expect-error - readonly
config.api = { endpoint: '/new', timeout: 1000, headers: { authorization: '' } }

// 異常系: ネストしたプロパティ変更はエラー
// @ts-expect-error - readonly
config.api.timeout = 5000

// @ts-expect-error - readonly
config.api.headers.authorization = 'new token'

// 異常系: 配列のミューテーションはエラー
// @ts-expect-error - readonly array
config.features.push('feature3')

// @ts-expect-error - readonly array
config.features[0] = 'changed'

// @ts-expect-error - readonly
config.metadata.tags.push('new')

// 正常系: 読み取りは可能
const endpoint: string = config.api.endpoint
const firstFeature: string = config.features[0]
const version: string = config.metadata.version

// プリミティブ型はそのまま
type Primitive = DeepReadonly<string>
const str: Primitive = 'hello'

// 配列の DeepReadonly
type ReadonlyNumbers = DeepReadonly<number[]>
const nums: ReadonlyNumbers = [1, 2, 3]

// @ts-expect-error - readonly array
nums.push(4)
