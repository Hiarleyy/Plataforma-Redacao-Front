import { useState } from 'react';
import styles from "./styles.module.css";
import Title from "../../../components/Title/Title";

const Perfil = () => {
  // Add state to track which tab is active
  const [activeTab, setActiveTab] = useState('minhas');

  return (
    <div className={styles.container}>
      <Title title="Perfil" />
      <div className={styles.main_content}>
      {/*Container De Perfil*/}
      <div className={styles.perfil}>
      <div>
        {/*Imagem, Nome e descriçao do Aluno*/}        
        <div className={styles.header_container}>
        <img className={styles.img_container} src="https://github.com/hiarleyy.png" alt=""/>
        <h3>Fulano da silva teste</h3>
        <p>Entrou em 24/04/2025</p>
        </div>
      </div>
        {/* Métricas do Aluno*/}
      <div className={styles.metrics}>
        <span className={styles.metrics_status}>
        Total de redacoes:
        <a> 0 </a>   
        </span>
        <span className={styles.metrics_status}>
        Avaliadas:
        <a> 0 </a>   
        </span>
        <span className={styles.metrics_status}>
        Redações Nota 1000:
        <a> 0 </a>   
        </span>
        <span className={styles.metrics_status}>
        Média de Notas:
        <a> 0 </a>   
        </span>
      </div>

      </div>
      <div className={styles.aba_redacoes}>
        <div className={styles.menu_redacoes}>
          <div className={styles.tab_buttons}>
            <button 
              className={`${styles.tab_button} ${activeTab === 'minhas' ? styles.active_tab : ''}`}
              onClick={() => setActiveTab('minhas')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V2C16 0.9 15.1 0 14 0ZM12 10H4V8H12V10ZM12 6H4V4H12V6Z" fill={activeTab === 'minhas' ? '#DA9E00' : '#666666'}/>
              </svg>
              Minhas redações
            </button>
            <button 
              className={`${styles.tab_button} ${activeTab === 'avaliadas' ? styles.active_tab : ''}`}
              onClick={() => setActiveTab('avaliadas')}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10.7L3.3 8L2 9.3L6 13.3L14 5.3L12.7 4L6 10.7Z" fill={activeTab === 'avaliadas' ? '#DA9E00' : '#666666'}/>
              </svg>
              Redações Avaliadas
            </button>
          </div>
          
          {/* Condicional da Aba Ativa */}
          <div className={styles.tab_content}>
            {activeTab === 'minhas' ? (
              <div className={styles.minhas_redacoes}>
                {/* Conteudo de Minhas Redações */}
                <p>TABELA DE MINHAS REDAÇÕES</p>
                {/* =ADICIONAR COMPONENTE DE TABELA AQUI= */}
              </div>
            ) : (
              <div className={styles.redacoes_avaliadas}>
                {/* Conteudo de Redações Avaliadas */}
                <p>TABELA DE REDAÇÕES AVALIADAS</p>
                {/* =ADICIONAR COMPONENTE DE TABELA AQUI=*/}
              </div>
            )}
          </div>
        </div>
        <div className={styles.tab_navigation}>
          <button> 
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.366138 7.6427C-0.122047 8.11687 -0.122047 8.88692 0.366138 9.3611L7.86467 16.6444C8.35286 17.1185 9.14567 17.1185 9.63386 16.6444C10.122 16.1702 10.122 15.4001 9.63386 14.926L3.01797 8.5L9.62996 2.07403C10.1181 1.59985 10.1181 0.8298 9.62996 0.355629C9.14177 -0.118543 8.34896 -0.118543 7.86077 0.355629L0.362233 7.6389L0.366138 7.6427Z" fill="#C4C4C4"/>
          </svg>

          </button>
          <button>
          <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.63386 7.6427C10.122 8.11687 10.122 8.88692 9.63386 9.3611L2.13533 16.6444C1.64714 17.1185 0.854325 17.1185 0.366139 16.6444C-0.122046 16.1702 -0.122046 15.4001 0.366139 14.926L6.98203 8.5L0.370045 2.07403C-0.118141 1.59985 -0.118141 0.8298 0.370045 0.355629C0.858231 -0.118543 1.65104 -0.118543 2.13923 0.355629L9.63777 7.6389L9.63386 7.6427Z" fill="#C4C4C4"/>
          </svg>
          </button>
        </div>
      
      </div>
    </div>
  </div>
  )
}

export default Perfil