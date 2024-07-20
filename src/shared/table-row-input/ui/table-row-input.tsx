import { ChangeEvent, Dispatch } from 'react';
import { getInputName } from '@/shared/lib';
import { ICompany, IEmployee } from '@/shared/types';

interface IProps {
  stateRowCompany?: ICompany;
  stateRowEmployee?: IEmployee;
  setStateRowCompany?: Dispatch<React.SetStateAction<ICompany>>;
  setStateRowEmployee?: Dispatch<React.SetStateAction<IEmployee>>;
  title: string;
  isCurrentBeingUpdated: boolean;
}

export const TableRowInput = ({
  stateRowCompany,
  stateRowEmployee,
  setStateRowCompany,
  setStateRowEmployee,
  title,
  isCurrentBeingUpdated,
}: IProps) => {
  const getTitleKey = () => {
    if (stateRowEmployee && 'idCompany' in stateRowEmployee) {
      return getInputName(stateRowEmployee, title);
    } else if (stateRowCompany) {
      return getInputName(stateRowCompany, title);
    }
  };

  const handleInputChange =
    (name: string | undefined) => (e: ChangeEvent<HTMLInputElement>) => {
      let error = '';
      if (!e.target.value) {
        error = 'fields cannot be empty';
      }
      if (error) return alert(error);

      if (
        name &&
        stateRowEmployee &&
        'idCompany' in stateRowEmployee &&
        setStateRowEmployee
      ) {
        setStateRowEmployee({ ...stateRowEmployee, [name]: e.target.value });
      } else if (name && stateRowCompany && setStateRowCompany) {
        setStateRowCompany({ ...stateRowCompany, [name]: e.target.value });
      }
    };

  return isCurrentBeingUpdated ? (
    <input
      className="table__input"
      value={title}
      onChange={handleInputChange(getTitleKey())}
    />
  ) : (
    title
  );
};
