import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const NovaProposta = () => {
  return (
    <div className={styles.container}>
      <Title title="Nova proposta" />
      <div className={styles.main_content}></div>
    </div>
  )
}

export default NovaProposta