import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CreateTodoPayload, UpdateTodoPayload } from 'App/Types/Todo'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({}: HttpContextContract) {
    const list = await Todo.query().orderBy('is_favorite', 'desc').orderBy('created_at', 'desc')
    return list
  }

  public async show({ params, response }: HttpContextContract) {
    const id = Number(params.id)
    const todo = await Todo.find(id)
    if (!todo) return response.status(404).json({ message: 'Todo not found' })
    return todo
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['title', 'description', 'color']) as CreateTodoPayload
    if (!payload.title || typeof payload.title !== 'string') {
      return response.status(422).json({ message: 'title is required' })
    }

    const todo = await Todo.create({
      title: payload.title.trim(),
      description: payload.description?.trim(),
      color: payload.color,
      isFavorite: false,
    })
    return response.status(201).json(todo)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = Number(params.id)
    const todo = await Todo.find(id)
    if (!todo) return response.status(404).json({ message: 'Todo not found' })

    const body = request.body() as any
    const hasIsFavorite = Object.prototype.hasOwnProperty.call(body, 'isFavorite')

    let nextIsFavorite: boolean | undefined
    if (hasIsFavorite) {
      const v: any = body.isFavorite
      if (v === true || v === 'true' || v === 1 || v === '1') {
        nextIsFavorite = true
      } else if (v === false || v === 'false' || v === 0 || v === '0') {
        nextIsFavorite = false
      }
    }

    todo.merge({
      title: body.title ?? todo.title,
      description: body.description ?? todo.description,
      color: body.color ?? todo.color,
      isFavorite: nextIsFavorite !== undefined ? nextIsFavorite : todo.isFavorite,
    })
    await todo.save()
    return todo
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = Number(params.id)
    const todo = await Todo.find(id)
    if (!todo) return response.status(404).json({ message: 'Todo not found' })
    await todo.delete()
    return response.status(204)
  }

  public async favorite({ params, response }: HttpContextContract) {
    const id = Number(params.id)
    const todo = await Todo.find(id)
    if (!todo) return response.status(404).json({ message: 'Todo not found' })
    todo.isFavorite = true
    await todo.save()
    return todo
  }

  public async unfavorite({ params, response }: HttpContextContract) {
    const id = Number(params.id)
    const todo = await Todo.find(id)
    if (!todo) return response.status(404).json({ message: 'Todo not found' })
    todo.isFavorite = false
    await todo.save()
    return todo
  }

  public async setColor({ params, request, response }: HttpContextContract) {
    const id = Number(params.id)
    const color = request.input('color') as string | undefined
    if (!color) return response.status(422).json({ message: 'color is required' })
    const todo = await Todo.find(id)
    if (!todo) return response.status(404).json({ message: 'Todo not found' })
    todo.color = color
    await todo.save()
    return todo
  }
}
