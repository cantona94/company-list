import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '@/entities/employee/model/slice';
import { IEmployee, ITableRow } from '@/shared/types';
import IconRename from '@/shared/assets/IconRename.svg';
import IconCheckMark from '@/shared/assets/IconCheckMark.svg';
import { TableRowInput } from '@/shared/table-row-input';

export const Employee = ({
  dataRow,
  checkboxes,
  changeCheckboxes,
  updatedRow,
  setUpdatedRow,
}: ITableRow) => {
  const isCurrentBeingUpdated = updatedRow === dataRow.id;
  const [stateRow, setStateRow] = useState<IEmployee>(dataRow as IEmployee);
  const dispatch = useDispatch();

  const handleSaveOrEdit = () => {
    setUpdatedRow(isCurrentBeingUpdated ? null : dataRow.id);
    dispatch(updateEmployee(stateRow));
  };

  return (
    <tr
      className={`h-15 ${
        checkboxes.includes(dataRow.id + 'employee') ? 'bg-green-100' : null
      }`}
    >
      <td className="checkbox__row">
        <input
          className="checkbox__row"
          checked={checkboxes.includes(dataRow.id + 'employee')}
          onChange={(event) => changeCheckboxes(event.target.id)}
          type="checkbox"
          id={dataRow.id + 'employee'}
          name="employee"
        />
      </td>
      <td>
        <TableRowInput
          stateRowEmployee={stateRow}
          title={stateRow.lastName}
          setStateRowEmployee={setStateRow}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td>
        <TableRowInput
          stateRowEmployee={stateRow}
          title={stateRow.firstName}
          setStateRowEmployee={setStateRow}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td>
        <TableRowInput
          stateRowEmployee={stateRow}
          title={stateRow.position}
          setStateRowEmployee={setStateRow}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td className="checkbox__row">
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
