import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Loading from "../../../components/Loading/Loading"
import { useState, useEffect } from "react"

const Correcao = () => {
  const [redacoes, setRedacoes] = useState([])
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRedacoes = redacoes.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className={styles.container}>
      <Title title="Correção" />
      <div style={styles.main_content}>
        <div className={styles.bg_left}>
          {redacoes.length === 0 ? <div className={styles.loading}><Loading /></div> : 
            <>
              <div className={styles.redacoes_container}>
                {currentRedacoes.map((redacao) => (
                  <InfoCard 
                    key={redacao.id}
                    title={redacao.titulo} 
                    subtitle={aluno.nome} 
                    link={redacao.id}
                  />
                ))}
              </div>

              <div className={styles.pagination}>
                <Pagination
                  currentPage={currentPage}
                  totalItems={alunos.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
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