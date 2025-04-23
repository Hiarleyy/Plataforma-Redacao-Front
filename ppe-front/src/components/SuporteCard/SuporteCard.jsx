import styles from "./styles.module.css"
import Button from "../Button/Button"

const SuporteCard = () => {
  return (
    <div className={styles.suporte}>
      <h1>Precisa de ajuda?</h1>
      <p>Entre em contato com nosso suporte</p>
      <Button 
        text="Suporte" 
        bg_color="#DA9E00" 
        text_size="15px"
        padding_sz="10px"
      />
    </div>
  )
}

export default SuporteCard