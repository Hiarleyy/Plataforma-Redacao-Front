import styles from "./styles.module.css"

const Message = ({ text, text_color = "#E0E0E0", type = "", margin = "0px" }) => {
  if (!text) return null

  const setType = (type) => {
    if (type === "success") return styles.success
    if (type === "error") return styles.error
    return styles.neutral
  }

  return (
    <div 
      className={`${ setType(type) }`}
      style={{ margin: margin }}
    >
      <p style={{ color: text_color }}>{text}</p>
    </div>
  )
}

export default Message