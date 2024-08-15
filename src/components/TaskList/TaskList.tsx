import styles from './taskList.module.scss'
import { Todo } from '../../@types/todos.type'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneToDo: (id: string, isDone: boolean) => void
  startEditToDo?: (id: string) => void
  editToDo: (name: string) => void
}
export default function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneToDo, startEditToDo } = props
  const handleChangeChecked = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneToDo(id, event.target.checked)
  }
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={styles.taskItem} key={todo.id}>
            <input
              type='checkbox'
              className={styles.checkbox}
              checked={todo.isDone}
              onChange={handleChangeChecked(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.isDone ? styles.taskNameDone : ''}`}>{todo.caption}</span>
            <div className={styles.buttonAction}>
              <button
                className={styles.taskBtn}
                onClick={() => {
                  if (startEditToDo) {
                    startEditToDo(todo.id)
                  }
                }}
              >
                ✏️
              </button>
              <button className={styles.taskBtn}>❌</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
