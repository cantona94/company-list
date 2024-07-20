import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IEmployee } from '@/shared/types';
import { employeeList } from '../config';

const initialState = {
  employeeList,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<IEmployee>) => {
      const newEmployee: IEmployee = action.payload;
      const idEmployee: number =
        state.employeeList[state.employeeList.length - 1]?.id + 1 || 1;

      newEmployee.id = idEmployee;
      state.employeeList.push(newEmployee);
    },
    updateEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.employeeList.splice(
        state.employeeList.findIndex((el) => el.id === action.payload.id),
        1,
        action.payload
      );
    },
    removeEmployee: (state, action: PayloadAction<number[]>) => {
      const itemId: number[] = action.payload;
      state.employeeList = state.employeeList.filter((item) => {
        return !itemId.includes(item.id);
      });
    },
    removeAllCompanyEmployees: (state, action: PayloadAction<number[]>) => {
      const companyId: number[] = action.payload;
      state.employeeList = state.employeeList.filter((item) => {
        return !companyId.includes(item.idCompany);
      });
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  removeEmployee,
  removeAllCompanyEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
