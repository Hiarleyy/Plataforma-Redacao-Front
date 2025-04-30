import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import Message from "../../../components/Message/Message"
import Pagination from "../../../components/Pagination/Pagination"
import InputSelect from "../../../components/InputSelect/InputSelect"
import { useState, useEffect } from "react"
import axios from "axios"
import fetchData from "../../../utils/fetchData"
import InfoCard from "../../../components/InfoCard/InfoCard"

const GerenciarAlunos = () => {
  const [formMessage, setFormMessage] = useState(null)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [tipoUsuario, setTipoUsuario] = useState("")
  const [turma, setTurma] = useState("")
  const [turmas, setTurmas] = useState([])
  const [alunos, setAlunos] = useState([])
  const [search, setSearch] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentAlunos = alunos.slice(indexOfFirstItem, indexOfLastItem)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/usuarios", { 
        nome,
        email,
        tipoUsuario,
        turmaId: turma 
      })

      setFormMessage({ 
        type: "success", 
        text: `Usuário(a) ${response.data.data.nome} criado(a) com sucesso.` 
      })
    } catch (error) {
      setFormMessage({
        type: "error",
        text: error.response.data.error
      });
    }
  }

  const getAlunos = async (busca) => {
    const { getAlunos } = fetchData() 
    const response = await getAlunos(busca)
    setAlunos(response)
  }

  useEffect(() => { 
    setCurrentPage(1)
    
    if (search === "") {
      getAlunos()
    } else {
      getAlunos(search) 
    }
  }, [search])

  useEffect(() => {
    const getData = async () => {
      const { getTurmas, getAlunos } = fetchData() 
      const turmasResponse = await getTurmas()
      const alunosResponse = await getAlunos()

      const options = turmasResponse.map(item => ({
        value: item.id,       
        label: item.nome
      }))

      setTurmas(options)
      setAlunos(alunosResponse)
    }

    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title="Gerenciar alunos" />

      <div className={styles.main_content}>
        <div className={styles.bg_left}>

          <Input 
            type="text" 
            placeholder="Pesquise por um aluno" 
            color="#1A1A1A" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </Input>

          <div className={styles.alunos_container}>
            {currentAlunos.map((aluno) => (
              <InfoCard 
                key={aluno.id}
                img="https://cdn-icons-png.flaticon.com/512/219/219969.png" 
                title={aluno.nome} 
                subtitle={aluno.email} 
                link={aluno.id}
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

        </div>

        <div className={styles.bg_right}>
          <p className={styles.form_title}>Cadastre um novo aluno</p>

          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Nome"
              color="#1A1A1A"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            >
              <i className="fa-solid fa-user"></i>
            </Input>

            <Input
              type="email"
              placeholder="Email"
              color="#1A1A1A"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              <i className="fa-solid fa-envelope"></i>
            </Input>

            <InputSelect 
              color="#1A1A1A"
              text="Selecione o tipo de usuário"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              options={[
                { value: "STANDARD", label: "STANDARD" },
                { value: "ADMIN", label: "ADMIN" }
              ]}
            />

            <InputSelect 
              color="#1A1A1A"
              text="Selecione a turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              options={turmas}
            />

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

export default GerenciarAlunos
