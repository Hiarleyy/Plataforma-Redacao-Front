import styles from "./styles.module.css"

const Title = ({ title }) => {
  return <div className={styles.title}><p>{title}</p></div>
}

export default Title