import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Loading from "../../../components/Loading/Loading"
import fetchData from "../../../utils/fetchData"
import InfoCard from "../../../components/InfoCard/InfoCard"
import Pagination from "../../../components/Pagination/Pagination"
import Message from "../../../components/Message/Message"
import { useState, useEffect } from "react"
import CorrecaoModal from "../../../components/CorrecaoModal/CorrecaoModal"

const Correcao = () => {
  const [redacoesPendentes, setRedacoesPendentes] = useState([])
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([])
  const [isLoading, setIsLoading] = useState(true) 
  const [modalIsClicked, setModalIsClicked] = useState(false)
  const [modalData, setModalData] = useState({})

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
      try {
        const { getRedacoes } = fetchData() 
        const pendentesResponse = await getRedacoes(false, false, true)
        const corrigidasResponse = await getRedacoes(false, true)

        setRedacoesPendentes(pendentesResponse)
        setRedacoesCorrigidas(corrigidasResponse)
      } catch (error) {
        console.error("Erro ao buscar redações:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  return (
    <div className={styles.container}>
      <CorrecaoModal 
        modalData={modalData}
        modalIsClicked={modalIsClicked}
        setModalIsClicked={setModalIsClicked}
      />

      <Title title="Correção" />
      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          <p className={styles.title}>Redações Pendentes</p>
          {isLoading ? (
            <div className={styles.loading}><Loading /></div>
          ) : redacoesPendentes.length === 0 ? (
            <Message 
              text="Nenhuma redação pendente encontrada." 
              text_color="#E0E0E0"
              marginTop="30px"
            />
          ) : (
            <>
              <div className={styles.redacoes_container}>
                {currentRedacoesPen.map((redacao) => (
                  <InfoCard 
                    key={redacao.id}
                    title={redacao.titulo} 
                    subtitle={redacao?.usuario?.nome} 
                    button={false}
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
          )}
        </div>

        <div className={styles.bg_right}>
          <p className={styles.title}>Redações Corrigidas</p>
          {isLoading ? (
            <div className={styles.loading}><Loading /></div>
          ) : redacoesCorrigidas.length === 0 ? (
            <Message 
              text="Nenhuma redação corrigida encontrada." 
              text_color="#E0E0E0"
              marginTop="30px"
            />
          ) : (
            <>
              <div className={styles.redacoes_container}>
                {currentRedacoesCorr.map((redacao) => (
                  <InfoCard 
                    key={redacao.id}
                    title={redacao.titulo} 
                    subtitle={redacao?.usuario?.nome} 
                    infoCardOnClick={() => {
                      setModalData(redacao)
                      setModalIsClicked(true)
                    }}
                    button={false}
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
          )}
        </div>
      </div>
    </div>
  )
}

export default Correcao

