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
  const [redacoesCorrigidasTurma, setRedacoesCorrigidasTurma] = useState(0);
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
        getCorrecoes,
        getTurmaById,
        getRedacoes,
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
        const correcoes = await getCorrecoes();
        const turmaData = await getTurmaById(turmaInicial);
        const redacoes = await getRedacoes();

        // Processar dados de simulados para análise mensal
        const simuladosDoMes = simuladosDaTurma.filter((simulado) => {
          const data = parseISO(simulado.data);
          return data >= inicioMes && data <= fimMes;
        });

        const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

        const notasSimuladosFormatadas = notasSimulados
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

        // Análise mensal baseada apenas em simulados
        const todosOsDados = [...notasSimuladosFormatadas];

        // Calcular redações corrigidas da turma inicial no mês
        const redacoesCorrigidasDaTurma = correcoes.filter((c) => {
          if (!c.redacao?.usuario?.turma?.id || c.redacao.usuario.turma.id !== turmaData.id) return false;
          const data = new Date(c.redacao.data);
          return data >= inicioMes && data <= fimMes;
        });
        setRedacoesCorrigidasTurma(redacoesCorrigidasDaTurma.length);

        // Calcular estatísticas de produção de textos
        const redacoesDoMes = redacoes.filter((r) => {
          const data = new Date(r.data);
          return data >= inicioMes && data <= fimMes && r.usuario?.turma?.id === turmaData.id;
        });

        const idsEnviadas = new Set(redacoesDoMes.map((r) => r.usuarioId));
        const alunosTurma = turmaData.usuarios || [];
        const produzidos = alunosTurma.filter((aluno) => idsEnviadas.has(aluno.id)).length;

        setDataCompetencia(todosOsDados);
        setDataTextos([
          {
            name: "Produção Mensal",
            produzidos,
            semProducao: alunosTurma.length - produzidos,
          },
        ]);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (!IdTurma) return;

    const fetchMensal = async () => {
      const {
        getNotaSimulados,
        getSimuladoByIdTurma,
        getTurmaById,
        getRedacoes,
        getCorrecoes,
      } = fetchData();

      const inicioMes = startOfMonth(new Date());
      const fimMes = endOfMonth(new Date());

      // Buscar dados de simulados para análise mensal
      const simuladosTurma = await getSimuladoByIdTurma(IdTurma);
      const notasAll = await getNotaSimulados();

      const simuladosDoMes = simuladosTurma.filter((simulado) => {
        const data = parseISO(simulado.data);
        return data >= inicioMes && data <= fimMes;
      });

      const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

      const notasSimulados = notasAll
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

      // Análise mensal baseada apenas em simulados
      const todosOsDados = [...notasSimulados];

      console.log('Dados análise mensal:', todosOsDados);

      // Calcular estatísticas de produção de textos do mês
      const turma = await getTurmaById(IdTurma);
      const redacoes = await getRedacoes();
      const correcoes = await getCorrecoes();
      
      // Filtrar redações da turma no mês
      const redacoesDoMes = redacoes.filter((r) => {
        const data = new Date(r.data);
        return data >= inicioMes && data <= fimMes && r.usuario?.turma?.id === turma.id;
      });

      // Filtrar correções da turma no mês
      const correcoesDaTurmaNoMes = correcoes.filter((c) => {
        if (!c.redacao?.usuario?.turma?.id || c.redacao.usuario.turma.id !== turma.id) return false;
        const data = new Date(c.redacao.data);
        return data >= inicioMes && data <= fimMes;
      });
      
      // Calcular redações corrigidas da turma no mês (não todas as correções)
      setRedacoesCorrigidasTurma(correcoesDaTurmaNoMes.length);

      const idsEnviadas = new Set(redacoesDoMes.map((r) => r.usuarioId));
      const alunosTurma = turma.usuarios || [];
      const produzidos = alunosTurma.filter((aluno) => idsEnviadas.has(aluno.id)).length;

      setDataCompetencia(todosOsDados);
      setDataTextos([
        {
          name: "Produção Mensal",
          produzidos,
          semProducao: alunosTurma.length - produzidos,
        },
      ]);
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

      // Análise baseada nas últimas produções da turma (independente de data)
      const correcoesDaTurma = correcoes.filter((c) => {
        // Verificar se tem os dados necessários e se é da turma selecionada
        return c.redacao?.usuario?.turma?.id === turma.id;
      });

      console.log('Total de correções da turma:', correcoesDaTurma.length);

      // Ordenar por data de criação/correção (mais recentes primeiro) e pegar as últimas 10
      const ultimasCorrecoes = correcoesDaTurma
        .sort((a, b) => {
          // Ordenar pela data da redação (mais recente primeiro)
          const dataA = new Date(a.redacao.data);
          const dataB = new Date(b.redacao.data);
          return dataB - dataA;
        })
        .slice(0, 10); // Pegar as 10 mais recentes

      console.log('Últimas correções (10 mais recentes):', ultimasCorrecoes);

      // Atualizar contador de redações corrigidas da turma (apenas as últimas 10)
      setRedacoesCorrigidasTurma(ultimasCorrecoes.length);

      // Calcular estatísticas de produção de textos baseadas nas últimas produções
      const idsUltimasProducoes = new Set(ultimasCorrecoes.map((c) => c.redacao.usuario.id));
      const alunosTurma = turma.usuarios || [];
      const produzidos = idsUltimasProducoes.size;

      setDataTextos([
        {
          name: "Últimas Produções",
          produzidos,
          semProducao: alunosTurma.length - produzidos,
        },
      ]);

      const graficoCompetencia = ultimasCorrecoes.map((c) => ({
        usuarioId: c.redacao.usuario.id,
        competencia01: c.competencia01 || 0,
        competencia02: c.competencia02 || 0,
        competencia03: c.competencia03 || 0,
        competencia04: c.competencia04 || 0,
        competencia05: c.competencia05 || 0,
        nota: c.nota || 0,
      }));

      console.log('Dados análise semanal (últimas produções):', graficoCompetencia);
      setDataCompetencia(graficoCompetencia);
    };

    if (taggle === "Análise Mensal") {
      fetchMensal();
    } else if (taggle === "Últimas Produções") {
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
          <CardDash title="Redações corrigidas" content={redacoesCorrigidasTurma} color="#1A1A1A" />
        </div>

        <div className={styles.selects}>
          <div className={styles.taggle}>
            <Taggle data1="Análise Mensal" data2="Últimas Produções" setTaggle={setTaggle} />
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
            <GraficoBarras data={dataTextos} titulo="Análise de Textos Produzidos" />
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
