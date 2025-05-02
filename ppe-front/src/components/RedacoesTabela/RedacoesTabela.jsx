import styles from './styles.module.css'
import useUseful from '../../utils/useUseful';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const RedacoesTabela = ({ redacoes }) => {
  const { brasilFormatData } = useUseful()
  const navigate = useNavigate()

  return (
    <div className={styles.tabela_container}>
      <table className={styles.tabela}>
        <thead>
          <tr>
            <th className={styles.cabecalho}>Título</th>
            <th className={styles.cabecalho}>Envio</th>
            <th className={styles.cabecalho}>Correção</th>
            <th className={styles.cabecalho}>Nota</th>
            <th className={styles.cabecalho}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {redacoes.map((redacao, index) => (
            <tr key={index}>
              <td className={styles.celula}>{redacao.titulo}</td>
              <td className={styles.celula}>{redacao.data}</td>
              <td className={styles.celula}>{redacao.correcao.data}</td>
              <td className={styles.celula}>{redacao.correcao.nota}</td>
              <td className={styles.celula}>
                <Button 
                  text_size="20px" 
                  text_color="#E0E0E0" 
                  padding_sz="10px" 
                  bg_color="#4A8F4A"
                  width_size="40px"
                  height_size="30px"
                  radius="6px"
                ><i class="fa-solid fa-eye"></i></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RedacoesTabela