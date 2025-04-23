import { Outlet, Link } from "react-router-dom"

const AlunoLayout = () => {
  return (
    <div>
      <header>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="">Início</Link>
          <Link to="perfil">Perfil</Link>
          <Link to="nova-redacao">Nova Redação</Link>
          <Link to="ranking">Ranking</Link>
          <Link to="cursos">Cursos</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AlunoLayout
