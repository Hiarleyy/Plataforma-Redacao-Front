import React, { useState } from "react";
import styles from "./styles.module.css"; 
import logo from "../../../images/logo02.png"// Importa o CSS separado

const RegistrarPagamentoModal = ({ onClose }) => {
  const [nome, setNome] = useState("");
  const [turma, setTurma] = useState("");
  const [dataPagamento, setdataPagamento] = useState("");
  const [dataVencimento, setdataVencimento] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nome,
      turma,
      dataPagamento,
      dataVencimento,
      valor,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="white"
          >
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <h2 className={styles.title}>REGISTRAR PAGAMENTO</h2>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label>Nome do Aluno:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Fulano Tal"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Turma:</label>
            <select value={turma} onChange={(e) => setTurma(e.target.value)}>
              <option>Selecione</option>
              <option>Turma 1</option>
              <option>Turma 2</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Data de Pagamento:</label>
            <input
              type="date"
              value={dataPagamento}
              onChange={(e) => setdataPagamento(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Data de Vencimento:</label>
            <input
              type="date"
              value={dataVencimento}
              onChange={(e) => setdataVencimento(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Valor:</label>
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="R$ 100"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            REGISTRAR PAGAMENTO
          </button>
        </form>
        <div className={styles.logoArea}>
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default RegistrarPagamentoModal;
