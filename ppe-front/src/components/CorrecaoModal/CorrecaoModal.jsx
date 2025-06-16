import styles from './styles.module.css'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import useUseful from '../../utils/useUseful'

const CorrecaoModal = ({ modalData, modalIsClicked, setModalIsClicked }) => {
  const { brasilFormatData } = useUseful()
  
  return (
    <div className={`${modalIsClicked ? styles.modal_details_bg : styles.modal_details_bg_closed}`}>
      <div className={styles.modal_details}>

        <div className={styles.header}>
          <p className={styles.title}>{modalData?.titulo}</p>
          <div className={styles.modal_button} onClick={() => setModalIsClicked(false)}>
            <i className="fa-solid fa-circle-xmark"></i>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.infos}>
          <p className={styles.author}>{`Autor: ${modalData?.usuario?.nome}`}</p>
          <p className={styles.data}>{`Data de envio: ${brasilFormatData(modalData?.data)}`}</p>
          <p className={styles.data}>{`Data da correção: ${brasilFormatData(modalData?.correcao?.data)}`}</p>
        </div>

        <div className={styles.notes_box}>
          <p className={styles.notes_title}>Notas:</p>
          <div className={styles.notes}>
            <p>{`Competência 01: ${modalData?.correcao?.competencia01}`}</p>
            <p>{`Competência 02: ${modalData?.correcao?.competencia02}`}</p>
            <p>{`Competência 03: ${modalData?.correcao?.competencia03}`}</p>
            <p>{`Competência 04: ${modalData?.correcao?.competencia04}`}</p>
            <p>{`Competência 05: ${modalData?.correcao?.competencia05}`}</p>
          </div>
        </div>

        <div className={styles.final_note}>{`Nota final: ${modalData?.correcao?.nota}`}</div>

        <div className={styles.feedback}>
          <p className={styles.feedback_text}>Feedback:</p>
          <div className={styles.feedback_content}>
            <p>{modalData?.correcao?.feedback}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <Link to={`http://localhost:3000/redacoes/download/${modalData?.id}`}>
            <Button 
              text_size="20px" 
              text_color="#E0E0E0" 
              padding_sz="10px" 
              bg_color="#DA9E00"
            ><i className="fa-solid fa-download"></i> BAIXAR REDAÇÃO</Button>
          </Link>
          <Link to={`http://localhost:3000/correcoes/download/${modalData?.correcao?.id}`}>
            <Button 
              text_size="20px" 
              text_color="#E0E0E0" 
              padding_sz="10px" 
              bg_color="#DA9E00"
            ><i className="fa-solid fa-download"></i> BAIXAR CORREÇÃO</Button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default CorrecaoModal