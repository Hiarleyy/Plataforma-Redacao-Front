import styles from "./styles.module.css"
import { Outlet } from "react-router-dom"
import Header from "../../../components/Header/Header"

const links = [
  { name: "Dashboard", icon: "fa-solid fa-house", path: "" },
  { name: "Nova proposta", icon: "fa-solid fa-pen", path: "nova-proposta" },
  { name: "Gerenciar alunos", icon: "fa-solid fa-envelope", path: "gerenciar-alunos" },
  { name: "Ranking", icon: "fa-solid fa-ranking-star", path: "ranking" },
  { name: "Cursos", icon: "fa-solid fa-tv", path: "cursos" },
  { name: "Correção", icon: "fa-solid fa-pen-to-square", path: "corrigir-redacoes" }
]

const AdminLayout = () => {
  return (
    <div className={styles.container}>
      <Header options={links} />
      <main className={styles.main_content}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout

