import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

// Đăng ký tất cả các module cần thiết của Chart.js
Chart.register(...registerables);

interface FinancialChartProps {
  revenueData: number[]; // Dữ liệu doanh thu
  costData: number[]; // Dữ liệu chi phí
  burnRateData: number[]; // Dữ liệu burn rate
  title?: string; // Tiêu đề biểu đồ
}

const FinancialChart: React.FC<FinancialChartProps> = ({
  revenueData,
  costData,
  burnRateData,
  title = "Biểu đồ Tài chính 18 tháng",
}) => {
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
          labels: [
            'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 
            'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12',
            'Tháng 13', 'Tháng 14', 'Tháng 15', 'Tháng 16', 'Tháng 17', 'Tháng 18'
          ], // Các tháng
          datasets: [
            {
              label: 'Doanh thu', // Dữ liệu doanh thu
              data: revenueData, // Dữ liệu doanh thu
              borderColor: 'rgba(75, 192, 192, 1)', // Màu đường doanh thu
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền của doanh thu
              fill: false, // Không tô màu dưới đường
              yAxisID: 'y1', // Gắn dữ liệu vào trục y1 (Doanh thu)
            },
            {
              label: 'Chi phí', // Dữ liệu chi phí
              data: costData, // Dữ liệu chi phí
              borderColor: 'rgba(255, 99, 132, 1)', // Màu đường chi phí
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền của chi phí
              fill: false, // Không tô màu dưới đường
              yAxisID: 'y2', // Gắn dữ liệu vào trục y2 (Chi phí)
            },
            {
              label: 'Burn rate', // Dữ liệu burn rate
              data: burnRateData, // Dữ liệu burn rate
              borderColor: 'rgba(153, 102, 255, 1)', // Màu đường burn rate
              backgroundColor: 'rgba(153, 102, 255, 0.2)', // Màu nền của burn rate
              fill: false, // Không tô màu dưới đường
              yAxisID: 'y2', // Gắn dữ liệu vào trục y2 (Burn rate)
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
                text: 'Tháng', // Tiêu đề trục X
              },
            },
            y1: {
              title: {
                display: true,
                text: 'Doanh thu', // Tiêu đề trục Y1
              },
              beginAtZero: true, // Đảm bảo trục Y1 bắt đầu từ 0
            },
            y2: {
              title: {
                display: true,
                text: 'Chi phí & Burn rate', // Tiêu đề trục Y2
              },
              position: 'right', // Đặt trục Y2 ở bên phải
              beginAtZero: true, // Đảm bảo trục Y2 bắt đầu từ 0
              grid: {
                drawOnChartArea: false, // Tắt lưới cho trục Y2
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
  }, [revenueData, costData, burnRateData, title]);

  return (
    <div>
      <canvas ref={chartRef}></canvas> {/* Đoạn này sẽ hiển thị biểu đồ */}
    </div>
  );
};

export default FinancialChart;
