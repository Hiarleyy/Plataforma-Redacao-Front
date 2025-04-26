import styles from "./styles.module.css"
import Button from "../Button/Button"

const InfoCard = ({ img, title, subtitle }) => {
  return (
    <div className={styles.container}>
      {img && <img src={img} alt="foto do aluno" />}

      <div className={styles.infos}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.btn_container}>
        <Button bg_color="#B2433F" padding_sz="20px" >EXCLUIR</Button>
      </div>
    </div>
  )
}

export default InfoCard