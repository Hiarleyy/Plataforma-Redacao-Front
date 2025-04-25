import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Input from "../../../components/Input/Input"

const GerenciarAlunos = () => {
  return (
    <div className={styles.container}>
      <Title title="Gerenciar alunos" />

      <div className={styles.main_content}>
        <div className={styles.bg_left}>

          <Input type="text" placeholder="Pesquise por um aluno" color="#1A1A1A">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Input>

        </div>

        <div className={styles.bg_right}></div>
      </div>
    </div>
  )
}

export default GerenciarAlunos