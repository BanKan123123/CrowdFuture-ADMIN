export interface Project {
     businessPlan: string;
     category: any;
     createdAt: any;
     description: string;
     documents: Document[];
     fundAchieve: number;
     fundDuration: number;
     fundGoal: number;
     fundUsage: string;
     images: any;
     likes: any;
     name: string;
     slug: string;
     teamMembers: any;
     timeline: any;
     updatedAt: string;
     userId: string;
     _id: string;
     status: 'approved' | 'pending' | 'rejected';
}

export type Status = 'active' | 'pending' | 'rejected';
