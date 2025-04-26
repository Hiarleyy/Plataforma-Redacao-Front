import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Página comum
import Login from "./pages/Common/Login/Login"

// Layouts
import AlunoLayout from "./pages/Aluno/Layout/Layout"
import AdminLayout from "./pages/Admin/Layout/Layout"

// Aluno Pages
import AlunoInicio from "./pages/Aluno/Inicio/Inicio"
import Perfil from "./pages/Aluno/Perfil/Perfil"
import NovaRedacao from "./pages/Aluno/NovaRedacao/NovaRedacao"
import RankingAlunos from "./pages/Common/Ranking/Ranking"
import CursosAluno from "./pages/Common/Cursos/Cursos"

// Admin Pages
import DashboardAdmin from "./pages/Admin/Dashboard/Dashboard"
import NovaProposta from "./pages/Admin/NovaProposta/NovaProposta"
import GerenciarTurmas from "./pages/Admin/GerenciarTurmas/GerenciarTurmas"
import GerenciarAlunos from "./pages/Admin/GerenciarAlunos/GerenciarAlunos"
import RankingAdmin from "./pages/Common/Ranking/Ranking"
import CursosAdmin from "./pages/Common/Cursos/Cursos"
import CorrigirRedacoes from "./pages/Admin/CorrigirRedacoes/CorrigirRedacoes"
import Pagamentos from "./pages/Admin/Pagamentos/pagamentos"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/aluno",
    element: <AlunoLayout />,
    children: [
      { index: true, element: <AlunoInicio /> },
      { path: "perfil", element: <Perfil /> },
      { path: "nova-redacao", element: <NovaRedacao /> },
      { path: "ranking", element: <RankingAlunos /> },
      { path: "cursos", element: <CursosAluno /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardAdmin /> },
      { path: "nova-proposta", element: <NovaProposta /> },
      { path: "gerenciar-turmas", element: <GerenciarTurmas /> },
      { path: "gerenciar-alunos", element: <GerenciarAlunos /> },
      { path: "ranking", element: <RankingAdmin /> },
      { path: "cursos", element: <CursosAdmin /> },
      { path: "corrigir-redacoes", element: <CorrigirRedacoes /> },
      { path:"Pagamentos", element: <Pagamentos />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App

