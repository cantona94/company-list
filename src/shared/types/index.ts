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

export interface ITableRow {
  dataRow: ICompany | IEmployee;
  checkboxes: string[];
  changeCheckboxes: (id: string) => void;
  updatedRow: number | null;
  setUpdatedRow: (id: number | null) => void;
}

export interface IFormInput {
  [key: string]: string;
}
