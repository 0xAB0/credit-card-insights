export const graphData = [
  {
    name: "Sep",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Oct",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Dec",
    income: 3000,
    expense: 1398,
  },
  {
    name: "Jan",
    income: 3490,
    expense: 4300,
  },
  {
    name: "Feb",
    income: 2780,
    expense: 3908,
  },
  {
    name: "Mar",
    income: 4000,
    expense: 2400,
  },
  {
    name: "Apr",
    income: 3000,
    expense: 1398,
  },
  {
    name: "May",
    income: 2000,
    expense: 9800,
  },
  {
    name: "Jun",
    income: 2780,
    expense: 3908,
  },
  {
    name: "Jul",
    income: 1890,
    expense: 4800,
  },
  {
    name: "Aug",
    income: 2390,
    expense: 3800,
  },
  {
    name: "Sep",
    income: 3490,
    expense: 4300,
  },
];

export const barData = [
  {
    name: "Group A",
    value: 400,
  },
  {
    name: "Group B",
    value: 300,
  },
  {
    name: "Group C",
    value: 300,
  },
  {
    name: "Group D",
    value: 200,
  },
  {
    name: "Group E",
    value: 278,
  },
  {
    name: "Group F",
    value: 189,
  },
];

function createData(id, date, description, amount, category) {
  return { id, date, description, amount, category };
}

export const tableData = [
  createData(1, "2020-08-01", "supermarket", "$13.23", "grocery"),
  createData(2, "2020-08-07", "bus", "$3.00", "transit"),
  createData(3, "2020-08-10", "coffee", "$5.00", "food & drink"),
];
