import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './auth/slice';
import AppReducer from './app/AppSlice';
import ProjectsReducer from './projects/slice';

export const rootReducer = combineReducers({
     app: AppReducer,
     auth: AuthReducer,
     projects: ProjectsReducer,
});
