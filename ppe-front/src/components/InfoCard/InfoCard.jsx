import styles from "./styles.module.css"
import Button from "../Button/Button"
import { Link } from 'react-router-dom'

const InfoCard = ({ img, title, subtitle, link, button_registrar = false, button = true, onClick = undefined, onDeleteClick = undefined }) => {
  const handleCardClick = (e) => {
    // Se onDeleteClick existir, significa que estamos usando o novo método para separar o clique do card do botão excluir
    if (onDeleteClick) {
      e.preventDefault(); // Previne o comportamento padrão do Link
      if (onClick) onClick(e);
    }
  };

  return (
    <Link className={styles.container} to={link} onClick={handleCardClick}>
      {img && <img src={img} alt="foto do aluno" />}

      <div className={styles.infos}>
        <p className={styles.title}>{title}</p>
        {subtitle === undefined ? null : <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      <div className={styles.btn_container}>
        {button === true ? 
          <Button 
            bg_color="#B2433F" 
            padding_sz="20px" 
            onClick={onDeleteClick || onClick} 
          >
            EXCLUIR
          </Button> : null}
        {button_registrar === true ? <Button bg_color="#DA9E00" padding_sz="16px" onClick={onClick} >REGISTRAR NOTA</Button> : null}
      </div>
    </Link>
  )
}

export default InfoCard