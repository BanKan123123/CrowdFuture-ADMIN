'use client';

import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { Button, Dropdown, Input, Progress, Table, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import StatusComponent from './Status';
import _ from 'lodash';

import {
     ClockCircleOutlined,
     CheckCircleOutlined,
     EyeOutlined,
     CloseCircleOutlined,
     EditOutlined,
     DeleteOutlined,
     SearchOutlined,
     FilterOutlined,
     CalendarOutlined,
     SortDescendingOutlined,
     FileExcelOutlined,
     PlusOutlined,
} from '@ant-design/icons';
import { Project, Status } from '@/interface/projects.interface';
import { ConfigProvider } from 'antd';
import { useAppSelector, useAppDispatch } from '@/core/hook';
import { ProjectSelector } from '@/redux/projects/selector';
import { getAllProject } from '@/redux/projects/thunks';
import { getRandomColor } from '@/utils/units';
import { AppAction } from '@/redux/app/AppSlice';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { ProjectSAction } from '@/redux/projects/slice';

const ProjectsPage = () => {
     const dispatch = useAppDispatch();
     const route = useRouter();

     const projects = useAppSelector(ProjectSelector.projects);
     const status = useAppSelector(ProjectSelector.status);
     const total = useAppSelector(ProjectSelector.total);
     const limit = useAppSelector(ProjectSelector.limit);
     const currentPage = useAppSelector(ProjectSelector.currentPage);

     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
     const [listProjects, setListProjects] = useState(projects);

     useEffect(() => {
          dispatch(getAllProject({ page: 1, limit: 10 }));

          return () => {
               dispatch(ProjectSAction.setStatusIdle());
          };
     }, []);

     useEffect(() => {
          switch (status) {
               case 'loading':
                    dispatch(AppAction.showLoading());
                    break;
               case 'succeeded':
                    setListProjects(projects);
                    dispatch(AppAction.hiddenLoading());
                    break;
               default:
                    break;
          }

          console.log({ listProjects });
     }, [projects]);

     const formatter = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
     });

     const getDaysLeft = (duration: number) => {
          const now = moment();
          const endDate = now.clone().add(duration, 'days');
          return endDate.diff(now, 'days');
     };

     const handleChangePage = (page: any, pageSize: any) => {
          dispatch(getAllProject({ page: page, limit: pageSize }));
     };

     const columns = useMemo(() => {
          return [
               {
                    title: 'Tên dự án',
                    dataIndex: 'name',
                    key: 'name',
                    render: (text, record: Project) => (
                         <div className="w-36">
                              <div className="font-medium">{text}</div>
                              <div className="text-sm text-gray-400">#{record._id}</div>
                         </div>
                    ),
               },
               {
                    title: 'Chủ dự án',
                    key: 'company',
                    render: (record: Project) => (
                         <div className="flex items-center gap-2">
                              {/* <div
                                   style={{ backgroundColor: getRandomColor() }}
                                   className={`w-8 h-8 rounded-full flex items-center justify-center text-white`}
                              >
                                   {record.teamMembers[0].name.charAt(0).toUpperCase()}
                              </div> */}
                              <Avatar
                                   shape="circle"
                                   style={{
                                        backgroundColor: getRandomColor(),
                                        width: '40px',
                                        height: '40px',
                                        lineHeight: '40px',
                                   }}
                                   size={40}
                              >
                                   {record.teamMembers[0].name.charAt(0).toUpperCase()}
                              </Avatar>
                              <div>
                                   <div>{record.teamMembers[0].name}</div>
                                   <div className="text-sm text-gray-400">{record.teamMembers[0].contact.email}</div>
                              </div>
                         </div>
                    ),
               },
               {
                    title: 'Số tiền kêu gọi',
                    key: 'amount',
                    render: (record: Project) => <div>{formatter.format(record.fundGoal)}</div>,
               },
               {
                    title: 'Tiến độ',
                    key: 'progress',
                    render: (record) => (
                         <div className="w-40">
                              <Progress
                                   percent={record.fundAchieve / record.fundGoal}
                                   size="small"
                                   strokeColor={{
                                        '0%': '#00D1FF',
                                        '100%': '#FF0099',
                                   }}
                              />
                              <div className="text-sm text-gray-400 mt-1">
                                   {record.fundAchieve / record.fundGoal}% ({record.fundAchieve}/10 Tỷ)
                              </div>
                         </div>
                    ),
               },
               {
                    title: 'Thời gian',
                    dataIndex: 'createdAt',
                    key: 'date',
                    render: (date, record: Project) => (
                         <div>
                              <div>
                                   {record.createdAt &&
                                        new Intl.DateTimeFormat('vi-VN').format(new Date(record.createdAt))}
                              </div>
                              <div className="text-sm text-gray-400">
                                   {getDaysLeft(record.fundDuration)} ngày còn lại
                              </div>
                         </div>
                    ),
               },
               {
                    title: 'Trạng thái',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status: Status) => {
                         const statusConfig = {
                              active: {
                                   color: 'success',
                                   icon: <CheckCircleOutlined />,
                                   text: 'Đã duyệt',
                                   className:
                                        'px-3 py-1 rounded-full text-[0.85rem] inline-flex items-center gap-2 bg-[rgba(40,199,111,0.1)] text-[#28c76f] border border-[rgba(40,199,111,0.2)]',
                              },
                              pending: {
                                   color: 'warning',
                                   icon: <ClockCircleOutlined />,
                                   text: 'Chờ duyệt',
                                   className:
                                        'px-3 py-1 rounded-full text-[0.85rem] inline-flex items-center gap-2 bg-[rgba(255,193,7,0.1)] text-[#ffc107] border border-[rgba(255,193,7,0.2)]',
                              },
                              rejected: {
                                   color: 'error',
                                   icon: <CloseCircleOutlined />,
                                   text: 'Từ chối',
                                   className:
                                        'px-3 py-1 rounded-full text-[0.85rem] inline-flex items-center gap-2 bg-[rgba(234,84,85,0.1)] text-[#ea5455] border border-[rgba(234,84,85,0.2)]',
                              },
                         };

                         const config = statusConfig[status];
                         return <StatusComponent icon={config.icon} text={config.text} className={config.className} />;
                    },
               },
               {
                    title: 'Actions',
                    key: 'actions',
                    render: (record) => (
                         <div className="flex gap-2">
                              <Button
                                   type="text"
                                   icon={<EyeOutlined className="text-[#00D1FF]" />}
                                   className="text-primary hover:text-primary-dark"
                                   onClick={() => route.push(`/projects/${record._id}`)}
                              />
                              <Button
                                   type="text"
                                   icon={<EditOutlined className="text-[#00D1FF]" />}
                                   className="text-primary hover:text-primary-dark"
                              />
                              <Button
                                   type="text"
                                   icon={<DeleteOutlined className="text-[#00D1FF]" />}
                                   className="text-primary hover:text-primary-dark"
                              />
                         </div>
                    ),
               },
          ] as ColumnsType<Project>;
     }, [listProjects]);

     return (
          <div className="min-h-screen p-8">
               {/* Header */}
               <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                         Quản lý Dự án
                    </h1>
                    <Button type="primary" icon={<PlusOutlined />} className="bg-gradient-to-r from-primary to-accent">
                         Thêm Dự án
                    </Button>
               </div>

               {/* Filter Bar */}
               <div className="bg-glass-bg bg-transparent backdrop-blur-xl border border-glass-border rounded-2xl p-6 mb-8">
                    <div className="flex gap-4 items-center">
                         <ConfigProvider
                              theme={{
                                   components: {
                                        Input: {
                                             hoverBg: 'transparent',
                                             colorBgContainer: 'rgba(255,255,255,0.01)',
                                             colorTextPlaceholder: '#FFFFFF',
                                             colorIcon: '#FFFFFF',
                                        },
                                   },
                              }}
                         >
                              <Input
                                   prefix={<SearchOutlined />}
                                   placeholder="Tìm kiếm dự án..."
                                   className="w-72 bg-transparent text-white"
                              />
                         </ConfigProvider>

                         <Dropdown menu={{ items: [] }}>
                              <Button className="bg-transparent text-white" icon={<FilterOutlined />}>
                                   Trạng thái
                              </Button>
                         </Dropdown>

                         <Dropdown menu={{ items: [] }}>
                              <Button className="bg-transparent text-white" icon={<CalendarOutlined />}>
                                   Thời gian
                              </Button>
                         </Dropdown>

                         <Dropdown menu={{ items: [] }}>
                              <Button className="bg-transparent text-white" icon={<SortDescendingOutlined />}>
                                   Sắp xếp
                              </Button>
                         </Dropdown>

                         <Button className="bg-transparent text-white ml-auto" icon={<FileExcelOutlined />}>
                              Xuất Excel
                         </Button>
                    </div>
               </div>

               {/* Projects Table */}
               {!_.isEmpty(listProjects) && (
                    <ConfigProvider
                         theme={{
                              components: {
                                   Table: {
                                        /* here is your component tokens */
                                        colorBgContainer: 'transparent',
                                        colorText: 'white',
                                        colorTextHeading: 'white',
                                        headerBg: 'rgba(255,255,255,0.05)',
                                        rowHoverBg: 'rgba(255,255,255,0.01)',
                                        rowSelectedBg: 'rgba(255,255,255,0.05)',
                                        rowSelectedHoverBg: 'rgba(255,255,255,0.05)',
                                   },
                              },
                         }}
                    >
                         <Table
                              columns={columns}
                              dataSource={listProjects}
                              // rowSelection={{
                              //      selectedRowKeys,
                              //      onChange: setSelectedRowKeys,
                              // }}
                              className="bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl"
                              pagination={{
                                   total: total,
                                   pageSize: limit,
                                   showSizeChanger: true,
                                   showTotal: (total, range) => {
                                        console.log({ total, range });
                                        return (
                                             <div className="text-white">{`Hiển thị 1-${limit} của ${total} dự án`}</div>
                                        );
                                   },
                                   onChange: handleChangePage,
                              }}
                         />
                    </ConfigProvider>
               )}
          </div>
     );
};

export default ProjectsPage;
