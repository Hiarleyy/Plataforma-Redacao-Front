import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./styles.module.css";

const COLORS = {
  produzidos: "#4caf50",
  semProducao: "#f44336",
};

const Barras = ({ data, titulo }) => {
  return (
    <div style={{ width: "100%" }}>
      {titulo && (
        <h3 className={styles.titulo} style={{ marginBottom: "20px" }}>
          {titulo}
        </h3>
      )}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barCategoryGap="20%">
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "#DA9E00",
                border: "9px solid #DA9E00",
                borderRadius: "16px",
              }}
              labelStyle={{ color: "#fff" }}
              itemStyle={{ color: "#fff" }}
            />
            <Legend />
            {Object.entries(COLORS).map(([key, color]) => (
              <Bar
                barSize={150}
                key={key}
                dataKey={key}
                fill={color}
                isAnimationActive={true}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Barras;