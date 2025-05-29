import styles from "./styles.module.css"
import Loading from "../../components/Loading/Loading"

const Button = ({
  children, 
  text_color = "#ffffff", 
  text_size = "16px", 
  bg_color = "#000", 
  padding_sz = "40px", 
  radius = "6px",
  width_size = "100%",
  height_size = undefined,
  onClick = undefined,
  isLoading,
  marginTop  = null
}) => {
  return (
    <button className={styles.btn} type= "submit"onClick={onClick} style={{ 
      backgroundColor: bg_color, 
      color: text_color,
      fontSize: text_size,
      padding: padding_sz,
      borderRadius: radius,
      width: width_size,
      height: height_size,
      marginTop: marginTop
    }}>{isLoading ? <Loading size={"20px"} /> : children}</button>
  )
}

export default Button