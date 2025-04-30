import styles from "./styles.module.css"

const VideoCard = ({ thumbnail, titulo }) => {
  return (
    <div className={styles.card}>
      <img className={styles.imagem} src={thumbnail} />
    
      <div className={styles.info}>
        <p>{titulo}</p>
      <div className={styles.icone}><i class="fa-solid fa-play"></i></div>
      </div>
    </div>
  )
}

export default VideoCard