'use client';

import React from 'react';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { acceptProject } from '@/redux/projects/thunks';
import { useAppDispatch } from '@/core/hook';
import { useParams } from 'next/navigation';

const ProjectDetailPage = () => {
     const dispatch = useAppDispatch();
     const params = useParams();

     const [rejectReason, setRejectReason] = useState<string>('');

     const handleAcceptProject = () => {
          dispatch(acceptProject({ id: params.slug, status: 'active' }));
     };

     const handleRejectProject = () => {
          dispatch(acceptProject({ id: params.slug, status: 'active', rejectionReason: rejectReason }));
     };

     return (
          <div>
               <Button onClick={handleAcceptProject}>Accept</Button>
               <Button onClick={handleRejectProject}>Reject</Button>
               <Input value={rejectReason} onChange={(e: any) => setRejectReason(e.target.value)} />
          </div>
     );
};

export default ProjectDetailPage;
