import styles from "../Dashboard/styles.module.css";
import Title from "../../../components/Title/Title";
import BarrasEmpilhadas from "../../../components/GraficoBarrasEmpilhadas/BarrasEmpilhadas";
import GraficoPizza from "../../../components/GraficoPizza/GraficoPizza";
import { useState, useEffect } from "react";
import fetchData from "../../../utils/fetchData";
import GraficoBarras from "../../../components/GraficoBarras/Barra";
import Taggle from "../../../components/Taggle/Taggle";
import CardDash from "../../../components/CardDash/CardDash";
const baseURL = import.meta.env.VITE_API_BASE_URL;


import {
  startOfWeek,
  endOfWeek,
  parseISO,
  isWithinInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";

const Dashboard = () => {
  const [IdTurma, setIdTurma] = useState(null);
  const [turmas, setTurmas] = useState([]);
  const [dataCompetencia, setDataCompetencia] = useState([]);
  const [dataTextos, setDataTextos] = useState([]);
  const [usuariosTurma, setUsuariosTurma] = useState([]);
  const [simulados, setSimulados] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [taggle, setTaggle] = useState("Análise Mensal");
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  // 🔁 Carrega dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const {
          getTurmas,
          getSimulados,
          getAlunos,
          getNotaSimulados,
          getSimuladoByIdTurma,
        } = fetchData();

        const [turmasData, simuladosData, alunosData] = await Promise.all([
          getTurmas(),
          getSimulados(),
          getAlunos()
        ]);

        const turmasFormatadas = turmasData?.map((t) => ({
          id: t.id,
          nome: t.nome,
        })) || [];

        setTurmas(turmasFormatadas);
        setSimulados(simuladosData || []);
        setAlunos(alunosData || []);

        if (turmasFormatadas.length > 0) {
          const turmaInicial = turmasFormatadas[0].id;
          setIdTurma(turmaInicial);

          // Já carrega os dados da análise mensal
          const inicioMes = startOfMonth(new Date());
          const fimMes = endOfMonth(new Date());

          const [simuladosDaTurma, notasSimulados] = await Promise.all([
            getSimuladoByIdTurma(turmaInicial),
            getNotaSimulados()
          ]);

          const simuladosDoMes = (simuladosDaTurma || []).filter((simulado) => {
            if (!simulado.data) return false;
            try {
              const data = parseISO(simulado.data);
              return data >= inicioMes && data <= fimMes;
            } catch (error) {
              console.warn('Erro ao parsear data do simulado:', simulado.data);
              return false;
            }
          });

          const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

          const notas = (notasSimulados || [])
            .filter((nota) => nota && idsSimuladosMes.includes(nota.simuladoId))
            .map((n) => ({
              usuarioId: n.usuarioId,
              competencia01: n.competencia01 || 0,
              competencia02: n.competencia02 || 0,
              competencia03: n.competencia03 || 0,
              competencia04: n.competencia04 || 0,
              competencia05: n.competencia05 || 0,
              nota: n.notaGeral || 0,
            }));

          setDataCompetencia(notas);
          setDataTextos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados iniciais:', error);
        setTurmas([]);
        setSimulados([]);
        setAlunos([]);
        setDataCompetencia([]);
        setDataTextos([]);
      }
    };

    loadInitialData();
  }, []);

  // 🔄 Atualiza os gráficos conforme o toggle ou turma mudam
  useEffect(() => {
    if (!IdTurma) return;

    const fetchMensal = async () => {
      try {
        const {
          getNotaSimulados,
          getSimuladoByIdTurma,
        } = fetchData();

        const inicioMes = startOfMonth(new Date());
        const fimMes = endOfMonth(new Date());

        const [simuladosTurma, notasAll] = await Promise.all([
          getSimuladoByIdTurma(IdTurma),
          getNotaSimulados()
        ]);

        const simuladosDoMes = (simuladosTurma || []).filter((simulado) => {
          if (!simulado.data) return false;
          try {
            const data = parseISO(simulado.data);
            return data >= inicioMes && data <= fimMes;
          } catch (error) {
            console.warn('Erro ao parsear data do simulado:', simulado.data);
            return false;
          }
        });

        const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

        const notas = (notasAll || [])
          .filter((nota) => nota && idsSimuladosMes.includes(nota.simuladoId))
          .map((n) => ({
            usuarioId: n.usuarioId,
            competencia01: n.competencia01 || 0,
            competencia02: n.competencia02 || 0,
            competencia03: n.competencia03 || 0,
            competencia04: n.competencia04 || 0,
            competencia05: n.competencia05 || 0,
            nota: n.notaGeral || 0,
          }));

        setDataCompetencia(notas);
        setDataTextos([]);
      } catch (error) {
        console.error('Erro ao buscar dados mensais:', error);
        setDataCompetencia([]);
        setDataTextos([]);
      }
    };

    const fetchSemanal = async () => {
      try {
        const {
          getTurmaById,
          getRedacoes,
          getCorrecoes,
        } = fetchData();

        const inicioSemana = startOfWeek(new Date(), { weekStartsOn: 0 });
        const fimSemana = endOfWeek(new Date(), { weekStartsOn: 0 });

        const [turma, redacoes, correcoes] = await Promise.all([
          getTurmaById(IdTurma),
          getRedacoes(),
          getCorrecoes()
        ]);

        const usuariosTurmaData = turma?.usuarios || [];
        setUsuariosTurma(usuariosTurmaData);

        const redacoesSemana = (redacoes || []).filter((r) => {
          if (!r.data) return false;
          try {
            const data = new Date(r.data);
            return data >= inicioSemana && data <= fimSemana;
          } catch (error) {
            console.warn('Erro ao parsear data da redação:', r.data);
            return false;
          }
        });

        const idsEnviadas = new Set(redacoesSemana.map((r) => r.usuarioId));
        const produzidos = usuariosTurmaData.filter((aluno) => idsEnviadas.has(aluno.id)).length;

        setDataTextos([
          {
            name: "Produção de Textos",
            produzidos,
            semProducao: usuariosTurmaData.length - produzidos,
          },
        ]);

        const graficoCompetencia = (correcoes || [])
          .filter((c) => {
            if (!c.redacao?.usuario?.turma?.id || !c.redacao?.data) return false;
            
            const turmaOK = c.redacao.usuario.turma.id === turma?.id;
            let dataOK = false;
            
            try {
              dataOK = isWithinInterval(parseISO(c.redacao.data), {
                start: inicioSemana,
                end: fimSemana,
              });
            } catch (error) {
              console.warn('Erro ao parsear data da correção:', c.redacao.data);
              return false;
            }
            
            return turmaOK && dataOK;
          })
          .map((c) => ({
            aluno: c.redacao?.usuario?.nome || 'N/A',
            competencia01: c.competencia01 || 0,
            competencia02: c.competencia02 || 0,
            competencia03: c.competencia03 || 0,
            competencia04: c.competencia04 || 0,
            competencia05: c.competencia05 || 0,
            turma: c.redacao?.usuario?.turma?.nome || 'N/A',
            nota: c.nota || 0,
          }));

        setDataCompetencia(graficoCompetencia);
      } catch (error) {
        console.error('Erro ao buscar dados semanais:', error);
        setDataCompetencia([]);
        setDataTextos([]);
      }
    };

    if (taggle === "Análise Mensal") {
      fetchMensal();
    } else if (taggle === "Análise Semanal") {
      fetchSemanal();
    }
  }, [IdTurma, taggle]);

  return (
    <div className={styles.container}>
      <Title title="Dashboard" />
      <div className={styles.container_desenpenho}>
        <div className={styles.CardDashs_container}>
          <CardDash title="Total de alunos" content={alunos?.length || 0} color="#1A1A1A" />
          <CardDash title="Total de turmas" content={turmas?.length || 0} color="#1A1A1A" />
          <CardDash title="Total de simulados" content={simulados?.length || 0} color="#1A1A1A" />
        </div>

        <div className={styles.selects}>
          <div className={styles.taggle}>
            <Taggle data1="Análise Mensal" data2="Análise Semanal" setTaggle={setTaggle} />
          </div>
          <div className={styles.select_turma}>
            <select value={IdTurma || ""} onChange={(e) => setIdTurma(e.target.value)}>
              <option value="">Selecione uma turma</option>
              {turmas?.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.container_graficos}>
          <div className={styles.left}>
            <h3>Análise de Desempenho por competências</h3>
            {dataCompetencia?.length > 0 ? (
              <BarrasEmpilhadas data={dataCompetencia} />
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                Nenhum dado disponível para o período selecionado
              </div>
            )}
            {dataTextos?.length > 0 && (
              <GraficoBarras data={dataTextos} titulo="Análise de Textos Produzidos" />
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.grafico_pizza}>
              {dataCompetencia?.length > 0 ? (
                <GraficoPizza data={dataCompetencia} titulo="Análise de Desempenho por Notas" />
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  Nenhum dado disponível para o período selecionado
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
