import { Outlet, Link } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div>
      <header>
        <nav style={{ display: "flex", gap: "10px" }}>
          <Link to="">Dashboard</Link>
          <Link to="nova-proposta">Criar Proposta</Link>
          <Link to="gerenciar-alunos">Gerenciar Alunos</Link>
          <Link to="ranking">Ranking</Link> 
          <Link to="cursos">Cursos</Link>
          <Link to="corrigir-redacoes">Corrigir Redações</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
