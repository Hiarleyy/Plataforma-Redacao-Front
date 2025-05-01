import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fetchData from "../../../utils/fetchData"

const VideoPage = () => {
  const { video_id } = useParams()
  const [video, setVideo] = useState({})

  const getEmbedUrl = (url) => {
    if (!url) return ""
    const videoId = new URL(url).searchParams.get("v")
    return `https://www.youtube.com/embed/${videoId}`
  }  

  useEffect(() => {
    const getData = async () => {
      const { getVideoById } = fetchData() 
      const response = await getVideoById(video_id)
      setVideo(response)
    }
  
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title={video.modulo?.nome || "Carregando..."} />
      <div className={styles.main_content}>
        <p>{video?.titulo}</p>
        
        <iframe 
          width="560" 
          height="315" 
          src={getEmbedUrl(video?.url)} 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideoPage