import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import { useState, useEffect } from "react"
import RankingTabela  from "../../../components/RankingTabela/RankingTabela"
import fetchData from "../../../utils/fetchData"

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
        <h2>Ranking dos melhores alunos do curso</h2>
       <RankingTabela ranking={ranking && ranking}/>
      </div>
    </div>
  )
}

export default RankingAlunos
