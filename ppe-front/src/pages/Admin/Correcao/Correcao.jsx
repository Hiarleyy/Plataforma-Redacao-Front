import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Loading from "../../../components/Loading/Loading"
import fetchData from "../../../utils/fetchData"
import InfoCard from "../../../components/InfoCard/InfoCard"
import Pagination from "../../../components/Pagination/Pagination"
import { useState, useEffect } from "react"

const Correcao = () => {
  const [redacoesPendentes, setRedacoesPendentes] = useState([])
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([])

  const itemsPerPage = 5
  const [currentPagePen, setCurrentPagePen] = useState(1)
  const [currentPageCorr, setCurrentPageCorr] = useState(1)
  
  const indexOfLastItem = currentPagePen * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRedacoesPen = redacoesPendentes.slice(indexOfFirstItem, indexOfLastItem)

  const indexOfLastItemCorr = currentPageCorr * itemsPerPage
  const indexOfFirstItemCorr = indexOfLastItemCorr - itemsPerPage
  const currentRedacoesCorr = redacoesCorrigidas.slice(indexOfFirstItemCorr, indexOfLastItemCorr)

  useEffect(() => {
    const getData = async () => {
      const { getRedacoes } = fetchData() 
      const pendentesResponse = await getRedacoes(false, false, true)
      const corrigidasResponse = await getRedacoes(false, true)

      setRedacoesPendentes(pendentesResponse)
      setRedacoesCorrigidas(corrigidasResponse)
    }

    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title="Correção" />
      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          {redacoesPendentes.length === 0 ? <div className={styles.loading}><Loading /></div> : 
            <>
              <p className={styles.title}>Redaçõs pendentes</p>

              <div className={styles.redacoes_container}>
                {currentRedacoesPen.map((redacao) => (
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
                  currentPage={currentPagePen}
                  totalItems={redacoesPendentes.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPagePen}
                />
              </div>
            </>
          }
        </div>

        <div className={styles.bg_right}>
          {redacoesCorrigidas.length === 0 ? <div className={styles.loading}><Loading /></div> : 
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