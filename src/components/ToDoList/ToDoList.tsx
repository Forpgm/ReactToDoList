import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
import { useState } from 'react'
import { Todo } from '../../@types/todos.type'

export default function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const doneTodos = todos.filter((todo) => todo.isDone)
  const unDoneTodos = todos.filter((todo) => !todo.isDone)
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
  return (
    <div className={styles.toDoList}>
      <div className={styles.toDoListContainer}>
        <TaskInput addTodo={addTodo} />
        <TaskList todos={unDoneTodos} handleDoneToDo={handleDoneToDo} />
        <TaskList doneTaskList todos={doneTodos} handleDoneToDo={handleDoneToDo} />
      </div>
    </div>
  )
}
