export interface ProjectsState {
     projects: any;
     status: 'idle' | 'loading' | 'succeeded' | 'failed';
     error?: any;
     total: number;
     limit: number;
     currentPage: number;
     message?: string;
}

export interface ProjectsRequest {
     page?: number;
     limit?: number;
     name?: string;
     userId?: string;
     category?: string;
     fundGoalFrom?: number;
     fundGoalTo?: number;
     status?: string;
}

export interface ActionRequest {
     id: any;
     status: 'active' | 'rejected';
     rejectionReason?: string;
}

export interface ProjectResponse {}
