import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"

const VideoPage = () => {
  return (
    <div className={styles.container}>
      <Title title="Página de vídeo" />
      <div className={styles.main_content}></div>
    </div>
  )
}

export default VideoPage