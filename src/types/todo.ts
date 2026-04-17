export interface Todo {
  id: number
  title: string
  created: string
  isDone: boolean
}

export interface TodoInfo {
  all: number
  inWork: number
  completed: number
}

export interface MetaResponse<T, N = undefined> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}

export interface TodoRequest {
  title?: string
  isDone?: boolean
}

export type ValidationResult =
  | {
      isValid: true
      value: string
    }
  | {
      isValid: false
      error: string
    }

export type Filter = "all" | "inWork" | "completed"
