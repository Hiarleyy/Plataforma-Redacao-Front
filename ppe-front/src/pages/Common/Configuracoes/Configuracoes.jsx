import styles from "./styles.module.css"
import Title from "../../../components/Title/Title"
import Input from "../../../components/Input/Input"
import Button from "../../../components/Button/Button"
import { useEffect, useState } from "react"
import fetchData from "../../../utils/fetchData"

const Configuracoes = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    profilePicture: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await fetchData("user/profile", "GET");
        if (response.success) {
          setUser({
            name: response.data.name || "",
            email: response.data.email || "",
            profilePicture: response.data.profilePicture || null
          });
          if (response.data.profilePicture) {
            setPreviewImage(response.data.profilePicture);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setMessage({ type: "error", text: "Erro ao carregar dados do usuário" });
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUser(prev => ({ ...prev, profilePicture: file }));
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const formData = new FormData();
      formData.append("name", user.name);
      if (user.profilePicture && user.profilePicture instanceof File) {
        formData.append("profilePicture", user.profilePicture);
      }

      const response = await fetchData("user/update-profile", "PUT", formData, true);
      
      if (response.success) {
        setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
      } else {
        setMessage({ type: "error", text: response.message || "Erro ao atualizar perfil" });
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      setMessage({ type: "error", text: "Erro ao atualizar perfil" });
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async () => {
    // Validate passwords
    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem" });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setMessage({ type: "error", text: "A nova senha deve ter pelo menos 6 caracteres" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await fetchData("user/change-password", "PUT", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });

      if (response.success) {
        setMessage({ type: "success", text: "Senha atualizada com sucesso!" });
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        setMessage({ type: "error", text: response.message || "Erro ao atualizar senha" });
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      setMessage({ type: "error", text: "Erro ao atualizar senha" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Title title={"Configurações"} />
      <div className={styles.main_content}>
        <div className={styles.config_container}>
          <div className={styles.sections_wrapper}>
            <div className={styles.section}>
              <h2>Informações de Perfil</h2>
              <div className={styles.profile_picture_container}>
                <div className={styles.profile_picture}>
                  {previewImage ? 
                    <img src={previewImage} alt="Foto de perfil" /> : 
                    <div className={styles.profile_placeholder}>
                        <img src="https://github.com/hiarleyy.png" alt="" />
                    </div>
                  }
                </div>
                <div className={styles.upload_container}>
                  <label htmlFor="profile-picture" className={styles.upload_btn}>
                    Alterar foto de perfil
                  </label>
                  <input 
                    type="file" 
                    id="profile-picture" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }}
                  />
                  <span className={styles.file_info}>Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB</span>
                </div>
              </div>
            </div>
            
            <div className={styles.section}>
              <h2>Alterar Senha</h2>
              
              <div className={styles.form_group}>
                <label>Senha Atual</label>
                <Input 
                  type="password" 
                  placeholder="Sua senha atual" 
                  value={passwords.currentPassword}
                  name="currentPassword"
                  onChange={handlePasswordChange}
                  color="#1A1A1A"
                ><i class="fa-solid fa-user"></i></Input>
              </div>
              
              <div className={styles.form_group}>
                <label>Nova Senha</label>
                <Input 
                  type="password" 
                  placeholder="Nova senha" 
                  value={passwords.newPassword}
                  name="newPassword"
                  color="#1A1A1A"
                  onChange={handlePasswordChange}

                ><i class="fa-solid fa-key"></i></Input>
              </div>
              
              <div className={styles.form_group}>
                <label>Confirmar Nova Senha</label>
                <Input 
                  type="password" 
                  placeholder="Confirmar nova senha" 
                  value={passwords.confirmPassword}
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                  color="#1A1A1A"
                ><i class="fa-solid fa-key"></i></Input>
              </div>
              
              <div className={styles.button_container}>
                <Button 
                  onClick={updatePassword} 
                  isLoading={loading} 
                  bg_color="#DA9E00"
                  padding_sz="10px"
                  width_size="200px"
                >
                  Atualizar Senha
                </Button>
              </div>
            </div>
          </div>
          
          {message.text && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Configuracoes