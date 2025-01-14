import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface MultiAxisLineChartProps {
  labels: string[]; // Mảng các nhãn (labels) cho trục X
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    yAxisID: string;
  }[]; // Mảng các dataset
  title?: string; // Tiêu đề biểu đồ
  width?: number; // Chiều rộng của biểu đồ
  height?: number; // Chiều cao của biểu đồ
}

const MultiAxisLineChart: React.FC<MultiAxisLineChartProps> = ({
  labels,
  datasets,
  title = 'Multi Axis Line Chart',
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null); // Lưu trữ biểu đồ

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Hủy biểu đồ cũ nếu tồn tại
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Tạo biểu đồ mới
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets,
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          stacked: false,
          plugins: {
            title: {
              display: true,
              text: title,
            },
          },
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Quy mô',
              },
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Tăng trưởng',
              },
              grid: {
                drawOnChartArea: false, // Tắt lưới cho trục bên phải
              },
            },
          },
        },
      });
    }

    // Cleanup khi component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, datasets, title]);

  return (
    <div className="w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MultiAxisLineChart;
