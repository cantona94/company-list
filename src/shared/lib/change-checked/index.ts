import { ICompany, IEmployee } from '@/shared/types';

export const changeChecked = (
  checkboxes: string[],
  rowList: ICompany[] | IEmployee[],
  setCheckedAll: (value: boolean) => void
) => {
  checkboxes.length === rowList.length && rowList.length
    ? setCheckedAll(true)
    : setCheckedAll(false);
};
