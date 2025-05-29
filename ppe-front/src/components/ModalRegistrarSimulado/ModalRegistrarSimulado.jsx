import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import fetchData from "../../utils/fetchData";
import axios from "axios";
import SuccessModal from "../../components/modal/modalSucess/modalSucess";
import ModalFailure from "../../components/modal/modalFailure/modalFailure";

const RegistrarSimuladoModal = ({ isOpen, onClose, turma, setTurma }) => {
  const [turmas, setTurmas] = useState([]);
  const [formMessage, setFormMessage] = useState({});
  const [showfailureModal, setShowfailureModal] = useState(false);
  const [showSuccessModal, setShowSucessModal] = useState(false);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    const getData = async () => {
      const { getTurmas } = fetchData();
      const response = await getTurmas();
      const options = response.map((item) => ({
        id: item.id,
        nome: item.nome,
      }));
      setTurmas(options);
    };
    getData();
  }, []);

  // Resetar formulário ao fechar o modal
  const resetForm = () => {
    setTurma("");
    setTitulo("");
  };

  // Quando o modal for fechado, resetar os campos
  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!turma) {
      alert("Selecione uma turma");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/simulados", {
        turmaId: turma,
        titulo: titulo,
      });
      setFormMessage({
        type: "success",
        text: `Simulado ${response.data} criado com sucesso.`,
      });
      setShowSucessModal(true);
    } catch (error) {
      console.error("Erro ao registrar simulado", error);
      setFormMessage({
        type: "error",
        text: error.response?.data?.error || "Erro desconhecido.",
      });
      setShowfailureModal(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Registrar Novo Simulado</h2>

        <label className={styles.modalLabel} htmlFor="turma">
          Selecione a turma:
        </label>
        <select
          className={styles.modalInput}
          id="turma"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
        >
          <option value="">Selecione</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>

        <label className={styles.modalLabel} htmlFor="titulo">
          Adicione um nome ao simulado:
        </label>
        <input
          className={styles.modalInput}
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <div className={styles.modalActions}>
          <button
            className={styles.btnOutline}
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancelar
          </button>
          <button className={styles.btnDark} onClick={handleSubmit}>
            Salvar
          </button>
        </div>

        {showSuccessModal && (
          <SuccessModal
            onClose={() => {
              setShowSucessModal(false);
              resetForm();
              onClose();
            }}
          />
        )}

        {showfailureModal && (
          <ModalFailure
            onClose={() => {
              setShowfailureModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrarSimuladoModal;
