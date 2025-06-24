import { useEffect, useState } from "react";
import styles from "../Simulados/styles.module.css";
import Title from "../../../components/Title/Title";
import fetchData from "../../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Pagination from "../../../components/Pagination/Pagination";
import SimuladoModal from "../../../components/SimuladoModal/SimuladoModal";
import Loading from "../../../components/Loading/Loading";
const baseURL = import.meta.env.VITE_API_BASE_URL

const Simulados = () => {
  const [TotalSimulados, setTotalSimulados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSimulado, setSelectedSimulado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notasSimulados, setNotasSimulados] = useState([]);
  
  // Hook para detectar tamanho da tela e ajustar items por página
  const [itemsPerPage, setItemsPerPage] = useState(4);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsPerPage(width <= 768 ? 4 : 4); // 2 items por página em mobile, 4 em desktop
    }; 

    handleResize(); // Executar na inicialização
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = useNavigate();
  const getAlunoId = () => {
    const aluno = localStorage.getItem('user_access_data')
    const { id } = JSON.parse(aluno)
    return id
  }
  // Filtro dos simulados com base na busca
  const simuladosFiltrados = TotalSimulados.filter((item) => {
    if (!search.trim()) return true; // Se não há busca, mostra todos
    
    const searchTerm = search.toLowerCase().trim();
    const titulo = (item.titulo || '').toLowerCase();
    
    return titulo.includes(searchTerm);
  });
  // Atualiza a página para 1 sempre que houver nova busca ou mudança no items per page
  useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSimulados = simuladosFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleResultados = (simuladoId) => {
    if (!simuladoId) {
      return;
    }
    navigate(`/admin/Simulados/${simuladoId}`);
  };  const getDataSimulados = async () => {
    try {
      setLoading(true);
      const { getSimulados, getNotasByUsuarioId, getNotasbySimuladoId } = fetchData();
      const alunoId = getAlunoId();
      
      const simulados = await getSimulados();

      // Buscar notas do aluno
      const notasAluno = await getNotasByUsuarioId(alunoId);
      setNotasSimulados(notasAluno);
      
      // Processar simulados
      const simuladosProcessados = await Promise.all(
        simulados.map(async (simulado) => {
          try {
            // Verificar se o aluno tem nota para este simulado
            const notaSimulado = notasAluno.find(nota => nota.simuladoId === simulado.id);
            
            // Buscar todas as notas do simulado para contar quantos alunos fizeram
            let totalNotasCadastradas = 0;
            try {
              const notasDoSimulado = await getNotasbySimuladoId(simulado.id);
              totalNotasCadastradas = notasDoSimulado.length;
            } catch (error) {
              totalNotasCadastradas = 0;
            }
            
            return {
              id: simulado.id,
              titulo: simulado.titulo,
              data: simulado.data,
              totalAlunos: totalNotasCadastradas,
              notaAluno: notaSimulado?.notaGeral || null,
              realizou: !!notaSimulado,
            };
          } catch (error) {
            console.error(`Erro ao processar simulado ${simulado.id}:`, error);
            return {
              id: simulado.id,
              titulo: simulado.titulo,
              data: simulado.data,
              totalAlunos: 0,
              notaAluno: null,
              realizou: false,
            };
          }
        })
      );

      const simuladosOrdenados = simuladosProcessados.sort(
        (a, b) => new Date(b.data) - new Date(a.data)
      );

      setTotalSimulados(simuladosOrdenados);
    } catch (error) {
      console.error("Erro ao carregar simulados:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataSimulados();
  }, []);

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };
  const handleCardClick = (simulado) => {
    setSelectedSimulado(simulado);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSimulado(null);
  };

  const calcularEstatisticas = () => {
    const simuladosRealizados = TotalSimulados.filter(s => s.realizou);
    const totalSimulados = TotalSimulados.length;
    const totalRealizados = simuladosRealizados.length;
    
    if (totalRealizados === 0) {
      return {
        totalSimulados,
        totalRealizados,
        mediaGeral: 0,
        maiorNota: 0,
        menorNota: 0,
        percentualRealizacao: 0
      };
    }

    const notas = simuladosRealizados.map(s => s.notaAluno);
    const soma = notas.reduce((acc, nota) => acc + nota, 0);
    const media = soma / totalRealizados;
    const maior = Math.max(...notas);
    const menor = Math.min(...notas);
    const percentual = (totalRealizados / totalSimulados) * 100;

    return {
      totalSimulados,
      totalRealizados,
      mediaGeral: media.toFixed(1),
      maiorNota: maior,
      menorNota: menor,
      percentualRealizacao: percentual.toFixed(1)
    };
  };
  return (
    <div className={styles.container}>
      <Title title="Simulados"></Title>
      <div className={styles.main_content}>        {/* Card de estatísticas */}
        {!loading && TotalSimulados.length > 0 && (
          <div className={styles.estatisticas_card}>
            <h3>📊 Suas Estatísticas</h3>
            {calcularEstatisticas().totalRealizados > 0 ? (
              <div className={styles.estatisticas_grid}>
                <div className={styles.stat_item}>
                  <span className={styles.stat_value}>{calcularEstatisticas().totalRealizados}</span>
                  <span className={styles.stat_label}>Realizados</span>
                </div>
                <div className={styles.stat_item}>
                  <span className={styles.stat_value}>{calcularEstatisticas().mediaGeral}</span>
                  <span className={styles.stat_label}>Média Geral</span>
                </div>
                <div className={styles.stat_item}>
                  <span className={styles.stat_value}>{calcularEstatisticas().maiorNota}</span>
                  <span className={styles.stat_label}>Maior Nota</span>
                </div>
                <div className={styles.stat_item}>
                  <span className={styles.stat_value}>{calcularEstatisticas().percentualRealizacao}%</span>
                  <span className={styles.stat_label}>Taxa de Realização</span>
                </div>
              </div>
            ) : (
              <div className={styles.no_stats}>
                <p>🎯 Você ainda não realizou nenhum simulado. Comece agora e acompanhe seu progresso!</p>
              </div>
            )}
          </div>
        )}        {/* Campo de busca */}
        <div className={styles.search_container}>
          <label className={styles.search_label}>Buscar simulados:</label>
          
          <Input
            type="text"
            icon={<i className="fas fa-search"></i>}
            placeholder="Digite o nome do simulado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>{/* Lista de simulados */}
        <div className={styles.simulados_list}>
          {loading ? (
            <div className={styles.loading_container}>
              <Loading />
            </div>
          ) : currentSimulados.length > 0 ? (
            currentSimulados.map((simulado) => (
              <div 
                key={simulado.id} 
                className={styles.simulado_item}
                onClick={() => handleCardClick(simulado)}
              >
                <div className={styles.simulado_content}>
                  <div className={styles.simulado_header}>
                    <h3 className={styles.simulado_titulo}>{simulado.titulo}</h3>
                    <span className={`${styles.simulado_status} ${simulado.realizou ? styles.realizado : styles.disponivel}`}>
                      {simulado.realizou ? "Realizado" : "Disponível"}
                    </span>
                  </div>
                  <div className={styles.simulado_info}>
                    <p>📅 Data: {formatarData(simulado.data)}</p>
                    <p>👥 Participantes: {simulado.totalAlunos}</p>
                    {simulado.realizou && (
                      <p className={styles.nota_simulado}>
                        🎯 Sua nota: <strong>{simulado.notaAluno}</strong>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.no_simulados}>
              <p>Nenhum simulado encontrado.</p>
            </div>
          )}
        </div>        {/* Paginação */}
        {simuladosFiltrados.length > itemsPerPage && (
          <div className={styles.pagination_container}>
            <Pagination
              currentPage={currentPage}
              totalItems={simuladosFiltrados.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
  
        {/* Modal de detalhes do simulado */}
        <SimuladoModal
          simulado={selectedSimulado}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          brasilFormatData={formatarData}
        />
      </div>
    </div>
  );
};

export default Simulados;
