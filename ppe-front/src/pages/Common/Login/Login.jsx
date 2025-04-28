import styles from "./styles.module.css"
import logo from "../../../images/logo01.png"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import googleIcone from "../../../images/google_icon.svg"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className={styles.container}>
      <div className={styles.bg_left}>
        <img src={logo} alt="logo" />

        <p className={styles.credits}>&copy; 2025 Redação Elite</p>
      </div>
      <div className={styles.bg_right}>
        <p>Acesse sua conta e aproveite nossos serviços</p>

        <form>
          <Input
            type="email"
            placeholder="Seu email"
            color="#242424"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >
            <i className="fa-solid fa-envelope"></i>
          </Input>

          <Input
            type="password"
            placeholder="Sua senha"
            color="#242424"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          >
            <i className="fa-solid fa-lock"></i>
          </Input>

          <Button text_size="20px" text_color="#E0E0E0" padding_sz="12px 20px" bg_color="#DA9E00">Entrar</Button>

        </form>

        <button className={styles.sign_with_google}>
          <img src={googleIcone} alt="google icone" /> <p>Continuar com o Google</p>
        </button>

        <p>Não possui uma conta? <a href="/" className={styles.signup_link}>Clique aqui e Cadastre-se!</a></p>
      </div>
    </div>
  )
}

export default Login