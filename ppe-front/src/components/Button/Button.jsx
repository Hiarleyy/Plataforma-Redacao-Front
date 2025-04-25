import styles from "./styles.module.css"

const Button = ({ children, text_color = "#ffffff", text_size = "16px", bg_color = "#000", padding_sz = "40px", }) => {
  return (
    <button className={styles.btn} style={{ 
      backgroundColor: bg_color, 
      color: text_color,
      fontSize: text_size,
      padding: padding_sz
    }}>{children}</button>
  )
}

export default Button