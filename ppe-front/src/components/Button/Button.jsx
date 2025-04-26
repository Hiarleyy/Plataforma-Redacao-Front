import styles from "./styles.module.css"

const Button = ({ 
  children, 
  text_color = "#ffffff", 
  text_size = "16px", 
  bg_color = "#000", 
  padding_sz = "40px", 
  radius = "6px",
  width_size = "100%",
  height_size = undefined,
  onClick = undefined
}) => {
  return (
    <button className={styles.btn} onClick={onClick} style={{ 
      backgroundColor: bg_color, 
      color: text_color,
      fontSize: text_size,
      padding: padding_sz,
      borderRadius: radius,
      width: width_size,
      height: height_size
    }}>{children}</button>
  )
}

export default Button