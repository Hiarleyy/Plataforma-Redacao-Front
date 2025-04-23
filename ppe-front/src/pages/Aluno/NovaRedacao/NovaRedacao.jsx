import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const NovaRedacao = () => {
  return (
    <div className={styles.container}>
      <Title title="Nova redação" />
      <div style={styles.main_content}></div>
    </div>
  )
}

export default NovaRedacao