import styles from "./styles.module.css"
import Button from "../Button/Button"

const AlunoCard = () => {
  return (
    <div className={styles.container}>
      <img src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="foto do aluno" />
      <div className={styles.infos}>
        <p className={styles.nome}>Fulana da Silva</p>
        <p className={styles.email}>fulanasilva@gmail.com</p>
      </div>

      <div className={styles.btn_container}>
        <Button bg_color="#D72638" padding_sz="20px" >EXCLUIR</Button>
      </div>
    </div>
  )
}

export default AlunoCard