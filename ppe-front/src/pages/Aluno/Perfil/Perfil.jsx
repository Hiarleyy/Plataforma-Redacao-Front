"use client";

import { useState } from 'react';
import styles from "./styles.module.css";
import Title from "../../../components/Title/Title";
import Pagination from '../../../components/Pagination/Pagination';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const Perfil = () => {
  const [activeTab, setActiveTab] = useState('minhas');

  // Dados fictícios das últimas redações (id, nota)
  const data = [
    { id: 'R1', nota: 780 },
    { id: 'R2', nota: 810 },
    { id: 'R3', nota: 890 },
    { id: 'R4', nota: 700 },
    { id: 'R5', nota: 850 },
  ];

  // Cálculo da média
  const mediaNotas = data.reduce((acc, item) => acc + item.nota, 0) / data.length;

  return (
    <div className={styles.container}>
      <Title title="Perfil" />
      <div className={styles.main_content}>
        <div className={styles.perfil}>
          <div>
            <div className={styles.header_container}>
              <img className={styles.img_container} src="https://github.com/hiarleyy.png" alt="" />
              <h3>Fulano da silva teste</h3>
              <p>Entrou em 24/04/2025</p>
            </div>
          </div>

          {/* Métricas */}
          <div className={styles.metrics}>
            <span className={styles.metrics_status}>Total de redações: <a> 5 </a></span>
            <span className={styles.metrics_status}>Avaliadas: <a> 5 </a></span>
            <span className={styles.metrics_status}>Redações Nota 1000: <a> 0 </a></span>
            <span className={styles.metrics_status}>Média de Notas: <a>{mediaNotas.toFixed(0)}</a></span>
          </div>

          {/* Gráfico de linha */}
          <div className={styles.chart_container}>
            <h4>Notas das Últimas Redações</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="id" stroke="#ccc" />
                <YAxis domain={[600, 1000]} stroke="#ccc" />
                <Tooltip />
                <Legend />
                <ReferenceLine y={mediaNotas} label="Média" stroke="#DA9E00" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="nota" stroke="#DA9E00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
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
                  <p>TABELA DE MINHAS REDAÇÕES</p>
                </div>
              ) : (
                <div className={styles.redacoes_avaliadas}>
                  <p>TABELA DE REDAÇÕES AVALIADAS</p>
                </div>
              )}
            </div>
          </div>

          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
