import axios from "axios";
import { PieChart, Pie, Tooltip } from "recharts";

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
    <PieChart width={500} height={250}>
      <Pie
        data={data}
        dataKey="actualValue"
        nameKey="label"
        cx="50%"
        cy="50%"
        outerRadius={50}
        fill="#8884d8"
        label
      />
      <Tooltip />
    </PieChart>
  );
};

export default PieGraph;
