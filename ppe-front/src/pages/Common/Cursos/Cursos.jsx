import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const Cursos = () => {
  return (
    <div className={styles.container}>
      <Title title="Cursos" />
      <div style={styles.main_content}></div>
    </div>
  )
}

export default Cursos