export interface ITodo {
  id: number
  title: string
  description?: string
  isFavorite: boolean
  color?: string
  createdAt: Date
  updatedAt: Date
}

export type CreateTodoPayload = {
  title: string
  description?: string
  color?: string
}

export type UpdateTodoPayload = Partial<CreateTodoPayload> & {
  isFavorite?: boolean
}
