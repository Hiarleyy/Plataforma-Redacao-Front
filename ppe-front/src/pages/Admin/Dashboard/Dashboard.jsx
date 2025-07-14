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

  // 🔁 Carrega dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      const {
        getTurmas,
        getSimulados,
        getAlunos,
        getNotaSimulados,
        getSimuladoByIdTurma,
      } = fetchData();

      console.log("🚀 Iniciando carregamento dos dados...");

      const turmasData = await getTurmas();
      const simuladosData = await getSimulados();
      const alunosData = await getAlunos();

      console.log("📚 Turmas carregadas:", turmasData);
      console.log("📊 Simulados carregados:", simuladosData);
      console.log("👥 Alunos carregados:", alunosData);

      const turmasFormatadas = turmasData.map((t) => ({
        id: t.id,
        nome: t.nome,
      }));

      setTurmas(turmasFormatadas);
      setSimulados(simuladosData);
      setAlunos(alunosData);

      if (turmasFormatadas.length > 0) {
        const turmaInicial = turmasFormatadas[0].id;
        setIdTurma(turmaInicial);

        console.log("🎯 Turma inicial selecionada:", turmaInicial);

        // Já carrega os dados da análise mensal
        const inicioMes = startOfMonth(new Date());
        const fimMes = endOfMonth(new Date());

        const simuladosDaTurma = await getSimuladoByIdTurma(turmaInicial);
        const notasSimulados = await getNotaSimulados();

        console.log("📊 Simulados da turma inicial:", simuladosDaTurma);
        console.log("📋 Notas simulados inicial:", notasSimulados);

        const simuladosDoMes = simuladosDaTurma.filter((simulado) => {
          try {
            const data = parseISO(simulado.data);
            console.log("📅 Data inicial do simulado:", simulado.data, "Parsed:", data);
            return data >= inicioMes && data <= fimMes;
          } catch (error) {
            console.error("❌ Erro ao processar data inicial do simulado:", simulado.data, error);
            return false;
          }
        });

        const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

        const notas = notasSimulados
          .filter((nota) => idsSimuladosMes.includes(nota.simuladoId))
          .map((n) => {
            console.log("📋 Processando nota inicial:", n);
            return {
              usuarioId: n.usuarioId,
              competencia01: n.competencia01 || 0,
              competencia02: n.competencia02 || 0,
              competencia03: n.competencia03 || 0,
              competencia04: n.competencia04 || 0,
              competencia05: n.competencia05 || 0,
              nota: n.notaGeral || 0,
            };
          });

        console.log("📈 Notas iniciais processadas:", notas);

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

      console.log("🔍 Dados Mensais - IdTurma:", IdTurma);
      console.log("📅 Período:", { inicioMes, fimMes });

      const simuladosTurma = await getSimuladoByIdTurma(IdTurma);
      const notasAll = await getNotaSimulados();

      console.log("📊 Simulados da turma:", simuladosTurma);
      console.log("📋 Todas as notas:", notasAll);

      const simuladosDoMes = simuladosTurma.filter((simulado) => {
        try {
          const data = parseISO(simulado.data);
          console.log("📅 Data do simulado:", simulado.data, "Parsed:", data);
          return data >= inicioMes && data <= fimMes;
        } catch (error) {
          console.error("❌ Erro ao processar data do simulado:", simulado.data, error);
          return false;
        }
      });

      console.log("📊 Simulados do mês:", simuladosDoMes);

      const idsSimuladosMes = simuladosDoMes.map((s) => s.id);

      const notas = notasAll
        .filter((nota) => idsSimuladosMes.includes(nota.simuladoId))
        .map((n) => {
          console.log("📋 Processando nota:", n);
          return {
            usuarioId: n.usuarioId,
            competencia01: n.competencia01 || 0,
            competencia02: n.competencia02 || 0,
            competencia03: n.competencia03 || 0,
            competencia04: n.competencia04 || 0,
            competencia05: n.competencia05 || 0,
            nota: n.notaGeral || 0,
          };
        });

      console.log("📈 Notas processadas para gráfico:", notas);

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

      console.log("🔍 Dados Semanais - IdTurma:", IdTurma);
      console.log("📅 Período:", { inicioSemana, fimSemana });

      const turma = await getTurmaById(IdTurma);
      const redacoes = await getRedacoes();
      const correcoes = await getCorrecoes();

      console.log("👥 Turma:", turma);
      console.log("📝 Redações:", redacoes);
      console.log("✅ Correções:", correcoes);

      setUsuariosTurma(turma.usuarios || []);

      const redacoesSemana = redacoes.filter((r) => {
        const data = new Date(r.data);
        const dataOK = data >= inicioSemana && data <= fimSemana;
        const usuarioNaTurma = turma.usuarios?.some(u => u.id === r.usuarioId);
        
        console.log("🔍 Verificando redação:", {
          redacaoId: r.id,
          usuarioId: r.usuarioId,
          data: r.data,
          dataOK,
          usuarioNaTurma
        });
        
        return dataOK && usuarioNaTurma;
      });

      console.log("📝 Redações da semana:", redacoesSemana);

      const idsEnviadas = new Set(redacoesSemana.map((r) => r.usuarioId));
      const alunosTurma = turma.usuarios || [];
      const produzidos = alunosTurma.filter((aluno) => idsEnviadas.has(aluno.id)).length;

      const textoData = [
        {
          name: "Produção de Textos",
          produzidos,
          semProducao: alunosTurma.length - produzidos,
        },
      ];

      console.log("📊 Dados de texto:", textoData);

      setDataTextos(textoData);

      // Debug: vamos ver a estrutura das correções
      console.log("🔍 Estrutura das correções:", correcoes.slice(0, 2));
      console.log("🔍 Turma ID para filtro:", turma.id);

      const graficoCompetencia = correcoes
        .filter((c) => {
          // Verifica se o usuário da redação está na turma selecionada
          const usuarioNaTurma = turma.usuarios?.some(u => u.id === c.redacao?.usuarioId);
          
          // Verifica se a data está na semana atual
          const dataOK = c.redacao?.data &&
            isWithinInterval(parseISO(c.redacao.data), {
              start: inicioSemana,
              end: fimSemana,
            });
          
          console.log("🔍 Verificando correção:", {
            redacaoId: c.redacao?.id,
            usuarioId: c.redacao?.usuarioId,
            usuarioNaTurma,
            dataOK,
            data: c.redacao?.data
          });
          
          return usuarioNaTurma && dataOK;
        })
        .map((c) => {
          // Busca o nome do usuário na lista de usuários da turma
          const usuario = turma.usuarios?.find(u => u.id === c.redacao?.usuarioId);
          
          return {
            aluno: usuario?.nome || 'Usuário não encontrado',
            competencia01: c.competencia01,
            competencia02: c.competencia02,
            competencia03: c.competencia03,
            competencia04: c.competencia04,
            competencia05: c.competencia05,
            turma: turma.nome,
            nota: c.nota,
          };
        });

      console.log("📈 Dados competência semanal:", graficoCompetencia);

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
            {console.log("🎯 Dados para BarrasEmpilhadas:", dataCompetencia)}
            {dataCompetencia.length > 0 ? (
              <BarrasEmpilhadas data={dataCompetencia} />
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                {taggle === "Análise Mensal" 
                  ? "Não há dados de simulados para este mês" 
                  : "Não há correções de redações para esta semana"
                }
              </div>
            )}
            {dataTextos.length > 0 && (
              <>
                {console.log("📊 Dados para GraficoBarras:", dataTextos)}
                <GraficoBarras data={dataTextos} titulo="Análise de Textos Produzidos" />
              </>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.grafico_pizza}>
              {console.log("🍕 Dados para GraficoPizza:", dataCompetencia)}
              {dataCompetencia.length > 0 ? (
                <GraficoPizza data={dataCompetencia} titulo="Análise de Desempenho por Notas" />
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  {taggle === "Análise Mensal" 
                    ? "Não há dados de notas para este mês" 
                    : "Não há dados de competências para esta semana"
                  }
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
