import { ChangeEvent, Dispatch } from 'react';
import { getInputName } from '../utils';
import { ICompany, IEmployee } from '../types';

interface IProps {
  stateStrCompany?: ICompany;
  stateStrEmployee?: IEmployee;
  setStateStrCompany?: Dispatch<React.SetStateAction<ICompany>>;
  setStateStrEmployee?: Dispatch<React.SetStateAction<IEmployee>>;
  title: string;
  isCurrentBeingUpdated: boolean;
}

export const InputStrTable = ({
  stateStrCompany,
  stateStrEmployee,
  setStateStrCompany,
  setStateStrEmployee,
  title,
  isCurrentBeingUpdated,
}: IProps) => {
  const getTitleKey = () => {
    if (stateStrEmployee && 'idCompany' in stateStrEmployee) {
      return getInputName(stateStrEmployee, title);
    } else if (stateStrCompany) {
      return getInputName(stateStrCompany, title);
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
        stateStrEmployee &&
        'idCompany' in stateStrEmployee &&
        setStateStrEmployee
      ) {
        setStateStrEmployee({ ...stateStrEmployee, [name]: e.target.value });
      } else if (name && stateStrCompany && setStateStrCompany) {
        setStateStrCompany({ ...stateStrCompany, [name]: e.target.value });
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
