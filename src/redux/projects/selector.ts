import { RootState } from '../store';

export const ProjectSelector = {
     projects: (state: RootState) => state.projects.projects,
     status: (state: RootState) => state.projects.status,
     total: (state: RootState) => state.projects.total,
     limit: (state: RootState) => state.projects.limit,
     currentPage: (state: RootState) => state.projects.currentPage,
};
