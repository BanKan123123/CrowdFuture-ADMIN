/** @type {import('next').NextConfig} */
const nextConfig = {
     async redirects() {
          return [
               {
                    source: '/',
                    destination: '/login',
                    permanent: true, // Đặt `true` nếu muốn chuyển hướng 301 (vĩnh viễn), `false` nếu tạm thời (302)
               },
          ];
     },
};

export default nextConfig;
