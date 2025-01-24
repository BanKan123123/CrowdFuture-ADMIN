import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProjectResponse, ProjectsState } from './projects.interface';
import { getAllProject, acceptProject } from './thunks';
import { toast } from 'react-toastify';

const initialState: ProjectsState = {
     projects: {},
     status: 'idle',
     error: null,
     total: 1,
     currentPage: 1,
     limit: 10,
     message: '',
};

const ProjectsSlice = createSlice({
     name: 'projects',
     initialState,
     reducers: {
          setStatusIdle: (state: ProjectsState) => {
               state.status = 'idle';
          },
     },
     extraReducers(builder: any) {
          builder
               //Lấy toàn bộ Project
               .addCase(getAllProject.pending, (state: ProjectsState) => {
                    state.status = 'loading';
               })
               .addCase(getAllProject.fulfilled, (state: ProjectsState, { payload }: PayloadAction<any>) => {
                    state.status = 'succeeded';
                    state.projects = payload.data;
                    state.total = payload.total;
                    state.limit = payload.limit;
                    state.currentPage = payload.currentPage;
               })
               .addCase(getAllProject.rejected, (state: ProjectsState, { payload }: PayloadAction<ProjectResponse>) => {
                    state.status = 'failed';
               })
               //Check project
               .addCase(acceptProject.pending, (state: ProjectsState) => {
                    state.status = 'loading';
               })
               .addCase(acceptProject.fulfilled, (state: ProjectsState, { payload }: PayloadAction<any>) => {
                    state.status = 'succeeded';
                    toast.success(payload.message);
               })
               .addCase(acceptProject.rejected, (state: ProjectsState, { payload }: PayloadAction<any>) => {
                    state.status = 'failed';
                    toast.error(payload.message);
               });
     },
});

export const ProjectSAction = ProjectsSlice.actions;
const ProjectsReducer = ProjectsSlice.reducer;

export default ProjectsReducer;
