import { TodosAccess } from '../dataLayer/todosAcess'
import { AttachmentUtils } from './attachmentUtils'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')
const attachmentUtils = new AttachmentUtils()
const todosAccess = new TodosAccess()

// create todo function
export const createTodo = async (
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> => {
  logger.info('Create todo function')
  const todoId = uuid.v4()
  const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
  const createdAt = new Date().toString()
  const newItem = {
    userId,
    todoId,
    createdAt,
    attachmentUrl,
    done: false,
    ...newTodo
  }

  return await todosAccess.createTodoItem(newItem)
}

// get todo function
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
  try {
    return await todosAccess.getAllTodos(userId)
  } catch (error) {
    createError('Error getting user todos ', error)
    return error
  }
}
