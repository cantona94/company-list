import { ICompany, IEmployee } from '@/shared/types';

export const getInputName = (
  stateInputList: ICompany | IEmployee,
  name: string
) => {
  if ('idCompany' in stateInputList) {
    return Object.keys(stateInputList).find(
      (el) => stateInputList[el as keyof typeof stateInputList] === name
    );
  } else {
    return Object.keys(stateInputList).find(
      (el) => stateInputList[el as keyof typeof stateInputList] === name
    );
  }
};
