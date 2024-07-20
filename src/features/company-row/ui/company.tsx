import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/app-store';
import { updateCompany } from '@/entities/company/model/slice';
import { ICompany, ITableRow } from '@/shared/types';
import { TableRowInput } from '@/shared/table-row-input';
import IconRename from '@/shared/assets/IconRename.svg';
import IconCheckMark from '@/shared/assets/IconCheckMark.svg';

export const Company = ({
  dataRow,
  checkboxes,
  changeCheckboxes,
  updatedRow,
  setUpdatedRow,
}: ITableRow) => {
  const employeeCount: number = useSelector(
    (state: RootState) =>
      state.employee.employeeList.filter(
        (item) => item.idCompany === dataRow.id
      ).length
  );
  const [stateRow, setStateRow] = useState<ICompany>(dataRow as ICompany);
  const dispatch = useDispatch();
  const isCurrentBeingUpdated = updatedRow === dataRow.id;

  const handleSaveOrEdit = () => {
    setUpdatedRow(isCurrentBeingUpdated ? null : dataRow.id);
    dispatch(updateCompany(stateRow));
  };

  return (
    <tr
      className={`h-15 ${
        checkboxes.includes(dataRow.id + 'company') ? 'bg-green-100' : null
      }`}
    >
      <td className="checkbox__row">
        <input
          className="checkbox__row"
          checked={checkboxes.includes(dataRow.id + 'company')}
          onChange={(event) => changeCheckboxes(event.target.id)}
          type="checkbox"
          id={dataRow.id + 'company'}
          name="company"
        />
      </td>
      <td>
        <TableRowInput
          stateRowCompany={stateRow}
          title={stateRow.name}
          setStateRowCompany={setStateRow}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td>{employeeCount}</td>
      <td>
        <TableRowInput
          stateRowCompany={stateRow}
          title={stateRow.address}
          setStateRowCompany={setStateRow}
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
