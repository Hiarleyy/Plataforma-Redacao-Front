import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"

// Página comum
import Login from "./pages/Common/Login/Login"
import Configuracoes from "./pages/Common/Configuracoes/Configuracoes"

// Layouts
import AlunoLayout from "./pages/Aluno/Layout/Layout"
import AdminLayout from "./pages/Admin/Layout/Layout"

// Aluno Pages
import AlunoInicio from "./pages/Aluno/Inicio/Inicio"
import Perfil from "./pages/Aluno/Perfil/Perfil"
import NovaRedacao from "./pages/Aluno/NovaRedacao/NovaRedacao"
import RankingAlunos from "./pages/Common/Ranking/Ranking"
import CursosAluno from "./pages/Common/Cursos/Cursos"
import DesenpenhoAluno from "./pages/Aluno/DesenpenhoAluno/DesenpenhoAluno"

// Admin Pages
import DashboardAdmin from "./pages/Admin/Dashboard/Dashboard"
import NovaProposta from "./pages/Admin/NovaProposta/NovaProposta"
import GerenciarTurmas from "./pages/Admin/GerenciarTurmas/GerenciarTurmas"
import DetalhesTurma from "./pages/Admin/DetalhesTurma/DetalhesTurma"
import GerenciarAlunos from "./pages/Admin/GerenciarAlunos/GerenciarAlunos"
import DetalhesAluno from "./pages/Admin/DetalhesAluno/DetalhesAluno"
import GerenciarCursos from "./pages/Admin/GerenciarCursos/GerenciarCursos"
import VideoPage from "./pages/Admin/VideoPage/VideoPage"
import RankingAdmin from "./pages/Common/Ranking/Ranking"
import CursosAdmin from "./pages/Common/Cursos/Cursos"
import CorrigirRedacoes from "./pages/Admin/CorrigirRedacoes/CorrigirRedacoes"
import Pagamentos from "./pages/Admin/Pagamentos/pagamentos"
import DesenpenhoAdmin from "./pages/Admin/DesenpenhoAdmin/DesenpenhoAdmin"

const isAuthenticated = () => {
  return localStorage.getItem("user_access_data") !== null
}

const getUserRole = () => {
  const data = localStorage.getItem("user_access_data")
  if (!data) return null

  try {
    const { role } = JSON.parse(data)
    return role
  } catch (error) {
    console.error("Erro ao fazer parse de user_access_data:", error)
    return null
  }
}

const definePath = () => {
  const role = getUserRole()?.toUpperCase()

  if (role === "ADMIN") {
    return "/admin"
  } else if (role === "STANDARD") {
    return "/aluno"
  } else {
    return "/"
  }
}

const ProtectedHomeRoutes = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" replace />
}

const ProtectedLoginRoute = ({ element }) => {
  return isAuthenticated() ? <Navigate to={definePath()} replace /> : element
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedLoginRoute element={<Login />} />,
  },

  {
    path: "/aluno",
    element: <ProtectedHomeRoutes element={<AlunoLayout />} />,
    children: [
      { index: true, element: <AlunoInicio /> },
      { path: "perfil", element: <Perfil /> },
      { path: "nova-redacao", element: <NovaRedacao /> },
      { path: "ranking", element: <RankingAlunos /> },
      { path: "cursos", element: <CursosAluno /> },
      { path: "cursos/:video_id", element: <VideoPage /> },
      { path: "configuracoes", element: <Configuracoes /> },
      { path: "ControleDesempenho", element:<DesenpenhoAluno />},
    ],
  },

  {
    path: "/admin",
    element: <ProtectedHomeRoutes element={<AdminLayout />} />,
    children: [
      { index: true, element: <DashboardAdmin /> },
      { path: "nova-proposta", element: <NovaProposta /> },
      { path: "gerenciar-turmas", element: <GerenciarTurmas /> },
      { path: "gerenciar-turmas/:turma_id", element: <DetalhesTurma /> },
      { path: "gerenciar-alunos", element: <GerenciarAlunos /> },
      { path: "gerenciar-alunos/:aluno_id", element: <DetalhesAluno /> },
      { path: "gerenciar-cursos", element: <GerenciarCursos /> },
      { path: "ranking", element: <RankingAdmin /> },
      { path: "cursos", element: <CursosAdmin /> },
      { path: "cursos/:video_id", element: <VideoPage /> },
      { path: "corrigir-redacoes", element: <CorrigirRedacoes /> },
      { path: "pagamentos", element: <Pagamentos />},
      {path: "configuracoes", element:<Configuracoes />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App

