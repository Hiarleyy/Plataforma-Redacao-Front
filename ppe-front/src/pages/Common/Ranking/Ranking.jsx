import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import { useState, useEffect } from "react"
import RankingTabela  from "../../../components/RankingTabela/RankingTabela"
import fetchData from "../../../utils/fetchData"
import defaultProfilePicture from '../../../images/Defalult_profile_picture.jpg';


  const RankingAlunos = () => {
  const [ranking, setRanking] = useState([])
 
  useEffect(() => {
    const getData = async () => {
      const { getRanking } = fetchData() 
      const response = await getRanking()
      setRanking(response)
      console.log(response)
    }
  
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title="Ranking de Alunos" />

      <div className={styles.main_content}>
        <div className={styles.podium}>
          <div> 
          </div>
          <div className={styles.position_container}>
          <i className="fa-solid fa-crown" style={{ color: '#C0C0C0', fontSize: "30px" }}></i>
          <h2>2º Lugar</h2>
          <img className= {styles.img_container} src={ranking[1]?`http://localhost:3000/usuarios/${ranking[1].id}/profile-image`:defaultProfilePicture} alt="" />
          {ranking.length > 0 && <h3>{ranking[1].nome}</h3>}
          {ranking.length > 0 && <p>{ranking[1].media}</p>}
          </div>
          <div className={styles.position_container_first}>
          <i className="fa-solid fa-crown" style={{ color: '#FFD700', fontSize: "30px" }}></i>
          <h2>1º Lugar</h2>
          <img className= {styles.img_container} src={ranking[0]?`http://localhost:3000/usuarios/${ranking[0].id}/profile-image`:defaultProfilePicture} alt="" />
          {ranking.length > 0 && <h3>{ranking[0].nome}</h3>}
          {ranking.length > 0 && <p>{ranking[0].media}</p>}
          </div>
          <div className={styles.position_container}>
          <i className="fa-solid fa-crown" style={{ color: '#CD7F32', fontSize: "30px"}}></i>
          <h2>3º Lugar</h2>
          <img className= {styles.img_container} src={ranking[2]?`http://localhost:3000/usuarios/${ranking[2].id}/profile-image`: defaultProfilePicture} alt="" />
          {ranking.length > 0 && <h3>{ranking[2].nome} </h3>}
          {ranking.length > 0 && <p>{ranking[2].media} </p>}
          
          </div>


        </div>

       <RankingTabela ranking={ranking && ranking}/>
      </div>
    </div>
  )
}

export default RankingAlunos
