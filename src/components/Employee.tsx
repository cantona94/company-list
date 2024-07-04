import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IEmployee, ITableStr } from '../types';
import { updateEmployee } from '../store/reducers/employeeSlice';
import { InputStrTable } from '.';
import IconRename from '../assets/IconRename.svg';
import IconCheckMark from '../assets/IconCheckMark.svg';

export const Employee = ({
  dataStr,
  checkboxes,
  changeCheckboxes,
  updatedStr,
  setUpdatedStr,
}: ITableStr) => {
  const isCurrentBeingUpdated = updatedStr === dataStr.id;
  const [stateStr, setStateStr] = useState<IEmployee>(dataStr as IEmployee);
  const dispatch = useDispatch();

  const handleSaveOrEdit = () => {
    setUpdatedStr(isCurrentBeingUpdated ? null : dataStr.id);
    dispatch(updateEmployee(stateStr));
  };

  return (
    <tr
      className={`h-15 ${
        checkboxes.includes(dataStr.id + 'employee') ? 'bg-green-100' : null
      }`}
    >
      <td className="checkbox__str">
        <input
          className="checkbox__str"
          checked={checkboxes.includes(dataStr.id + 'employee')}
          onChange={(event) => changeCheckboxes(event.target.id)}
          type="checkbox"
          id={dataStr.id + 'employee'}
          name="employee"
        />
      </td>
      <td>
        <InputStrTable
          stateStrEmployee={stateStr}
          title={stateStr.lastName}
          setStateStrEmployee={setStateStr}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td>
        <InputStrTable
          stateStrEmployee={stateStr}
          title={stateStr.firstName}
          setStateStrEmployee={setStateStr}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td>
        <InputStrTable
          stateStrEmployee={stateStr}
          title={stateStr.position}
          setStateStrEmployee={setStateStr}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td className="checkbox__str">
        <button onClick={handleSaveOrEdit}>
          {isCurrentBeingUpdated ? (
            <img src={IconCheckMark} alt="Check Mark" />
          ) : (
            <img src={IconRename} alt="Rename" />
          )}
        </button>
      </td>
    </tr>
  );
};
