import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import { useParams } from "react-router-dom"

const DetalhesAluno = () => {
  const { aluno_id } = useParams()

  return (
    <div className={styles.container}>
      <Title title="Detalhes do aluno" />
      <div className={styles.main_content}>
        <p>{aluno_id}</p>
      </div>
    </div>
  )
}

export default DetalhesAluno