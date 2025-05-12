import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const Configuracoes = () => {
  return (
    <div className={styles.container}>
      <Title title="Configurações" />
      <div className={styles.main_content}></div>
    </div>
  )
}

export default Configuracoes