import { useState } from "react";
import styles from "./style.module.css";

const Tabela = ({ dados }) => {

  const [search, setSearch] = useState("");
 

  const getStatusClass = (status) => {
    const normalized = status?.toLowerCase();
    
    if (normalized === "entrada") return styles.status_paid;
    if (normalized === "saída") return styles.status_overdue;
    return "";
  };

  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const dadosFiltradosFicticios = [
    {
      id: 1,
      nome: "Joaquim",
      turma: "Turma A",
      dataVencimento: "2023-06-01",
      dataPagamento: "2023-06-01",
      valor: "R$ 100,00",
      status: "Pago",
    },
    {
      id: 2,
      nome: "Maria",
      turma: "Turma B",
      dataVencimento: "2023-06-15",
      dataPagamento: "2023-06-15",
      valor: "R$ 200,00",
      status: "Pendente",
    },
    {
      id: 3,
      nome: "Carlos",
      turma: "Turma C",
      dataVencimento: "2023-06-10",
      dataPagamento: null,
      valor: "R$ 150,00",
      status: "Em Atraso",
    },
    // Replicado para efeito de rolagem
    ...Array(20).fill({
      id: 4,
      nome: "Ana",
      turma: "Turma D",
      dataVencimento: "2023-06-20",
      dataPagamento: "2023-06-22",
      valor: "R$ 180,00",
      status: "Pago",
    }),
  ];

  return (
    <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tipo de Despensa</th>
              <th>Data de Pagamento</th>
              <th>Valor</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dados
              .filter((item) =>
                item.tipoDespensa.toLowerCase().includes(search.toLowerCase())
              )
              .map((row, index) => (
                <tr key={`${row.id}-${index}`}>
                  <td>{row.tipoDespensa}</td>
                  <td>{formatarData(row.dataPagamento)}</td>
                  <td>{'R$ ' + row.valor}</td>
                  <td>
                    <span
                      className={`${styles.status} ${getStatusClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
    </div>
  );
};

export default Tabela;
