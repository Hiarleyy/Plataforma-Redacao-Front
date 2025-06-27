// Configurações do WhatsApp para suporte
export const WHATSAPP_CONFIG = {
  // Número do WhatsApp no formato internacional (código do país + DDD + número)
  // Exemplo: Brasil (55) + São Paulo (11) + número (999999999)
  phoneNumber: "", // Substitua pelo número real do suporte
  
  // Mensagens pré-definidas para diferentes situações
  messages: {
    general: "Olá! Preciso de ajuda com a Plataforma de Redação. Podem me auxiliar?",
    technical: "Olá! Estou com problemas técnicos na Plataforma de Redação. Podem me ajudar?",
    payment: "Olá! Tenho dúvidas sobre pagamentos na Plataforma de Redação. Podem me auxiliar?",
    account: "Olá! Preciso de ajuda com minha conta na Plataforma de Redação. Podem me ajudar?"
  },
  
  // Configurações de comportamento
  settings: {
    loadingDelay: 1000, // Tempo de feedback visual em ms
    fallbackMessage: 'Não foi possível abrir o WhatsApp. Tente novamente ou entre em contato pelos canais alternativos.'
  }
}

// Função helper para detectar dispositivo móvel
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// Função para construir URL do WhatsApp
export const buildWhatsAppUrl = (phoneNumber, message) => {
  const encodedMessage = encodeURIComponent(message)
  
  if (isMobileDevice()) {
    return `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
  } else {
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  }
}
