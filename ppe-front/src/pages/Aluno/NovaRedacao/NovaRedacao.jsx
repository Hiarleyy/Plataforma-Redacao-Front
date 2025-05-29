import styles from "../NovaRedacao/styles.module.css";
import Title from "../../../components/Title/Title";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import imageCompression from "browser-image-compression";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import InfoCard from "../../../components/InfoCard/InfoCard";
import Pagination from "../../../components/Pagination/Pagination";
import Loading from "../../../components/Loading/Loading";
import Message from "../../../components/Message/Message";
import fetchData from "../../../utils/fetchData";
import { useNavigate } from "react-router-dom";

const Novaredacao = () => {
  const [fileName, setFilesName] = useState("Nenhum arquivo enviado");
  const [tema, setTema] = useState("");
  const [formMessage, setFormMessage] = useState(null);
  const [fileBlob, setFileBlob] = useState(null); 
  const [search, setSearch] = useState("")
  const [redacao, setRedacao] = useState([])
  const navigate = useNavigate()
  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentredacaos= redacao.slice(indexOfFirstItem, indexOfLastItem)
  const formData = new FormData();
  const usuarioId = '66ef8409-473b-454e-97ff-beb62db0a8c2'


  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFilesName(file.name);

    if (!file) return;

    if (file.type.startsWith("image/")) {
      try {
        const compressedImage = await imageCompression(file, {
          maxSizeMB: 5,
          useWebWorker: true,
        });

        const imageData = await compressedImage.arrayBuffer();
        const pdfDoc = await PDFDocument.create();
        const imageExit = file.type.includes("png")
          ? await pdfDoc.embedPng(imageData)
          : await pdfDoc.embedJpg(imageData);

        const page = pdfDoc.addPage([
          imageExit.width * 0.7,
          imageExit.height * 0.7,
        ]);
        page.drawImage(imageExit, {
          x: 0,
          y: 0,
          width: imageExit.width * 0.7,
          height: imageExit.height * 0.7,
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });

        setFileBlob(blob);
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
      }
    } else if (file.type === "application/pdf") {
      setFileBlob(file);
    } else {
      alert("Formato de arquivo não aceito");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const handleSubmit = async () => {
    if (!fileBlob || !tema.trim()) {
      alert("Preencha o tema e envie um arquivo válido.");
      return;
    }

    formData.append("titulo", tema);
    formData.append("file", fileBlob, fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);

    
    try { 
     
      formData.append("usuarioId", usuarioId)
      
      const response = await axios.post(`http://localhost:3000/redacoes/${usuarioId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormMessage({
        type: "success",
        text: `redacao enviada com sucesso!`,
      });
    } catch (error) {
      console.error(error);
      setFormMessage({
        type: "error",
        text: error.response?.data?.error || "Erro ao enviar redacao.",
      });
    }
  };
  const formatarData = (data) => {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR",{
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(()=>{
    const getData = async() =>{
      const { getRedacaoById } = fetchData()
      const redacoesResponse = await getRedacaoById(usuarioId)
    
    const options = redacoesResponse.map(item =>({
      id: item.id,
      titulo: item.titulo,
      status: item.status,
      data: item.data,
      usuarioId: item.usuarioId
    })).sort((a, b) => new Date(b.data) - new Date(a.data)); // Ordena por data decrescente
    setRedacao(options)
    
  }
  getData()

  }, [])
  const deleteRedacao = async (id) => {
    const confirmation = confirm("Tem certeza que deseja excluir essa redacao?")
    if (!confirmation) {
      navigate("/admin/nova-redacao")
      return
    }
    await axios.delete(`http://localhost:3000/redacaos/${id}`)
    navigate("/admin/nova-redacao")
  }



  return (
    <div className={styles.container}>
      <Title title="Nova Redação" />
      <div className={styles.main_content}>
        <div className={styles.bg_left}>
          {redacao.length === 0 ? <div className={styles.loading}><Loading /></div> :
            <> 
              <p className={styles.form_title}>Redações enviadas</p>
              <Input
                type= "text"
                placeholder="Pesquise por redacao"
                color="#1A1A1A" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                >
                  <i className= "fa-solid fa-magnifying-glass"></i>
                </Input>
                <div className= {styles.redacao_container}>
                  {currentredacaos.map((redacao) => (
                    <InfoCard
                    key={redacao.id}
                    img="https://static.vecteezy.com/system/resources/previews/028/049/250/non_2x/terms-icon-design-vector.jpg"
                    title={redacao.titulo}
                    subtitle={formatarData(redacao.data)}
                    link={redacao.id}
                    onClick={() => deleteRedacao(redacao.id)}
                    />
                  )) }
                </div>
                <div className={styles.pagination}>
                  <Pagination
                  currentPage={currentPage}
                  totalItems={redacao.length}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                  />
                </div>
            </>
          }
        </div>
        <div className={styles.bg_right}>
          <p className= {styles.form_title}>Upload Da Nova Redação</p>
          <Input
            type="text"
            placeholder="Tema da nova redação"
            color="#1A1A1A"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            >
            <i className="fa-solid fa-pen"></i>
          </Input>
          <div className={styles.upload_container}>
            <svg
              className={styles.img}
              viewBox="0 0 309 197"
            >
              <path
                d="M69.369 196.821C31.0715 196.821 0 168.484 0 133.557C0 105.967 19.3655 82.5065 46.3423 73.8517C46.2942 72.6655 46.246 71.4793 46.246 70.2931C46.246 31.4562 80.7378 0 123.323 0C151.889 0 176.795 14.1465 190.138 35.2344C197.461 30.7532 206.325 28.1172 215.815 28.1172C241.346 28.1172 262.061 47.0085 262.061 70.2931C262.061 75.653 260.953 80.7492 258.978 85.494C287.111 90.6781 308.307 113.392 308.307 140.586C308.307 171.647 280.703 196.821 246.645 196.821H69.369ZM107.426 101.486C102.897 105.615 102.897 112.293 107.426 116.379C111.954 120.465 119.276 120.509 123.756 116.379L142.544 99.2451L142.592 158.16C142.592 164.003 147.746 168.703 154.153 168.703C160.56 168.703 165.715 164.003 165.715 158.16V99.2451L184.502 116.379C189.03 120.509 196.353 120.509 200.833 116.379C205.313 112.249 205.361 105.571 200.833 101.486L162.295 66.3391C157.766 62.2094 150.444 62.2094 145.964 66.3391L107.426 101.486Z"
                fill="#474747" className={styles.img}
              />
            </svg>
            <div className={styles.button_container}>
              <div {...getRootProps()} className={styles.button_upload}>
                <input {...getInputProps()} />
                <Button
                  bg_color="#363636"
                  text="Selecionar arquivo"
                  radius = "50px"
                >
                  Escolher Arquivo
                </Button>
              </div>
              <span className={styles.file_name}>{fileName || "Nenhum arquivo selecionado"}</span>
            </div>
            <div className={styles.info_container}>
              <Message 
                text={formMessage ? formMessage.text : ""} 
                type={formMessage ? formMessage.type : ""} 
              />
            </div>
            
            <div onClick={handleSubmit} className={styles.submit_button}>
            <Button
              bg_color="#DA9E00"
              width_size="100%"
              padding_sz="20px"
              text_color="#fffff"
            >
              Enviar redacao
            </Button>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Novaredacao;