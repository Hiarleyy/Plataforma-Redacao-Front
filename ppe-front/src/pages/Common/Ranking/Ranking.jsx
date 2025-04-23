import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const Ranking = () => {
  return (
    <div className={styles.container}>
      <Title title="Ranking" />
      <div style={styles.main_content}></div>
    </div>
  )
}

export default Ranking