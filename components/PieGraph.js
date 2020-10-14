import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const colors = [
  "#7986cb",
  "#a5d6a7",
  "#ffc658",
  "#f48fb1",
  "#ce93d8",
  "#80deea",
  "#bcaaa4",
];

const PieGraph = ({ type, statement, start, end }) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async (type, statement, start, end) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/graph/Pie?${
          type === "date" && end !== ""
            ? `start=${start}&end=${end}`
            : `statement=${statement}`
        }`
      );

      setData(res.data.slices);
    };

    fetchData(type, statement, start, end);
  }, []);

  return (
    <ResponsiveContainer width={730} height={250}>
      <PieChart>
        <Pie
          data={data}
          dataKey="actualValue"
          nameKey="label"
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend align="right" verticalAlign="middle" layout="vertical" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieGraph;
