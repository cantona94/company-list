import { ICompany, IEmployee } from '@/shared/types';

export const changeCheckedAll = (
  checkboxes: string[],
  rowList: ICompany[] | IEmployee[],
  setCheckboxes: (value: string[]) => void,
  checkedAll: boolean,
  idList: string[]
) => {
  const delOneFromAll =
    checkboxes.length === rowList.length - 1 && rowList.length !== 1;
  const checkboxesCopy: string[] = [...checkboxes];

  checkedAll ? setCheckboxes(idList) : setCheckboxes([]);

  if (delOneFromAll) {
    setCheckboxes(checkboxesCopy);
  }
};
