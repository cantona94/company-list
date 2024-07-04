export interface ICompany {
  id: number;
  name: string;
  address: string;
}

export interface IEmployee {
  id: number;
  idCompany: number;
  lastName: string;
  firstName: string;
  position: string;
}

export interface ITableStr {
  dataStr: ICompany | IEmployee;
  checkboxes: string[];
  changeCheckboxes: (id: string) => void;
  updatedStr: number | null;
  setUpdatedStr: (id: number | null) => void;
}
