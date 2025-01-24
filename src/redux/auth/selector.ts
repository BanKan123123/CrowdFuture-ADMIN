import { RootState } from '../store';

export const AuthSeletor = {
     admin: (state: RootState) => state.auth.admin,
     status: (state: RootState) => state.auth.status,
};
