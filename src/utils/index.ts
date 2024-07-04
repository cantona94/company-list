import { ICompany, IEmployee } from '../types';

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

export const changeCheckedAll = (
  checkboxes: string[],
  strList: ICompany[] | IEmployee[],
  setCheckboxes: (value: string[]) => void,
  checkedAll: boolean,
  idList: string[]
) => {
  const delOneFromAll =
    checkboxes.length === strList.length - 1 && strList.length !== 1;
  const checkboxesCopy: string[] = [...checkboxes];

  checkedAll ? setCheckboxes(idList) : setCheckboxes([]);

  if (delOneFromAll) {
    setCheckboxes(checkboxesCopy);
  }
};

export const changeChecked = (
  checkboxes: string[],
  strList: ICompany[] | IEmployee[],
  setCheckedAll: (value: boolean) => void
) => {
  checkboxes.length === strList.length && strList.length
    ? setCheckedAll(true)
    : setCheckedAll(false);
};
