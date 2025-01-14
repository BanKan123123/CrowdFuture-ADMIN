import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsVenn from 'highcharts/modules/venn';

// Kích hoạt module Venn
if (typeof HighchartsVenn === 'function') {
  HighchartsVenn(Highcharts);
}

interface TAMSamSomChartProps {
  data: { sets: string[]; value: number }[];
  title?: string; // Tùy chọn để thay đổi tiêu đề biểu đồ
}

const TAMSamSomChart: React.FC<TAMSamSomChartProps> = ({ data, title }) => {
  const options = {
    series: [
      {
        type: 'venn',
        data: data,
      },
    ],
    title: {
      text: title || 'TAM-SAM-SOM Venn Diagram',
    },
    credits: {
      enabled: false, // Tắt hiển thị link "Highcharts.com"
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default TAMSamSomChart;
