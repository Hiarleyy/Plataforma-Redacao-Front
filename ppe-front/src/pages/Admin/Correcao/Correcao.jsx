import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Loading from "../../../components/Loading/Loading"
import fetchData from "../../../utils/fetchData"
import InfoCard from "../../../components/InfoCard/InfoCard"
import Pagination from "../../../components/Pagination/Pagination"
import { useState, useEffect } from "react"

const Correcao = () => {
  const [redacoes, setRedacoes] = useState([])
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([])

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageCorr, setCurrentPageCorr] = useState(1)
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRedacoes = redacoes.slice(indexOfFirstItem, indexOfLastItem)

  const indexOfLastItemCorr = currentPageCorr * itemsPerPage
  const indexOfFirstItemCorr = indexOfLastItemCorr - itemsPerPage
  const currentRedacoesCorr = redacoesCorrigidas.slice(indexOfFirstItemCorr, indexOfLastItemCorr)

  useEffect(() => {
    const getData = async () => {
      const { getRedacoes } = fetchData() 
      const response = await getRedacoes()
      const corrigidasResponse = await getRedacoes(false, true)

      setRedacoes(response)
      setRedacoesCorrigidas(corrigidasResponse)
    }

    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title="Correção" />
      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          {redacoes.length === 0 ? <div className={styles.loading}><Loading /></div> : 
            <>
              <p className={styles.title}>Redaçõs pendentes</p>

              <div className={styles.redacoes_container}>
                {currentRedacoes.map((redacao) => (
                  <InfoCard 
                    key={redacao.id}
                    title={redacao.titulo} 
                    subtitle={redacao.usuario.nome} 
                    link={redacao.id}
                  />
                ))}
              </div>

              <div className={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalItems={redacoes.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </>
          }
        </div>

        <div className={styles.bg_right}>
          {redacoes.length === 0 ? <div className={styles.loading}><Loading /></div> : 
            <>
              <p className={styles.title}>Redaçõs Corrigidas</p>

              <div className={styles.redacoes_container}>
                {currentRedacoesCorr.map((redacao) => (
                  <InfoCard 
                    key={redacao.id}
                    title={redacao.titulo} 
                    subtitle={redacao.usuario.nome} 
                    link={redacao.id}
                  />
                ))}
              </div>

              <div className={styles.pagination}>
                <Pagination
                  currentPage={currentPageCorr}
                  totalItems={redacoesCorrigidas.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPageCorr}
                />
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Correcao