import styles from "./styles.module.css"
import Button from "../Button/Button"
import { Link } from 'react-router-dom'

const InfoCard = ({ img, title, subtitle, link, button = true, onClick = undefined }) => {
  return (
    <Link className={styles.container} to={link}>
      {img && <img src={img} alt="foto do aluno" />}

      <div className={styles.infos}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      <div className={styles.btn_container}>
        {button === true ? <Button bg_color="#B2433F" padding_sz="20px" onClick={onClick} >EXCLUIR</Button> : null}
      </div>
    </Link>
  )
}

export default InfoCard