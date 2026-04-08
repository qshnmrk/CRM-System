export interface Todo {
  id: number
  title: string
  isDone: boolean
}

export interface TodoCounts {
  all: number
  inWork: number
  completed: number
}

export interface ValidationResult {
  isValid: boolean
  error?: string
  value?: string
}

export type FilterType = "all" | "inWork" | "completed"
