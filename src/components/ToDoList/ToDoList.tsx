import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
import { useState } from 'react'
import { Todo } from '../../@types/todos.type'

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const doneTodos = todos.filter((todo) => todo.isDone)
  const unDoneTodos = todos.filter((todo) => !todo.isDone)
  const [currentToDo, setCurrentToDo] = useState<Todo | null>(null)
  const addTodo = (name: string) => {
    setTodos([
      ...todos,
      {
        id: new Date().toISOString(),
        caption: name,
        isDone: false
      }
    ])
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
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === (currentToDo as Todo).id) {
          return currentToDo as Todo
        }
        return todo
      })
    })
    setCurrentToDo(null)
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
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneToDo={handleDoneToDo}
          startEditToDo={startEditToDo}
          editToDo={editToDo}
        />
      </div>
    </div>
  )
}
