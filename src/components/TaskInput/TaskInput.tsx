import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todos.type'
interface TaskInputProps {
  addTodo: (name: string) => void
  currentToDo: Todo | null
  editToDo: (name: string) => void
  saveEditToDo: () => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo, currentToDo, editToDo, saveEditToDo } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentToDo) {
      saveEditToDo()
      if (name) {
        setName('')
      }
    } else {
      addTodo(name)
      setName('')
    }
  }
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentToDo) {
      editToDo(event.target.value)
    } else {
      setName(event.target.value)
    }
  }
  return (
    <div className='mb-2'>
      <div className={styles.title}>To Do List Typescript</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          className={styles.input}
          placeholder='caption goes here'
          value={currentToDo ? currentToDo.caption : name}
          onChange={handleChangeInput}
        />
        <button type='submit' className={styles.button}>
          {currentToDo ? '✔️' : '➕'}
        </button>
      </form>
    </div>
  )
}
