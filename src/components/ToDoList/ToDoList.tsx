import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
import { useEffect, useState } from 'react'
import { Todo } from '../../@types/todos.type'

// interface HandleNewToDos {
//   (todos: Todo[]): Todo[]
// }

type HandleNewToDos = (todos: Todo[]) => Todo[]

const syncReactStateWithLocalStorage = (handleNewTodos: HandleNewToDos) => {
  const todosObject = JSON.parse(localStorage.getItem('todos') || '[]')
  const newTodoObject = handleNewTodos(todosObject)
  localStorage.setItem('todos', JSON.stringify(newTodoObject))
}

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const doneTodos = todos.filter((todo) => todo.isDone)
  const unDoneTodos = todos.filter((todo) => !todo.isDone)
  const [currentToDo, setCurrentToDo] = useState<Todo | null>(null)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todoObject: Todo[] = JSON.parse(todosString || '[]')
    setTodos(todoObject)
  }, [])

  const addTodo = (name: string) => {
    const todo: Todo = {
      id: new Date().toISOString(),
      caption: name,
      isDone: false
    }
    setTodos((prev) => [...prev, todo])
    syncReactStateWithLocalStorage((todosObject: Todo[]) => [...todosObject, todo])
  }

  const handleDoneToDo = (id: string, isDone: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone }
        }
        return todo
      })
    })
  }
  const startEditToDo = (id: string) => {
    const foundCurrentToDo = todos.find((todo) => todo.id === id)
    if (foundCurrentToDo) {
      setCurrentToDo(foundCurrentToDo)
    }
  }
  const editToDo = (name: string) => {
    setCurrentToDo((prev) => {
      if (prev) {
        return {
          ...prev,
          caption: name
        }
      }
      return null
    })
  }

  const saveEditToDo = () => {
    const handler = (todos: Todo[]) => {
      return todos.map((todo) => {
        if (todo.id === (currentToDo as Todo).id) {
          return currentToDo as Todo
        }
        return todo
      })
    }
    setTodos(handler(todos))
    setCurrentToDo(null)
    syncReactStateWithLocalStorage(handler)
  }

  const deleteToDo = (id: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id)
    })
    if (currentToDo && currentToDo.id === id) {
      setCurrentToDo(null)
    }
    syncReactStateWithLocalStorage((todosObject: Todo[]) => todosObject.filter((todo) => todo.id !== id))
  }

  return (
    <div className={styles.toDoList}>
      <div className={styles.toDoListContainer}>
        <TaskInput addTodo={addTodo} currentToDo={currentToDo} editToDo={editToDo} saveEditToDo={saveEditToDo} />
        <TaskList
          todos={unDoneTodos}
          handleDoneToDo={handleDoneToDo}
          startEditToDo={startEditToDo}
          editToDo={editToDo}
          deleteToDo={deleteToDo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneToDo={handleDoneToDo}
          startEditToDo={startEditToDo}
          editToDo={editToDo}
          deleteToDo={deleteToDo}
        />
      </div>
    </div>
  )
}
