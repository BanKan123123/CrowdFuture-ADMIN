import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Đăng ký tất cả các module cần thiết của Chart.js
Chart.register(...registerables);

interface GrowthChartProps {
  data: number[]; // Dữ liệu số lượng người dùng theo các quý
  title?: string; // Tiêu đề biểu đồ
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data, title = "Tăng trưởng số lượng users" }) => {
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
        type: 'line', // Biểu đồ line
        data: {
          labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4', 'Quý 5', 'Quý 6', 'Quý 7', 'Quý 8'], // Các quý
          datasets: [
            {
              label: 'Số lượng users', // Dữ liệu biểu đồ
              data: data, // Dữ liệu số lượng users
              borderColor: 'rgba(75, 192, 192, 1)', // Màu đường biểu đồ
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền của các điểm
              fill: true, // Fill màu dưới đường
              tension: 0.4, // Làm mượt đường vẽ
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
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Quý', // Tiêu đề trục X
              },
            },
            y: {
              title: {
                display: true,
                text: 'Số lượng users', // Tiêu đề trục Y
              },
              beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
              ticks: {
                stepSize: 10, // Mỗi bước trên trục Y tăng 10
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

export default GrowthChart;
