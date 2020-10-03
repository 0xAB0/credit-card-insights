import { useQuery } from "react-query";
import axios from "axios";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const fetchStatementData = async (statement) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/graph/TimeSeries?statement=${statement}`
  );

  const allData = res.data.series[0].dataPoints.map(
    (point) =>
      (point = {
        ...point,
        timestamp: new Date(point.time).getTime(),
        all: point.value,
      })
  );
  const paymentData = res.data.series[1].dataPoints.map(
    (point) =>
      (point = {
        ...point,
        timestamp: new Date(point.time).getTime(),
        payment: point.value,
      })
  );

  let merged = [];
  let i = 0;
  let j = 0;

  while (i < allData.length) {
    while (j < paymentData.length) {
      if (allData[i].timestamp === paymentData[j].timestamp) {
        merged.push({ ...allData[i], payment: paymentData[j].payment });
        i++;
        j++;
      } else if (allData[i].timestamp > paymentData[j].timestamp) {
        merged.push(paymentData[j]);
        j++;
      } else {
        merged.push(allData[i]);
        i++;
      }
    }
    merged.push(allData[i]);
    i++;
  }

  return merged;
};

const TimeSeriesLineGraph = ({ statement }) => {
  const { data, error, isLoading } = useQuery(statement, fetchStatementData);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <LineChart
      width={730}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        connectNulls
        type="monotone"
        dataKey="all"
        name="All"
        stroke="#8884d8"
      />
      <Line
        connectNulls
        type="monotone"
        dataKey="payment"
        name="Payment"
        stroke="#82ca9d"
      />
    </LineChart>
  );
};

export default TimeSeriesLineGraph;
