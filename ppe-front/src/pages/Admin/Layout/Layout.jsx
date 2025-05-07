import styles from "./styles.module.css"
import { Outlet } from "react-router-dom"
import Header from "../../../components/Header/Header"

const links = [
  { name: "Dashboard", icon: "fa-solid fa-house", path: "" },
  { name: "Nova proposta", icon: "fa-solid fa-pen", path: "nova-proposta" },
  { name: "Correção", icon: "fa-solid fa-pen-to-square", path: "corrigir-redacoes" },
  { name: "Pagamentos", icon: "fa-solid fa-wallet", path: "pagamentos" },
  { name: "Gerenciar turmas", icon: "fa-solid fa-users", path: "gerenciar-turmas" },
  { name: "Gerenciar alunos", icon: "fa-solid fa-envelope", path: "gerenciar-alunos" },
  { name: "Gerenciar cursos", icon: "fa-solid fa-tv", path: "gerenciar-cursos" },
  { name: "Ranking", icon: "fa-solid fa-ranking-star", path: "ranking" },
  { name: "Cursos", icon: "fa-solid fa-tv", path: "cursos" },
  { name: "Controle de Desempenho", icon: "fa-solid fa-bullseye", path: "ControleDesempenhoAdmin" }
]

const AdminLayout = () => {
  return (
    <div className={styles.container}>

      <aside className={styles.sidebar}>
        <Header options={links} />
      </aside>

      <div className={styles.main_container}>
        <main className={styles.main_content}>
          <Outlet />
        </main>
      </div>

    </div>
  )
}

export default AdminLayout

