import styles from "./styles.module.css";
import Title from "../../../components/Title/Title";
import Button from "../../../components/Button/Button";

const NovaRedacao = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title_wrapper}>
        <Title title="Nova redação" />
      </div>

      <div className={styles.center_wrapper}>
        <div className={styles.main_content}>
          <div className={styles.header_container}>
            <h3>Tema da proposta da redação</h3>
            <input type="text" />
          </div>

          <div className={styles.upload_container}>
            <div>
              <svg
                className={styles.img}
                width="260"
                height="150"
                viewBox="0 0 309 197"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M69.369 196.821C31.0715 196.821 0 168.484 0 133.557C0 105.967 19.3655 82.5065 46.3423 73.8517C46.2942 72.6655 46.246 71.4793 46.246 70.2931C46.246 31.4562 80.7378 0 123.323 0C151.889 0 176.795 14.1465 190.138 35.2344C197.461 30.7532 206.325 28.1172 215.815 28.1172C241.346 28.1172 262.061 47.0085 262.061 70.2931C262.061 75.653 260.953 80.7492 258.978 85.494C287.111 90.6781 308.307 113.392 308.307 140.586C308.307 171.647 280.703 196.821 246.645 196.821H69.369ZM107.426 101.486C102.897 105.615 102.897 112.293 107.426 116.379C111.954 120.465 119.276 120.509 123.756 116.379L142.544 99.2451L142.592 158.16C142.592 164.003 147.746 168.703 154.153 168.703C160.56 168.703 165.715 164.003 165.715 158.16V99.2451L184.502 116.379C189.03 120.509 196.353 120.509 200.833 116.379C205.313 112.249 205.361 105.571 200.833 101.486L162.295 66.3391C157.766 62.2094 150.444 62.2094 145.964 66.3391L107.426 101.486Z"
                  fill="#474747"
                />
              </svg>
            </div>

            <div className={styles.button_container}>
              <div className={styles.upload_button}>
                <Button bg_color="#242424" text="Selecionar arquivo" padding_sz="10px">
                  Escolher Arquivo
                </Button>
                <span>Nenhum arquivo selecionado</span>
              </div>

              <div className={styles.submit_button}>
                <Button
                  bg_color="#DA9E00"
                  width_size="100%"
                  padding_sz="20px"
                  text_color="#fffff"
                >
                  Enviar Proposta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovaRedacao;
