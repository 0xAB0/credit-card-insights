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

const strokeColors = [
  "#7986cb",
  "#a5d6a7",
  "#ffc658",
  "#f48fb1",
  "#ce93d8",
  "#80deea",
  "#bcaaa4",
];

const fetchTimeSeriesData = async (
  type,
  statement,
  start,
  end,
  breakdown,
  resolution
) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/graph/TimeSeries?${
      type === "date" && end !== ""
        ? `start=${start}&end=${end}`
        : `statement=${statement}`
    }&breakdown=${breakdown}&resolution=${resolution}`
  );

  let arr = [];

  res.data.series.map((series) =>
    series.dataPoints.map((point) => {
      const label = series.label;
      const timestamp = new Date(point.time).getTime();

      if (arr.some((obj) => obj.timestamp === timestamp)) {
        arr = arr.map((obj) =>
          obj.timestamp === timestamp ? { ...obj, [label]: point.value } : obj
        );
      } else {
        arr.push({
          time: point.time,
          timestamp: new Date(point.time).getTime(),
          [label]: point.value,
        });
      }
    })
  );

  const sorted = arr.sort((a, b) => a.timestamp - b.timestamp);

  const labels = res.data.series.map((series) => series.label);

  return { sorted, labels };
};

const TimeSeriesLineGraph = ({ query }) => {
  const { type, statement, start, end, breakdown, resolution } = query;

  const { data, error, isLoading } = useQuery(
    [type, statement, start, end, breakdown, resolution],
    fetchTimeSeriesData
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    !isLoading && (
      <LineChart
        width={730}
        height={300}
        data={data.sorted}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.labels.map((label, index) => (
          <Line
            key={index}
            connectNulls
            type="monotone"
            dataKey={label}
            name={label}
            stroke={strokeColors[index % strokeColors.length]}
          />
        ))}
      </LineChart>
    )
  );
};

export default TimeSeriesLineGraph;
