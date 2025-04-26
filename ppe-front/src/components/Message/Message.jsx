import styles from "./styles.module.css"

const Message = ({ text, type = "", margin = "0px" }) => {
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
      <p>{text}</p>
    </div>
  )
}

export default Message