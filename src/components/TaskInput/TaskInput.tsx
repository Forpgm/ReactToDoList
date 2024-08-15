import styles from './taskInput.module.scss'
export default function TaskInput() {
  return (
    <div className='mb-2'>
      <div className={styles.title}>To Do List Typescript</div>
      <form className={styles.form}>
        <input type='text' className={styles.input} placeholder='caption goes here' />
        <button type='submit' className={styles.button}>
          ➕
        </button>
      </form>
    </div>
  )
}
