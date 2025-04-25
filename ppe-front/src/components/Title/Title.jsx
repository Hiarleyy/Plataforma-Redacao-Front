import styles from "./styles.module.css"

const Title = ({ title }) => {
  return (
    <div className={styles.title}>
      <div className={styles.title_container}><p>{title}</p></div>
    </div>
  ) 
}

export default Title