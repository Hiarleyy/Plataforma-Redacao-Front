import { useEffect, useState } from "react";
import styles from "../Simulados/styles.module.css";
import Title from "../../../components/Title/Title";
import SimuladosCard from "../../../components/SimuladoCard/SimuladoCard";
import Button from "../../../components/Button/Button";
import RegistrarSimuladoModal from "../../../components/ModalRegistrarSimulado/ModalRegistrarSimulado";
import fetchData from "../../../utils/fetchData";
import { useNavigate } from "react-router-dom";

const Simulados = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [turma, setTurma] = useState("");
  const [TotalSimulados, setTotalSimulados] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const simuladosFiltrados = TotalSimulados.filter(
    (item) =>
      item.titulo.toLowerCase().includes(search.toLowerCase()) ||
      item.nomeTurma.toLowerCase().includes(search.toLowerCase())
  );

  function handleCriarSimulado() {
    setMostrarModal(true);
  }

  function handleSalvarSimulado() {
    console.log("Turma registrada:", turma);
    setMostrarModal(false);
    setTurma("");
  }

  function handleResultados(simuladoId) {
    if (!simuladoId) {
      console.error("ID do simulado está indefinido!");
      return;
    }
    navigate(`/admin/Simulados/${simuladoId}`);
  }

  useEffect(() => {
    const getDataSimulados = async () => {
      const { getSimulados, getTurmaById } = fetchData();

      const response = await getSimulados();

      // Busca todas as turmas relacionadas aos simulados
      const turmaIdsUnicos = [
        ...new Set(response.map((turma) => turma.turmaId)),
      ];

      const turmasCompletas = await Promise.all(
        turmaIdsUnicos.map((id) => getTurmaById(id))
      );

      // Cria um mapa rápido para acesso ao nome da turma
      const turmaMap = {};
      turmasCompletas.forEach((turma) => {
        turmaMap[turma.id] = turma;
      });

      const opctions = response
        .map((item) => ({
          id: item.id,
          titulo: item.titulo,
          data: item.data,
          turmaId: item.turmaId,
          nomeTurma: turmaMap[item.turmaId]?.nome || "Sem nome",
          totalAlunos: turmaMap[item.turmaId]?.usuarios?.length || 0,
        }))
        .sort((a, b) => new Date(b.data) - new Date(a.data));

      setTotalSimulados(opctions);
      setTurmas(turmasCompletas);
    };

    getDataSimulados();
  }, []);

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <div className={styles.container}>
      <Title title="Simulados" />

      <div className={styles.main_content}>
        <div className={styles.header}>
          <div className={styles.title}>
            <p>Seus Simulados</p>
          </div>
          <div className={styles.seach}>
            <input
              type="text"
              placeholder="Pesquisar"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.button}>
            <Button
              children="Criar Simulado"
              bg_color="#DA9E00"
              padding_sz="25px"
              radius="15px"
              marginTop="16px"
              onClick={handleCriarSimulado}
              height_size={"5px"}
            />
          </div>
        </div>

        <div className={styles.CardSimulados}>
          {simuladosFiltrados.map((item) => (
            <SimuladosCard
              gradient="linear-gradient(to right,rgb(22, 22, 22) , #DA9E00)"
              key={item.id}
              titulo={item.titulo}
              data={formatarData(item.data)}
              status={"Concluído"}
              participantes={item.totalAlunos}
              turmas={item.nomeTurma}
              onRegistrarResultados={() => handleResultados(item.id)}
            />
          ))}
        </div>
      </div>

      {/* Modal de registro */}
      <RegistrarSimuladoModal
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSave={handleSalvarSimulado}
        turma={turma}
        setTurma={setTurma}
      />
    </div>
  );
};

export default Simulados;
