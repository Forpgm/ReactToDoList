import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
}
export default function TaskList(props: TaskListProps) {
  const { doneTaskList } = props
  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn thành' : 'Chưa hoàn thành'}</h2>
      <div className={styles.tasks}>
        <div className={styles.taskItem}>
          <input type='checkbox' className={styles.checkbox} />
          <span className={styles.taskName}>Task 1</span>

          <div className={styles.buttonAction}>
            <button className={styles.taskBtn}>✏️</button>
            <button className={styles.taskBtn}>❌</button>
          </div>
        </div>

        <div className={styles.taskItem}>
          <input type='checkbox' className={styles.checkbox} />
          <span className={`${styles.taskName} ${styles.taskNameDone}`}>Task 1</span>

          <div className={styles.buttonAction}>
            <button className={styles.taskBtn}>✏️</button>
            <button className={styles.taskBtn}>❌</button>
          </div>
        </div>
      </div>
    </div>
  )
}
