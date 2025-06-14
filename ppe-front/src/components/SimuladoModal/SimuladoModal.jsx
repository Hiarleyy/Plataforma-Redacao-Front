import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import fetchData from '../../utils/fetchData';
import Button from '../Button/Button';

const SimuladoModal = ({ simulado, isOpen, onClose, brasilFormatData }) => {
  const [turmaInfo, setTurmaInfo] = useState(null);
  const [notasSimulado, setNotasSimulado] = useState([]);
  const [notaAluno, setNotaAluno] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAlunoId = () => {
    const aluno = localStorage.getItem('user_access_data')
    const { id } = JSON.parse(aluno)
    return id
  }

  useEffect(() => {
    if (isOpen && simulado) {
      fetchSimuladoDetails();
    }
  }, [isOpen, simulado]);  const fetchSimuladoDetails = async () => {
    try {
      setLoading(true);
      const { getTurmaById, getNotasbySimuladoId,getNotasByUsuarioId } = fetchData();
      const alunoId = getAlunoId();
      
      // Buscar informações da turma
      if (simulado.turmaId) {
        const turmaData = await getTurmaById(simulado.turmaId);
        setTurmaInfo(turmaData);
      }

      // Buscar todas as notas do simulado
      try {
        const notas = await getNotasbySimuladoId(simulado.id);
        setNotasSimulado(notas);
      } catch (error) {
        setNotasSimulado([]);
      }

      // Buscar nota específica do aluno
      try {
        const notasAluno = await getNotasByUsuarioId(alunoId);
        const notaDoSimulado = notasAluno.find(nota => nota.simuladoId === simulado.id);
        setNotaAluno(notaDoSimulado || null);
      } catch (error) {
        setNotaAluno(null);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do simulado:', error);
    } finally {
      setLoading(false);
    }
  };

  const calcularEstatisticas = () => {
    if (notasSimulado.length === 0) {
      return {
        participantes: 0,
        mediaGeral: 0,
        maiorNota: 0,
        menorNota: 0
      };
    }

    const notas = notasSimulado.map(n => n.notaGeral);
    const participantes = notasSimulado.length;
    const mediaGeral = (notas.reduce((acc, nota) => acc + nota, 0) / participantes).toFixed(1);
    const maiorNota = Math.max(...notas);
    const menorNota = Math.min(...notas);

    return {
      participantes,
      mediaGeral,
      maiorNota,
      menorNota
    };
  };

  if (!isOpen || !simulado) return null;

  const estatisticas = calcularEstatisticas();

  return (
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_header}>
          <h2>{simulado.titulo}</h2>
          <button className={styles.close_button} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.modal_body}>
          {loading ? (
            <div className={styles.loading}>Carregando informações...</div>
          ) : (
            <>
              <div className={styles.info_section}>
                <h3>Informações Gerais</h3>
                <div className={styles.info_grid}>
                  <div className={styles.info_item}>
                    <span className={styles.label}>📅 Data:</span>
                    <span className={styles.value}>{brasilFormatData(simulado.data)}</span>
                  </div>                  <div className={styles.info_item}>
                    <span className={styles.label}>📝 Status:</span>
                    <span className={styles.value}>
                      {notaAluno ? 'Realizado' : 'Não Realizado'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.stats_section}>
                <h3>Estatísticas de Participação</h3>
                <div className={styles.stats_grid}>
                  <div className={styles.stat_card}>
                    <span className={styles.stat_number}>{estatisticas.participantes}</span>
                    <span className={styles.stat_label}>Participantes</span>
                  </div>
                  <div className={styles.stat_card}>
                    <span className={styles.stat_number}>{estatisticas.mediaGeral}</span>
                    <span className={styles.stat_label}>Média Geral</span>
                  </div>
                  <div className={styles.stat_card}>
                    <span className={styles.stat_number}>{estatisticas.maiorNota}</span>
                    <span className={styles.stat_label}>Maior Nota</span>
                  </div>                  
                    <div className={styles.stat_card}>
                    <span className={styles.stat_number}>{notaAluno ? notaAluno.notaGeral : 'N/A'}</span>
                    <span className={styles.stat_label}>Sua Nota</span>
                  </div>
                </div>
              </div>                <div className={styles.nota_container}>
                <h3>Seu Desempenho no Simulado</h3>
                    <div className={styles.nota_info}>
                {notaAluno ? (
                    <div className={styles.competencias}>
                    <p>Competência 1: {notaAluno.competencia01}</p>
                    <p>Competência 2: {notaAluno.competencia02}</p>
                    <p>Competência 3: {notaAluno.competencia03}</p>
                    <p>Competência 4: {notaAluno.competencia04}</p>
                    <p>Competência 5: {notaAluno.competencia05}</p>
                    <h4>Nota Final: {notaAluno.notaGeral}</h4>
                  </div>
                ) : (
                  <div className={styles.sem_nota}>
                    <p>Você ainda não realizou este simulado.</p>
                  </div>
                )}
              </div>

                </div>
            
                
            </>
          )}
        </div>

        <div className={styles.modal_footer}>
          <Button
            bg_color="#DA9E00"
            text_color="#000"
            padding_sz="10px 20px"
            onClick={onClose}
          >
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimuladoModal;
