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
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([]);
  const [taggle, setTaggle] = useState("Análise Mensal");

  useEffect(() => {
    const loadInitialData = async () => {
      const {
        getTurmas,
        getSimulados,
        getAlunos,
        getNotaSimulados,
        getSimuladoByIdTurma,
        getRedacoesCorrigidas,
      } = fetchData();

      const turmasData = await getTurmas();
      const simuladosData = await getSimulados();
      const alunosData = await getAlunos();
      const redacoesCorrigidasData = await getRedacoesCorrigidas();

      const turmasFormatadas = turmasData.map((t) => ({
        id: t.id,
        nome: t.nome,
      }));

      setTurmas(turmasFormatadas);
      setSimulados(simuladosData);
      setAlunos(alunosData);
      setRedacoesCorrigidas(redacoesCorrigidasData);

      if (turmasFormatadas.length > 0) {
        const turmaInicial = turmasFormatadas[0].id;
        setIdTurma(turmaInicial);

        // Já carrega os dados da análise mensal
        const inicioMes = startOfMonth(new Date());
        const fimMes = endOfMonth(new Date());

        const simuladosDaTurma = await getSimuladoByIdTurma(turmaInicial);
        const notasSimulados = await getNotaSimulados();

        const simuladosDoMes = simuladosDaTurma.filter((simulado) => {
          const data = parseISO(simulado.data);
          return data >= inicioMes && data <= fimMes;
        });

        const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

        const notas = notasSimulados
          .filter((nota) => idsSimuladosMes.includes(nota.simuladoId))
          .map((n) => ({
            usuarioId: n.usuarioId,
            competencia01: n.competencia01,
            competencia02: n.competencia02,
            competencia03: n.competencia03,
            competencia04: n.competencia04,
            competencia05: n.competencia05,
            nota: n.notaGeral,
          }));

        setDataCompetencia(notas);
        setDataTextos([]);
      }
    };

    loadInitialData();
  }, []);

  // 🔄 Atualiza os gráficos conforme o toggle ou turma mudam
  useEffect(() => {
    if (!IdTurma) return;

    const fetchMensal = async () => {
      const {
        getNotaSimulados,
        getSimuladoByIdTurma,
      } = fetchData();

      const inicioMes = startOfMonth(new Date());
      const fimMes = endOfMonth(new Date());

      const simuladosTurma = await getSimuladoByIdTurma(IdTurma);
      const notasAll = await getNotaSimulados();

      const simuladosDoMes = simuladosTurma.filter((simulado) => {
        const data = parseISO(simulado.data);
        return data >= inicioMes && data <= fimMes;
      });

      const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

      const notas = notasAll
        .filter((nota) => idsSimuladosMes.includes(nota.simuladoId))
        .map((n) => ({
          usuarioId: n.usuarioId,
          competencia01: n.competencia01,
          competencia02: n.competencia02,
          competencia03: n.competencia03,
          competencia04: n.competencia04,
          competencia05: n.competencia05,
          nota: n.notaGeral,
        }));

      setDataCompetencia(notas);
      setDataTextos([]);
    };

    const fetchSemanal = async () => {
      const {
        getTurmaById,
        getRedacoes,
        getCorrecoes,
      } = fetchData();

      const inicioSemana = startOfWeek(new Date(), { weekStartsOn: 0 });
      const fimSemana = endOfWeek(new Date(), { weekStartsOn: 0 });

      const turma = await getTurmaById(IdTurma);
      const redacoes = await getRedacoes();
      const correcoes = await getCorrecoes();

      setUsuariosTurma(turma.usuarios || []);

      const redacoesSemana = redacoes.filter((r) => {
        const data = new Date(r.data);
        return data >= inicioSemana && data <= fimSemana;
      });

      const idsEnviadas = new Set(redacoesSemana.map((r) => r.usuarioId));
      const alunosTurma = turma.usuarios || [];
      const produzidos = alunosTurma.filter((aluno) => idsEnviadas.has(aluno.id)).length;

      setDataTextos([
        {
          name: "Produção de Textos",
          produzidos,
          semProducao: alunosTurma.length - produzidos,
        },
      ]);

      const graficoCompetencia = correcoes
        .filter((c) => {
          const turmaOK = c.redacao?.usuario?.turma?.id === turma.id;
          const dataOK = c.redacao?.data &&
            isWithinInterval(parseISO(c.redacao.data), {
              start: inicioSemana,
              end: fimSemana,
            });
          return turmaOK && dataOK;
        })
        .map((c) => ({
          aluno: c.redacao.usuario.nome,
          competencia01: c.competencia01,
          competencia02: c.competencia02,
          competencia03: c.competencia03,
          competencia04: c.competencia04,
          competencia05: c.competencia05,
          turma: c.redacao.usuario.turma.nome,
          nota: c.nota,
        }));

      setDataCompetencia(graficoCompetencia);
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
          <CardDash title="Total de alunos" content={alunos.length} color="#1A1A1A" />
          <CardDash title="Total de turmas" content={turmas.length} color="#1A1A1A" />
          <CardDash title="Total de simulados" content={simulados.length} color="#1A1A1A" />
          <CardDash title="Redações corrigidas" content={redacoesCorrigidas.length} color="#1A1A1A" />
        </div>

        <div className={styles.selects}>
          <div className={styles.taggle}>
            <Taggle data1="Análise Mensal" data2="Análise Semanal" setTaggle={setTaggle} />
          </div>
          <div className={styles.select_turma}>
            <select value={IdTurma || ""} onChange={(e) => setIdTurma(e.target.value)}>
              {turmas.map((t) => (
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
            <BarrasEmpilhadas data={dataCompetencia} />
            {dataTextos.length > 0 && (
              <GraficoBarras data={dataTextos} titulo="Análise de Textos Produzidos" />
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.grafico_pizza}>
              <GraficoPizza data={dataCompetencia} titulo="Análise de Desempenho por Notas" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
