import styles from './taskList.module.scss'
import { Todo } from '../../@types/todos.type'
import PropTypes from 'prop-types'
import { TodoType } from '../../PropTypes/todo.proptypes'
import connect, { InjectedType } from '../../HOC/connect'
interface TaskListProps extends InjectedType {
  doneTaskList?: boolean
  todos: Todo[]
  handleDoneToDo: (id: string, isDone: boolean) => void
  startEditToDo?: (id: string) => void

  deleteToDo: (id: string) => void
}
function TaskList(props: TaskListProps) {
  const { doneTaskList, todos, handleDoneToDo, startEditToDo, deleteToDo, user } = props
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
              <button className={styles.taskBtn} onClick={() => deleteToDo(todo.id)}>
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
TaskList.propTypes = {
  doneTaskList: PropTypes.bool,
  todos: PropTypes.arrayOf(TodoType).isRequired,
  handleDoneToDo: PropTypes.func.isRequired,
  startEditToDo: PropTypes.func,
  deleteToDo: PropTypes.func.isRequired
}
export default connect({ user: { name: 'gm' } })(TaskList)
