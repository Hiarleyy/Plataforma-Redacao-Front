import styles from "./styles.module.css"
import { Link } from 'react-router-dom'

const InfoCard = ({ 
  img, 
  title, 
  subtitle, 
  link, 
  button_registrar = false, 
  button = true, 
  onClick = undefined,
  infoCardOnClick = undefined
}) => {
  return (
    <div className={styles.container}>
      <Link className={styles.bg_left} to={link} onClick={infoCardOnClick}>
        {img && <img src={img} alt="foto do aluno" />}

        <div className={styles.infos}>
          <p className={styles.title}>{title}</p>
          {subtitle === undefined ? null : <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </Link>

      {button === true ? <button className={styles.btn} onClick={onClick} >EXCLUIR</button> : null}
      {button_registrar === true ? <button className={styles.btn} onClick={onClick} >REGISTRAR NOTA</button> : null}
    </div>
  )
}

export default InfoCard