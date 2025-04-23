import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const Perfil = () => {
  return (
    <div className={styles.container}>
      <Title title="Perfil" />
      <div style={styles.main_content}></div>
    </div>
  )
}

export default Perfil