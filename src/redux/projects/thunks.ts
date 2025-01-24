import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProjectRequest } from './request';
import { ProjectsRequest, ProjectResponse, ActionRequest } from './projects.interface';
import { toast } from 'react-toastify';

export const getAllProject = createAsyncThunk<ProjectResponse, ProjectsRequest>(
     'project',
     async (credentials, { rejectWithValue }) => {
          try {
               const response = await ProjectRequest.getAllProject(credentials);
               return response.data;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);

export const acceptProject = createAsyncThunk<any, ActionRequest>(
     'project-check',
     async (credentials, { rejectWithValue }) => {
          try {
               const { id, status, rejectionReason } = credentials;
               const response = await ProjectRequest.acceptProject({ id, status, rejectionReason });
               return response;
          } catch (error: any) {
               toast.error(error.response.data.message);
               return rejectWithValue(error.response.data.message);
          }
     },
);
