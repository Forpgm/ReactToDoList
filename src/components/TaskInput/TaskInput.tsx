import { useState } from 'react'
import styles from './taskInput.module.scss'
interface TaskInputProps {
  addTodo: (name: string) => void
}
export default function TaskInput(props: TaskInputProps) {
  const { addTodo } = props
  const [name, setName] = useState<string>('')
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodo(name)
    setName('')
  }
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  return (
    <div className='mb-2'>
      <div className={styles.title}>To Do List Typescript</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          className={styles.input}
          placeholder='caption goes here'
          value={name}
          onChange={handleChangeInput}
        />
        <button type='submit' className={styles.button}>
          ➕
        </button>
      </form>
    </div>
  )
}
