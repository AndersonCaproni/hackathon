import { PieChart } from '@mui/x-charts/PieChart';

export default function Grafico({ dataGrafico }) {

  return (
    <PieChart
      series={[
        {
          data: dataGrafico,
          highlightScope: { fade: 'global', highlight: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          valueFormatter: (value) => `${value?.value}%`,
        },
      ]}
      height={300}
      width={400}
    />
  );
}