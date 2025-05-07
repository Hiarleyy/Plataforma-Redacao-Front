import styles from './styles.module.css'

const RankingTabela = ({ ranking }) => {

  return (
    <div className={styles.tabela_container}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th className={styles.cabecalho}>Posição</th>
            <th className={styles.cabecalho}>Nome</th>
            <th className={styles.cabecalho}>Turma</th>
            <th className={styles.cabecalho}>Média</th>
          </tr>
        </thead>
        <tbody>
          {ranking.slice(3).map((item, index) => (
            <tr key={item.id}>
              <td className={styles.celula}>{`${index + 4}º`}</td>
              <td className={styles.celula}>{item.nome}</td>
              <td className={styles.celula}>{item.turma}</td>
              <td className={styles.celula}>{item.media}</td>    
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RankingTabela
