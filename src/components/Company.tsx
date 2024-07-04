import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from '../store';
import { ICompany, ITableStr } from '../types';
import { updateCompany } from '../store/reducers/companySlice';
import { InputStrTable } from '.';
import IconRename from '../assets/IconRename.svg';
import IconCheckMark from '../assets/IconCheckMark.svg';

export const Company = ({
  dataStr,
  checkboxes,
  changeCheckboxes,
  updatedStr,
  setUpdatedStr,
}: ITableStr) => {
  const employeeCount: number = useSelector(
    (state: RootState) =>
      state.employee.employeeList.filter(
        (item) => item.idCompany === dataStr.id
      ).length
  );
  const [stateStr, setStateStr] = useState<ICompany>(dataStr as ICompany);
  const dispatch = useDispatch();
  const isCurrentBeingUpdated = updatedStr === dataStr.id;

  const handleSaveOrEdit = () => {
    setUpdatedStr(isCurrentBeingUpdated ? null : dataStr.id);
    dispatch(updateCompany(stateStr));
  };

  return (
    <tr
      className={`h-15 ${
        checkboxes.includes(dataStr.id + 'company') ? 'bg-green-100' : null
      }`}
    >
      <td className="checkbox__str">
        <input
          className="checkbox__str"
          checked={checkboxes.includes(dataStr.id + 'company')}
          onChange={(event) => changeCheckboxes(event.target.id)}
          type="checkbox"
          id={dataStr.id + 'company'}
          name="company"
        />
      </td>
      <td>
        <InputStrTable
          stateStrCompany={stateStr}
          title={stateStr.name}
          setStateStrCompany={setStateStr}
          isCurrentBeingUpdated={isCurrentBeingUpdated}
        />
      </td>
      <td>{employeeCount}</td>
      <td>
        <InputStrTable
          stateStrCompany={stateStr}
          title={stateStr.address}
          setStateStrCompany={setStateStr}
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
