import styles from "./styles.module.css"
import { Outlet } from "react-router-dom"
import Header from "../../../components/Header/Header"

import logo from "../../../images/logo02.png"

const links = [
  { name: "Início", icon: "fa-solid fa-house", path: "" },
  { name: "Perfil", icon: "fa-solid fa-user", path: "perfil" },
  { name: "Nova redação", icon: "fa-solid fa-pen", path: "nova-redacao" },
  { name: "Ranking", icon: "fa-solid fa-ranking-star", path: "ranking" },
  { name: "Cursos", icon: "fa-solid fa-tv", path: "cursos" },
  { name: "Configurações", icon: "fa-solid fa-gear", path: "configuracoes" },
]

const AlunoLayout = () => {
  return (
    <div className={styles.container}>

      <aside className={styles.header_mobile}>
        <img src={logo} />

        <div className={styles.menu_btn}>
          <i class="fa-solid fa-bars"></i>
        </div>
      </aside>


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

export default AlunoLayout
