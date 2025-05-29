"use client";

import { useState, useEffect } from 'react';
import useUseful from '../../../utils/useUseful';
import styles from "./styles.module.css";
import Title from "../../../components/Title/Title";
import fetchData from '../../../utils/fetchData';
import Pagination from '../../../components/Pagination/Pagination';
import InfoCard from '../../../components/InfoCard/InfoCard';
import GraficoRedacoes from '../../../components/GraficoRedacoes/GraficoRedacoes';
import defaultProfilePicture from '../../../images/Defalult_profile_picture.jpg';

const Perfil = () => {
  const [usuario, setUsuario] = useState([]);
  const [activeTab, setActiveTab] = useState('minhas');
  const [redacoes, setRedacoes] = useState([]);
  const [correcoes, setCorrecoes] = useState([]);
  const [redacoesCorrigidas, setRedacoesCorrigidas] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // Estados para o modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRedacao, setSelectedRedacao] = useState(null);

  const { brasilFormatData } = useUseful()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentRedacoes = redacoes.slice(indexOfFirstItem, indexOfLastItem)
  const currentRedacoesCorrigidas = redacoesCorrigidas.slice(indexOfFirstItem, indexOfLastItem)

  const getAlunoId = () => {
      const aluno = localStorage.getItem('user_access_data')
      const {id} = JSON.parse(aluno)
      return id
  }

  // Função para abrir o modal com a redação selecionada
  const handleRedacaoClick = (redacao) => {
    setSelectedRedacao(redacao);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedRedacao(null);
  };

  // Responsividade para mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    const getData = async () => {
      const { getRedacoes, getAlunoById, getCorrecoes} = fetchData() 
      const alunoId = getAlunoId()
      
      // Buscar todas as redações do usuário
      const response = await getRedacoes(alunoId)
      setRedacoes(response)
      
      // Buscar redações corrigidas do usuário
      const responseCorrigidas = await getRedacoes(alunoId, true)
      setRedacoesCorrigidas(responseCorrigidas)

      
      // Buscar dados do aluno
      const responseAluno = await getAlunoById(alunoId)
      setUsuario(responseAluno)
    }

    getData()
  }, [])

  // Componente do Modal
  const RedacaoModal = ({ redacao, isOpen, onClose }) => {
    const [correcao, setCorrecao] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const getCorrecao = async () => {
        if (!correcao) return;
        
        try {
          setLoading(true);
          const { getCorrecoes } = fetchData();
          // Buscar correção específica para esta redação
          const correcaoData = await getCorrecoes(correcao.id);
          setCorrecao(correcaoData);
        } catch (error) {
          console.error("Erro ao buscar correção:", error);
        } finally {
          setLoading(false);
        }
      };

      if (isOpen && redacao) {
        getCorrecao();
      }
    }, [redacao, isOpen]);

    if (!isOpen || !redacao) return null;

    return (
      <div className={styles.modal_overlay} onClick={onClose}>
        <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modal_header}>
            <h2>{redacao.titulo}</h2>
            <button className={styles.close_button} onClick={onClose}>×</button>
          </div>
          <div className={styles.modal_body}>
            <div className={styles.redacao_info}>
              <p><strong>Data:</strong> {brasilFormatData(redacao.data)}</p>
              <p><strong>Tema:</strong> {redacao.tema}</p>
              {activeTab === 'avaliadas' && redacao.correcao && (
                <div className={styles.correcao_info}>
                  <h3>Correção</h3>
                  {loading ? (
                    <p>Carregando dados da correção...</p>
                  ) : correcao ? (
                    <>
                      <p><strong>Nota final:</strong> {correcao.nota}</p>
                      <div className={styles.competencias}>
                        <p><strong>Competência 1:</strong> {correcao.competencia1}</p>
                        <p><strong>Competência 2:</strong> {correcao.competencia2}</p>
                        <p><strong>Competência 3:</strong> {correcao.competencia3}</p>
                        <p><strong>Competência 4:</strong> {correcao.competencia4}</p>
                        <p><strong>Competência 5:</strong> {correcao.competencia5}</p>
                      </div>
                      {correcao.comentario && (
                        <div className={styles.comentario}>
                          <h4>Comentário do corretor:</h4>
                          <p>{correcao.comentario}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Nenhuma correção disponível</p>
                  )}
                </div>
              )}
            </div>
            <div className={styles.texto_redacao}>
              <h3>Texto</h3>
              <div className={styles.texto_container}>
                <p>{redacao.texto}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Title title="Perfil" />
      <div className={styles.main_content}>
        <div className={styles.perfil}>
          <div>
            <div className={styles.header_container}>
              <img className={styles.img_container} 
              src={usuario.caminho ? `http://localhost:3000/usuarios/${usuario.id}/profile-image` : defaultProfilePicture} alt="" />
              <h3>{usuario.nome && usuario.nome}</h3>
              <p>Entrou em 24/04/2025</p>
            </div>
          </div>

          {/* Métricas */}
          <div className={styles.metrics}>
            <span className={styles.metrics_status}>Total de redações: <a>{redacoes.length}</a></span>
            <span className={styles.metrics_status}>Avaliadas: <a>{redacoesCorrigidas.length}</a></span>
            <span className={styles.metrics_status}>Redações Nota 1000: <a>
              {redacoesCorrigidas.filter(redacao => redacao.correcao?.nota === 1000).length}
            </a></span>
            <span className={styles.metrics_status}>Média de Notas: <a>
              {redacoesCorrigidas.length > 0 
              ? (redacoesCorrigidas.reduce((acc, redacao) => acc + (redacao.correcao?.nota || 0), 0) / redacoesCorrigidas.length).toFixed(1)
              : '0'}
            </a></span>
          </div>
          
          {/* Gráfico de notas */}
          <div className={styles.chart_container}>
            <GraficoRedacoes
              data={redacoesCorrigidas.map(redacao => ({
                data: redacao.data,
                nota: redacao.correcao?.nota || 0,
                titulo: redacao.titulo
              }))}
              xKey="data"
              yKey="nota"
              title="Evolução das Notas"
              height_size={isMobile ? "250px" : "300px"}
            />
          </div>
        </div>

        {/* Aba de redações */}
        <div className={styles.aba_redacoes}>
          <div className={styles.menu_redacoes}>
            <div className={styles.tab_buttons}>
              <button 
                className={`${styles.tab_button} ${activeTab === 'minhas' ? styles.active_tab : ''}`}
                onClick={() => setActiveTab('minhas')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M14 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V2C16 0.9 15.1 0 14 0ZM12 10H4V8H12V10ZM12 6H4V4H12V6Z" fill={activeTab === 'minhas' ? '#DA9E00' : '#666666'}/>
                </svg>
                Minhas redações
              </button>
              <button 
                className={`${styles.tab_button} ${activeTab === 'avaliadas' ? styles.active_tab : ''}`}
                onClick={() => setActiveTab('avaliadas')}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 10.7L3.3 8L2 9.3L6 13.3L14 5.3L12.7 4L6 10.7Z" fill={activeTab === 'avaliadas' ? '#DA9E00' : '#666666'}/>
                </svg>
                Redações Avaliadas
              </button>
            </div>
            <div className={styles.tab_content}>
              {activeTab === 'minhas' ? (
                <div className={styles.minhas_redacoes}>
                  <div className={styles.cards_container}>
                    {currentRedacoes.map((redacao) => (
                      <div key={redacao.id} onClick={() => handleRedacaoClick(redacao)} className={styles.card_clickable}>
                        <InfoCard 
                          title={redacao.titulo} 
                          subtitle={brasilFormatData(redacao.data)}
                          button={false}
                          img="https://static.vecteezy.com/system/resources/previews/028/049/250/non_2x/terms-icon-design-vector.jpg"
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.pagination_container}>
                    <Pagination
                      currentPage={currentPage}
                      totalItems={redacoes.length}
                      itemsPerPage={itemsPerPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.redacoes_avaliadas}>
                  <div className={styles.cards_container}>
                    {currentRedacoesCorrigidas.map((redacao) => (
                      <div key={redacao.id} onClick={() => handleRedacaoClick(redacao)} className={styles.card_clickable}>
                        <InfoCard 
                          title={redacao.titulo} 
                          subtitle={brasilFormatData(redacao.data)}
                          button={false}
                          img="https://static.vecteezy.com/system/resources/previews/028/049/250/non_2x/terms-icon-design-vector.jpg"
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.pagination_container}>
                    <Pagination
                      currentPage={currentPage}
                      totalItems={redacoesCorrigidas.length}
                      itemsPerPage={itemsPerPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para exibir detalhes da redação */}
      <RedacaoModal 
        redacao={selectedRedacao} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Perfil;
