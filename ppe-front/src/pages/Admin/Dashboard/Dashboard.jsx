import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Title title="Dashboard" />
      <div style={styles.main_content}></div>
    </div>
  )
}

export default Dashboard