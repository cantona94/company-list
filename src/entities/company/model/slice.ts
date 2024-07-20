import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICompany } from '@/shared/types';
import { companyList } from '../config';

const initialState = {
  companyList,
};

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany: (state, action: PayloadAction<ICompany>) => {
      state.companyList.push(action.payload);
    },
    updateCompany: (state, action: PayloadAction<ICompany>) => {
      state.companyList.splice(
        state.companyList.findIndex((el) => el.id === action.payload.id),
        1,
        action.payload
      );
    },
    removeCompany: (state, action: PayloadAction<number[]>) => {
      const itemId: number[] = action.payload;
      state.companyList = state.companyList.filter((item) => {
        return !itemId.includes(item.id);
      });
    },
  },
});

export const { addCompany, updateCompany, removeCompany } =
  companySlice.actions;

export default companySlice.reducer;
