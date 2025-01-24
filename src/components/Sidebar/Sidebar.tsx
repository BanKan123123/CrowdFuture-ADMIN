import React from 'react';
import Link from 'next/link';
import { BiLayer } from 'react-icons/bi';
import {
     AiOutlineHome,
     AiOutlineProject,
     AiOutlineTeam,
     AiOutlineDollar,
     AiOutlineBarChart,
     AiOutlineAreaChart,
     AiOutlineSetting,
     AiOutlineLock,
     AiOutlineHistory,
     AiOutlineLogout,
} from 'react-icons/ai';
import { usePathname } from 'next/navigation';

interface MenuItem {
     href: string;
     icon: React.ReactNode;
     label: string;
}

interface MenuSection {
     title: string;
     items: MenuItem[];
}

const Sidebar = () => {
     const pathname = usePathname();
     const menuSections: MenuSection[] = [
          {
               title: 'Menu Chính',
               items: [
                    { href: '/dashboard', icon: <AiOutlineHome />, label: 'Dashboard' },
                    { href: '/projects', icon: <AiOutlineProject />, label: 'Quản lý Dự án' },
                    { href: '/users', icon: <AiOutlineTeam />, label: 'Quản lý User' },
                    { href: '/investments', icon: <AiOutlineDollar />, label: 'Quản lý Đầu tư' },
               ],
          },
          {
               title: 'Báo cáo',
               items: [
                    { href: '/statistics', icon: <AiOutlineBarChart />, label: 'Thống kê' },
                    { href: '/analytics', icon: <AiOutlineAreaChart />, label: 'Phân tích' },
               ],
          },
          {
               title: 'Hệ thống',
               items: [
                    { href: '/settings', icon: <AiOutlineSetting />, label: 'Cài đặt' },
                    { href: '/permissions', icon: <AiOutlineLock />, label: 'Phân quyền' },
                    { href: '/logs', icon: <AiOutlineHistory />, label: 'Nhật ký' },
               ],
          },
     ];
     return (
          <div className="h-full z-40 w-[285px]">
               <div className="fixed bg-[#080B1A]">
                    <div
                         className="absolute inset-0 bg-gradient-radial from-[rgba(0,209,255,0.1)] via-transparent to-transparent"
                         style={{ backgroundPosition: '20% 20%', backgroundSize: '40% 40%' }}
                    />
                    <div
                         className="absolute inset-0 bg-gradient-radial from-[rgba(255,0,153,0.1)] via-transparent to-transparent"
                         style={{ backgroundPosition: '80% 80%', backgroundSize: '40% 40%' }}
                    />
                    <div
                         className="absolute inset-0 bg-gradient-radial from-[rgba(112,0,255,0.1)] via-transparent to-transparent"
                         style={{ backgroundPosition: '50% 50%', backgroundSize: '60% 60%' }}
                    />
               </div>

               {/* <div className="fixed inset-0 bg-grid-pattern opacity-20" /> */}

               <aside
                    className="w-[280px] bg-[rgba(8,11,26,0.95)] backdrop-blur-[20px] border-r border-[rgba(255,255,255,0.1)] p-8 flex flex-col gap-8 h-screen fixed overflow-y-auto overflow-visible scrollbar-none"
                    style={{
                         scrollbarWidth: 'none', // Firefox
                         msOverflowStyle: 'none', // IE/Edge
                    }}
               >
                    {/* Logo */}
                    <div className="flex items-center gap-4 px-4">
                         <BiLayer className="text-2xl text-[#00D1FF]" />
                         <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00D1FF] to-[#FF0099] text-transparent bg-clip-text">
                              CrowdFuture
                         </h1>
                    </div>

                    {/* Menu Sections */}
                    {menuSections.map((section, idx) => (
                         <nav key={idx} className="flex flex-col gap-2">
                              <h2 className="text-xs uppercase text-white/40 px-4 mb-2">{section.title}</h2>

                              {section.items.map((item, itemIdx) => {
                                   const isActive = pathname === item.href;

                                   return (
                                        <Link
                                             key={itemIdx}
                                             href={item.href}
                                             className={`
                      flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300
                      text-white/70 hover:text-white hover:bg-[rgba(255,255,255,0.03)]
                      ${isActive ? 'bg-gradient-to-r from-[rgba(0,209,255,0.1)] to-[rgba(112,0,255,0.1)] border border-[rgba(255,255,255,0.1)] text-[#00D1FF]' : ''}
                    `}
                                        >
                                             <span className="text-xl">{item.icon}</span>
                                             <span>{item.label}</span>
                                        </Link>
                                   );
                              })}
                         </nav>
                    ))}

                    {/* User Profile */}
                    <div className="mt-auto p-4 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00D1FF] to-[#FF0099] flex items-center justify-center font-bold">
                              A
                         </div>
                         <div className="flex-1">
                              <h3 className="text-xs font-medium text-white">Admin Name</h3>
                              <p className="text-xs text-white/50">Super Admin</p>
                         </div>
                         <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                              <AiOutlineLogout className="text-white" />
                         </button>
                    </div>
               </aside>
          </div>
     );
};

export default Sidebar;
