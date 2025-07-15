import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#ef233c", // 0-500 - Vermelho
  "#ff6b35", // 500-600 - Laranja
  "#f77f00", // 600-700 - Amarelo-alaranjado
  "#fcbf49", // 700-800 - Amarelo
  "#8ecae6", // 800-900 - Azul claro
  "#219ebc", // 900-999 - Azul médio
  "#023047", // 1000 - Azul escuro
];

// Função para agrupar os dados por faixa de nota
function agruparPorFaixa(data) {
  console.log('Dados recebidos no gráfico pizza:', data);
  
  const faixas = [
    { name: "0-500", min: 0, max: 499 },
    { name: "500-600", min: 500, max: 599 },
    { name: "600-700", min: 600, max: 699 },
    { name: "700-800", min: 700, max: 799 },
    { name: "800-900", min: 800, max: 899 },
    { name: "900-999", min: 900, max: 999 },
    { name: "1000", min: 1000, max: 1000 },
  ];

  const contagem = {};

  // Inicializar contagem
  faixas.forEach((faixa) => {
    contagem[faixa.name] = 0;
  });

  // Se não há dados válidos, retorna array vazio
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.log('Nenhum dado válido encontrado');
    return [];
  }

  // Contar notas por faixa
  data.forEach((item) => {
    const nota = parseFloat(item.nota) || 0;
    console.log('Processando nota:', nota);
    
    if (nota > 0) { // Só conta notas maiores que 0
      const faixa = faixas.find((f) => nota >= f.min && nota <= f.max);
      if (faixa) {
        contagem[faixa.name]++;
        console.log(`Nota ${nota} adicionada à faixa ${faixa.name}`);
      }
    }
  });

  // Retornar apenas faixas com valores > 0
  const resultado = Object.entries(contagem)
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0);
    
  console.log('Dados agrupados para o gráfico:', resultado);
  return resultado;
}

const GraficoPizza = ({ data, titulo }) => {
  console.log('GraficoPizza renderizado com dados:', data);
  
  const dadosAgrupados = agruparPorFaixa(data);
  const temDados = dadosAgrupados && dadosAgrupados.length > 0;

  console.log('Tem dados para exibir:', temDados);
  console.log('Dados agrupados:', dadosAgrupados);

  if (!temDados) {
    return (
      <div style={{ 
        width: "100%", 
        height: 450, 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        color: "#666",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e0e0e0"
      }}>
        <h3 style={{ marginBottom: "20px", color: "#333" }}>{titulo}</h3>
        <p style={{ fontSize: "16px" }}>Nenhum dado disponível para exibir</p>
        <p style={{ fontSize: "14px", color: "#999" }}>
          Selecione uma turma com dados ou verifique o período
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 450 }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
        {titulo}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={dadosAgrupados}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value, percent }) => 
              `${name}: ${value} (${(percent * 100).toFixed(1)}%)`
            }
          >
            {dadosAgrupados.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${value} redação${value !== 1 ? 'ões' : ''}`, 
              `Faixa ${name}`
            ]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => `Faixa ${value}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoPizza;
