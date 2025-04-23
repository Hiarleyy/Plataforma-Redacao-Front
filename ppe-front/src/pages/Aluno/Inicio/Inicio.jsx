import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const Inicio = () => {
  return (
    <div className={styles.container}>
      <Title title="Início" />
      <div style={styles.main_content}></div>
    </div>
  )
}

export default Inicio