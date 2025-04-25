import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import InputSelect from "../../../components/InputSelect/InputSelect"
import { useState } from "react"
import AlunoCard from "../../../components/AlunoCard/AlunoCard"

const GerenciarAlunos = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [tipoUsuario, setTipoUsuario] = useState("")
  const [turma, setTurma] = useState("")

  return (
    <div className={styles.container}>
      <Title title="Gerenciar alunos" />

      <div className={styles.main_content}>
        <div className={styles.bg_left}>

          <Input type="text" placeholder="Pesquise por um aluno" color="#1A1A1A">
            <i class="fa-solid fa-magnifying-glass"></i>
          </Input>

          <div className={styles.alunos_container}>
            <AlunoCard />
            <AlunoCard />
            <AlunoCard />
            <AlunoCard />
          </div>

        </div>

        <div className={styles.bg_right}>
          <p className={styles.form_title}>Cadastre um novo aluno</p>

          <form>
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
                { value: "standard", label: "STANDARD" },
                { value: "admin", label: "ADMIN" }
              ]}
            ></InputSelect>

            <InputSelect 
              color="#1A1A1A"
              text="Selecione a turma"
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              options={[
                { value: "turma-01", label: "Turma 01" },
                { value: "turma-02", label: "Turma 02" },
                { value: "turma-03", label: "Turma 03" },
                { value: "turma-04", label: "Turma 04" }
              ]}
            ></InputSelect>

            <Button text_size="20px" text_color="#E0E0E0" padding_sz="10px" bg_color="#16A34A">CADASTRAR</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default GerenciarAlunos