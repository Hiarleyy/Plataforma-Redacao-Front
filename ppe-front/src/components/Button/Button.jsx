import styles from "./styles.module.css"

const Button = ({ text, text_color = "#ffffff", text_size = "16px", bg_color, padding_sz = "40px", }) => {
  return (
    <button className={styles.btn} style={{ 
      backgroundColor: bg_color, 
      color: text_color,
      fontSize: text_size,
      padding: padding_sz
    }}>{text}</button>
  )
}

export default Button