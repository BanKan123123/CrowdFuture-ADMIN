import MSTFetch from '@/core/fetch';

export const setLoginTime = () => {
     const currentTime = new Date().getTime();
     localStorage.setItem('loginTime', currentTime.toString());
};

export const checkAndRefreshToken = async () => {
     const loginTime = localStorage.getItem('loginTime');
     const currentTime = new Date().getTime();

     if (loginTime) {
          const timeSinceLogin = (currentTime - parseInt(loginTime)) / 1000; // Thời gian đã trôi qua tính bằng giây
          const fiftyMinutes = 50 * 60; // 50 phút tính bằng giây (3000 giây)

          if (timeSinceLogin >= fiftyMinutes) {
               // Đã quá 50 phút, cần refresh token
               try {
                    const response = await MSTFetch.get('customer-auth/refresh');
                    console.log('>>>> Refresh token thành công:', response);

                    if ((response as any)?.success) {
                         setLoginTime();
                    }
               } catch (error) {
                    console.error('Lỗi khi refresh token:', error);
               }
          } else {
               console.log('Token còn hạn sử dụng, không cần refresh');
          }
     } else {
          console.log('Không tìm thấy thời gian đăng nhập');
     }
     return;
};

export const getRandomColor = () => {
     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
