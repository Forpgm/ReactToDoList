import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import styles from './toDoList.module.scss'
export default function ToDoList() {
  return (
    <div className={styles.toDoList}>
      <div className={styles.toDoListContainer}>
        <TaskInput />
        <TaskList doneTaskList />
        <TaskList />
      </div>
    </div>
  )
}
