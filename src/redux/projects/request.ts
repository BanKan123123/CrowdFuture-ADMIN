import MSTFetch from '@/core/fetch';
import qs from 'qs';
import { ProjectsRequest, ActionRequest } from './projects.interface';

export const ProjectRequest = {
     getAllProject(body: ProjectsRequest) {
          return MSTFetch.get(`/projects/list?${qs.stringify(body)}`);
     },

     acceptProject({ id, status, rejectionReason }: ActionRequest) {
          console.log(id, status, rejectionReason);
          return MSTFetch.patch(`/projects/confirm/${id}`, { status, rejectionReason });
     },
};
