import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import InfoCard from "../../../components/InfoCard/InfoCard"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import axios from "axios"
import fetchData from "../../../utils/fetchData"
import { useState, useEffect } from "react"
import Pagination from "../../../components/Pagination/Pagination"
import Message from "../../../components/Message/Message"

const GerenciarTurmas = () => {
  const [formMessage, setFormMessage] = useState(null)
  const [turma, setTurma] = useState("")
  const [turmas, setTurmas] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTurmas = turmas.slice(indexOfFirstItem, indexOfLastItem)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/turmas", { "nome": turma })

      setFormMessage({ 
        type: "success", 
        text: `Turma ${response.data.data.nome} criada com sucesso.` 
      })
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.response.data.error
      });
    }
  }

  useEffect(() => {
    const getData = async () => {
      const { getTurmas } = fetchData() 
      const response = await getTurmas()
      setTurmas(response)
    }
  
    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title="Gerenciar turmas" />

      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          
          <p className={styles.title}>Suas turmas</p>

          <div className={styles.turmas_container}>
            {currentTurmas.map((turma, index) => (
              <InfoCard
                key={index}
                title={turma.nome}
                subtitle={turma.dataCriacao}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <Pagination
              currentPage={currentPage}
              totalItems={turmas.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>

        </div>

        <div className={styles.bg_right}>
          <p className={styles.form_title}>Cadastre uma nova turma</p>

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nome da turma"
              color="#1A1A1A"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
            >
              <i className="fa-solid fa-user"></i>
            </Input>

            <Message 
              text={formMessage ? formMessage.text : ""} 
              type={formMessage ? formMessage.type : ""} 
            />

            <Button text_size="20px" text_color="#E0E0E0" padding_sz="10px" bg_color="#DA9E00">CADASTRAR</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GerenciarTurmas