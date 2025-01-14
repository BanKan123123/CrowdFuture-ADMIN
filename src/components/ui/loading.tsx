import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loader from './loading2';

const quotes = [
  "Thành công không phải là cuối cùng, thất bại không phải là chết người: sự dũng cảm tiếp tục mới quan trọng. - Winston Churchill",
  "Cơ hội không xảy ra. Bạn tạo ra chúng. - Chris Grosser",
  "Chìa khóa thành công là tập trung tâm trí vào những điều bạn mong muốn, chứ không phải những gì bạn sợ hãi. - Brian Tracy",
  "Đừng ngại từ bỏ điều tốt để theo đuổi điều vĩ đại. - John D. Rockefeller",
  "Thành công là tổng hợp của những nỗ lực nhỏ được lặp đi lặp lại ngày qua ngày. - Robert Collier",
];

export default function LoadingScreen({
  message = "THE 3000",
  showQuotes = true,
  showHomeLink = true,
  homeLinkText = "Bạn có muốn đi khám phá những tính năng khác của website",
  spinnerColor = "text-blue-500",
  spinnerSize = "h-16 w-16",
  typeLoading = "1"
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [dots, setDots] = useState(0);

  useEffect(() => {
    if (showQuotes) {
      const interval = setInterval(() => {
        setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showQuotes]);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  const renderLoading = () => {
    if (typeLoading === "1") {
      return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white z-50">
          <div className="flex flex-col items-center max-w-2xl w-full px-4">
            <div className="mb-6">
              <svg
                className={`animate-spin ${spinnerSize} ${spinnerColor}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10v-2a8 8 0 1 1 8-8h2c0-5.52-4.48-10-10-10z"
                />
              </svg>
            </div>

            <p className="text-lg font-medium text-gray-600 mb-4">
              {message}
              <span className="inline-block w-6 text-left">
                {'.'.repeat(dots)}
              </span>
            </p>

            {showQuotes && (
              <div className="h-20 flex items-center justify-center overflow-hidden transition-all duration-500 ease-in-out">
                <p
                  className="text-sm text-gray-500 italic text-center max-w-lg px-4 animate-fade"
                  key={quoteIndex}
                >
                  {quotes[quoteIndex]}
                </p>
              </div>
            )}

            {showHomeLink && (
              <div className="mt-6">
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-500 hover:text-blue-600 dark:text-blue-500 italic text-center block transition-colors"
                >
                  {homeLinkText}
                </Link>
              </div>
            )}
          </div>
        </div>
      );
    } else if (typeLoading === "2") {
      return (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white z-50">
            <Loader message={message}/>
        </div>

      );
    }
    return null;
  };

  return renderLoading();
}
