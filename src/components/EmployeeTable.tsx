import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IEmployee } from '../types';
import { Employee } from '.';
import { addEmployee, removeEmployee } from '../store/reducers/employeeSlice';
import { changeChecked, changeCheckedAll } from '../utils';

interface IProps {
  employeeList: IEmployee[];
  companyId: string;
}

export const EmployeeTable = ({ employeeList, companyId }: IProps) => {
  const dispatch = useDispatch();

  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [updatedItem, setUpdatedItem] = useState<number | null>(null);
  const [inputEmployeeLastName, setInputEmployeeLastName] =
    useState<string>('');
  const [inputEmployeeFirstName, setInputEmployeeFirstName] =
    useState<string>('');
  const [inputEmployeePosition, setInputEmployeePosition] =
    useState<string>('');

  const employeeIdList = employeeList.map((item) => {
    return item.id + 'employee';
  });

  const handleChangeCheckedAll = () => {
    setCheckedAll((checkedAll) => !checkedAll);
  };

  const changeCheckboxes = (id: string) => {
    setCheckboxes(
      checkboxes.includes(id)
        ? checkboxes.filter((el: string) => el !== id)
        : [...checkboxes, id]
    );
  };

  const addNewEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let error = '';

    const clearInputs = () => {
      setInputEmployeeLastName('');
      setInputEmployeeFirstName('');
      setInputEmployeePosition('');
    };

    if (
      Number(inputEmployeeLastName) ||
      Number(inputEmployeeFirstName) ||
      Number(inputEmployeePosition)
    ) {
      error = 'fields cannot be number';
      clearInputs();
    }

    if (
      !inputEmployeeLastName ||
      !inputEmployeeFirstName ||
      !inputEmployeePosition
    ) {
      error = 'fields cannot be empty';
      clearInputs();
    }

    if (error) return alert(error);

    const newEmployee: IEmployee = {
      id: 0,
      idCompany: parseInt(companyId),
      lastName: inputEmployeeLastName,
      firstName: inputEmployeeFirstName,
      position: inputEmployeePosition,
    };

    dispatch(addEmployee(newEmployee));
    clearInputs();
  };

  const delEmployee = () => {
    const employeeId = checkboxes.map((item) => {
      return parseInt(item);
    });
    dispatch(removeEmployee(employeeId));
    setCheckboxes([]);
    setCheckedAll(false);
  };

  useEffect(() => {
    changeCheckedAll(
      checkboxes,
      employeeList,
      setCheckboxes,
      checkedAll,
      employeeIdList
    );
  }, [checkedAll]);

  useEffect(() => {
    changeChecked(checkboxes, employeeList, setCheckedAll);
  }, [checkboxes]);

  return (
    <div>
      <form className="flex flex-col w-[584px]" onSubmit={addNewEmployee}>
        <h3 className="text-center">Добавление сотрудника</h3>
        <input
          value={inputEmployeeLastName}
          onChange={(e) => setInputEmployeeLastName(e.target.value)}
          className="my-2 py-1"
          name="employeeLastName"
          placeholder="LastName"
          autoComplete="off"
        />
        <input
          value={inputEmployeeFirstName}
          onChange={(e) => setInputEmployeeFirstName(e.target.value)}
          className="my-2 py-1"
          name="employeeFirstName"
          placeholder="FirstName"
          autoComplete="off"
        />
        <input
          value={inputEmployeePosition}
          onChange={(e) => setInputEmployeePosition(e.target.value)}
          className="my-2 py-1"
          name="employeePosition"
          placeholder="Position"
          autoComplete="off"
        />
        <button className="button_add" type="submit">
          Добавить сотрудника
        </button>
      </form>
      <button
        onClick={delEmployee}
        className={`button_del ${checkboxes.length ? 'visible' : 'invisible'}`}
      >
        Удалить выбранных сотрудников
      </button>
      {employeeList.length ? (
        <table>
          <thead>
            <tr>
              <th colSpan={2} className="text-start">
                Сотрудники
              </th>
              <th colSpan={2} className="text-end pr-2">
                Выделить всё
                <input
                  className="checkbox__str"
                  checked={checkedAll}
                  onChange={handleChangeCheckedAll}
                  type="checkbox"
                  id="employeeAll"
                  name="employeeAll"
                />
              </th>
            </tr>
            <tr>
              <th className="checkbox__str" colSpan={2}>
                LastName
              </th>
              <th>FirstName</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((employee) => (
              <Employee
                key={employee.id}
                dataStr={employee}
                checkboxes={checkboxes}
                changeCheckboxes={changeCheckboxes}
                updatedStr={updatedItem}
                setUpdatedStr={setUpdatedItem}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-center text-2xl">
          У данной компании нет сотрудников!
        </h2>
      )}
    </div>
  );
};
