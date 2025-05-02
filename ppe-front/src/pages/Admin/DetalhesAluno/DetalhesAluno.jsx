import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import Message from "../../../components/Message/Message"
import InputSelect from "../../../components/InputSelect/InputSelect"
import DetailsCard from "../../../components/DetailsCard/DetailsCard"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import fetchData from "../../../utils/fetchData"
import useUseful from "../../../utils/useUseful"
import GraficoNotas from "../../../components/GraficoLinha/GraficoLinha"
import RedacoesTabela from "../../../components/RedacoesTabela/RedacoesTabela"

const DetalhesAluno = () => {
  const { aluno_id } = useParams()
  const [alunoData, setAlunoData] = useState([])
  const [formMessage, setFormMessage] = useState(null)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [tipoUsuario, setTipoUsuario] = useState("")
  const [turma, setTurma] = useState("")
  const [turmas, setTurmas] = useState([])
  const { brasilFormatData } = useUseful()

  const dados = [
    { data: '2024-12-14', nota: 560 },
    { data: '2024-12-21', nota: 590 },
    { data: '2024-12-28', nota: 610 },
    { data: '2025-01-04', nota: 630 },
    { data: '2025-01-11', nota: 600 },
    { data: '2025-01-18', nota: 650 },
    { data: '2025-01-25', nota: 670 },
    { data: '2025-02-01', nota: 700 },
    { data: '2025-02-08', nota: 680 },
    { data: '2025-02-15', nota: 710 },
    { data: '2025-02-22', nota: 720 },
    { data: '2025-03-01', nota: 740 },
    { data: '2025-03-08', nota: 760 },
    { data: '2025-03-15', nota: 780 },
    { data: '2025-03-22', nota: 800 },
    { data: '2025-03-29', nota: 790 },
    { data: '2025-04-05', nota: 820 },
    { data: '2025-04-12', nota: 830 },
    { data: '2025-04-19', nota: 850 },
    { data: '2025-04-26', nota: 870 }
  ]

  const redacoes = [
    {
      titulo: "Redação sobre Tecnologia e Educação",
      data: "2025-04-10",
      correcao: {
        data: "2025-04-12",
        nota: 850
      },
      acoes: "<button>Ver mais</button>"
    },
    {
      titulo: "Redação sobre Mudanças Climáticas",
      data: "2025-04-15",
      correcao: {
        data: "2025-04-18",
        nota: 720
      },
      acoes: "<button>Ver mais</button>"
    },
    {
      titulo: "Redação sobre Ética e Sociedade",
      data: "2025-04-20",
      correcao: {
        data: "2025-04-22",
        nota: 910
      },
      acoes: "<button>Ver mais</button>"
    },
    {
      titulo: "Redação sobre Direitos Humanos",
      data: "2025-04-25",
      correcao: {
        data: "2025-04-28",
        nota: 680
      },
      acoes: "<button>Ver mais</button>"
    },
    {
      titulo: "Redação sobre Inteligência Artificial",
      data: "2025-04-30",
      correcao: {
        data: "2025-05-02",
        nota: 950
      },
      acoes: "<button>Ver mais</button>"
    }
  ]

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

  useEffect(() => {
    const getData = async () => {
      const { getTurmas, getAlunoById } = fetchData() 
      const turmasResponse = await getTurmas()
      const alunoResponse = await getAlunoById(aluno_id)

      const options = turmasResponse.map(item => ({
        value: item.id,       
        label: item.nome
      }))

      setTurmas(options)
      setAlunoData(alunoResponse)
    }

    getData()
  }, [])

  return (
    <div className={styles.container}>
      <Title title={`Gerenciar alunos - ${alunoData.nome && alunoData.nome}`} />

      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          <DetailsCard  
            title="Nome"
            content={alunoData.nome && alunoData.nome}
            bg_color="#1A1A1A"
            text_size="12px"
          />

          <div className={styles.infos}>
            <DetailsCard  
              title="Email"
              content={alunoData.email && alunoData.email}
              bg_color="#1F1F1F"
              text_size="12px"
            />
            <DetailsCard  
              title="Data de matrícula"
              content={alunoData.dataCriacao && brasilFormatData(alunoData.dataCriacao)}
              bg_color="#1F1F1F"
              text_size="12px"
            />
            <DetailsCard  
              title="Tipo de usuário"
              content={alunoData.tipoUsuario && alunoData.tipoUsuario}
              bg_color="#1F1F1F"
              text_size="12px"
            />
            <DetailsCard  
              title="Tipo de usuário"
              content={alunoData.tipoUsuario && alunoData.tipoUsuario}
              bg_color="#1F1F1F"
              text_size="12px"
            />
          </div>

          <RedacoesTabela redacoes={redacoes} />
          <GraficoNotas array={dados} height_size="300px" />

          <Button 
            text_size="15px" 
            text_color="#E0E0E0" 
            padding_sz="10px" 
            bg_color="#B2433F" 
          ><i class="fa-solid fa-trash"></i> EXCLUIR TURMA</Button>
        </div>

        <div className={styles.bg_right}>
          <p className={styles.form_title}>Atualize os dados do aluno</p>

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

            <Button text_size="20px" text_color="#E0E0E0" padding_sz="10px" bg_color="#DA9E00">ATUALIZAR</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default DetalhesAluno
