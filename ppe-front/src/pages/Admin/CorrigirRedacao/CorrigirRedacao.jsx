import styles from "./styles.module.css"
import { useParams } from "react-router-dom"
import Title from "../../../components/Title/Title"
import fetchData from "../../../utils/fetchData"
import { useState, useEffect } from "react"

const CorrigirRedacao = () => {
  const { redacao_id } = useParams()
  const [redacao, setRedacao] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { getRedacaoById } = fetchData()
      const response = await getRedacaoById(redacao_id)
      setRedacao(response)
    }

    getData()
  }, [])
  
  return (
    <div className={styles.container}>
      <Title title="Correção" />
      <div className={styles.main_content}>
        <p>{redacao.titulo && redacao.titulo}</p>
        <p>{redacao.data && redacao.data}</p>
        <p>{redacao.status && redacao.status}</p>
        <p>{redacao.usuario?.nome && redacao.usuario?.nome}</p>
      </div>
    </div>
  )
}

export default CorrigirRedacao