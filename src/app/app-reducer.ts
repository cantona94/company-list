import { combineReducers } from '@reduxjs/toolkit';
import companySlice from '@/entities/company/model/slice';
import employeeSlice from '@/entities/employee/model/slice';

export const rootReducer = combineReducers({
  company: companySlice,
  employee: employeeSlice,
});
