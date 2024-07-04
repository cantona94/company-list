import { configureStore } from '@reduxjs/toolkit';
import companySlice from './reducers/companySlice';
import employeeSlice from './reducers/employeeSlice';

export const store = configureStore({
  reducer: {
    company: companySlice,
    employee: employeeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
