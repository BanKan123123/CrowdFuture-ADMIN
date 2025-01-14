import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Đăng ký tất cả các module cần thiết của Chart.js
Chart.register(...registerables);

interface ProblemSolutionMatrixProps {
  data: { x: number; y: number; size: number; name: string }[]; // Dữ liệu cho biểu đồ
  title?: string; // Tiêu đề biểu đồ
}

const ProblemSolutionMatrix: React.FC<ProblemSolutionMatrixProps> = ({ data, title = "Problem-Solution Matrix" }) => {
  const chartRef = useRef<HTMLCanvasElement>(null); // Tham chiếu tới canvas
  const chartInstance = useRef<Chart | null>(null); // Tham chiếu tới instance của chart

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Hủy biểu đồ cũ nếu có
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Tạo biểu đồ mới
      chartInstance.current = new Chart(ctx, {
        type: 'scatter', // Biểu đồ scatter
        data: {
          datasets: [
            {
              label: 'Vấn đề', // Dữ liệu biểu đồ
              data: data.map(item => ({
                x: item.x, // Mức độ cấp thiết
                y: item.y, // Chi phí giải quyết
                r: item.size, // Kích thước điểm theo số người gặp vấn đề
                name: item.name, // Tên vấn đề
              })),
              backgroundColor: 'rgba(75, 192, 192, 1)', // Màu sắc điểm
              borderColor: 'rgba(75, 192, 192, 1)', // Màu viền điểm
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: title, // Tiêu đề biểu đồ
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const item = tooltipItem.raw;
                  return `${item.name} - Cấp thiết: ${item.x}, Chi phí: ${item.y}, Người gặp vấn đề: ${item.r}`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mức độ cấp thiết (1-5)',
              },
              min: 0,
              max: 5,
              ticks: {
                stepSize: 1, // Tăng mỗi bước là 1
              },
            },
            y: {
              title: {
                display: true,
                text: 'Chi phí giải quyết',
              },
              min: 0,
              ticks: {
                stepSize: 10, // Tăng mỗi bước là 10
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
  }, [data, title]);

  return (
    <div>
      <canvas ref={chartRef}></canvas> {/* Đoạn này sẽ hiển thị biểu đồ */}
    </div>
  );
};

export default ProblemSolutionMatrix;
