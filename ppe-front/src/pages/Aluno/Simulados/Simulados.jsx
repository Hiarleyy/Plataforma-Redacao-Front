import { useEffect, useState } from "react";
import styles from "../Simulados/styles.module.css";
import Title from "../../../components/Title/Title";
import fetchData from "../../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Pagination from "../../../components/Pagination/Pagination";
import SimuladoModal from "../../../components/SimuladoModal/SimuladoModal";
import Loading from "../../../components/Loading/Loading";

const Simulados = () => {
  const [TotalSimulados, setTotalSimulados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSimulado, setSelectedSimulado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const navigate = useNavigate();
  // Filtro dos simulados com base na busca
  const simuladosFiltrados = TotalSimulados.filter(
    (item) =>
      item.titulo.toLowerCase().includes(search.toLowerCase()) ||
      item.nomeTurma.toLowerCase().includes(search.toLowerCase())
  );

  // Atualiza a página para 1 sempre que houver nova busca
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSimulados = simuladosFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleResultados = (simuladoId) => {
    if (!simuladoId) {
      console.error("ID do simulado está indefinido!");
      return;
    }
    navigate(`/admin/Simulados/${simuladoId}`);
  };  const getDataSimulados = async () => {
    try {
      setLoading(true);
      const { getSimulados, getTurmaById } = fetchData();
      const simulados = await getSimulados();

      // Buscar informações das turmas para cada simulado
      const simuladosComTurma = await Promise.all(
        simulados.map(async (simulado) => {
          try {
            const turma = await getTurmaById(simulado.turmaId);
            return {
              id: simulado.id,
              titulo: simulado.titulo,
              data: simulado.data,
              turmaId: simulado.turmaId,
              nomeTurma: turma?.nome || "Sem nome",
              totalAlunos: turma?.usuarios?.length || 0,
            };
          } catch (error) {
            console.error(`Erro ao buscar turma ${simulado.turmaId}:`, error);
            return {
              id: simulado.id,
              titulo: simulado.titulo,
              data: simulado.data,
              turmaId: simulado.turmaId,
              nomeTurma: "Sem nome",
              totalAlunos: 0,
            };
          }
        })
      );

      // Ordenar por data (mais recentes primeiro)
      const simuladosOrdenados = simuladosComTurma.sort(
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

  return (
    <div className={styles.container}>
      <Title title="Simulados"></Title>
      <div className={styles.main_content}>
        {/* Campo de busca */}
        <div className={styles.search_container}>
          <Input
            label="Buscar simulados"
            placeholder="Digite o Simulado ou Turma"
            value={search}
            setValue={setSearch}
          />
        </div>        {/* Lista de simulados */}
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
                    <span className={styles.simulado_status}>Disponível</span>
                  </div>
                  <div className={styles.simulado_info}>
                    <p>📅 Data: {formatarData(simulado.data)}</p>
                    <p>📚 Turma: {simulado.nomeTurma}</p>
                    <p>👥 Participantes: {simulado.totalAlunos}</p>
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
              totalPages={Math.ceil(simuladosFiltrados.length / itemsPerPage)}
              onPageChange={setCurrentPage}
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
