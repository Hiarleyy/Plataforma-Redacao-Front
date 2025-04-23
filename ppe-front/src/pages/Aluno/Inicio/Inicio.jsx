import styles from "./styles.module.css"
import Card from '../../../components/Card/Card';
import Title from '../../../components/Title/Title';

const Inicio = () => {
  return (
    <div className={styles.container}>
      <Title title="Início" />
      <div className={styles.main_content}>
          <Card 
            title="Bem-Vindo a Plataforma Redação Elite!" 
            content="Este é o conteúdo do card que pode ter qualquer informação." 
            variant=""
            actions={
              <>  
              <button className={styles.button}> Baixar Proposta
              </button>
              </>
            }
          />
        </div>  
      </div>
  )
}

export default Inicio