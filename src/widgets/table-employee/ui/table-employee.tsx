import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddForm } from '@/features/add-form';
import { Employee } from '@/features/employee-row';
import { addEmployee, removeEmployee } from '@/entities/employee/model/slice';
import { changeChecked, changeCheckedAll } from '@/shared/lib';
import { formDataEmployee } from '@/shared/model/form-data';
import { IEmployee, IFormInput } from '@/shared/types';

interface IProps {
  employeeList: IEmployee[];
  companyId: string;
}

export const TableEmployee = ({ employeeList, companyId }: IProps) => {
  const dispatch = useDispatch();

  const [checkboxes, setCheckboxes] = useState<string[]>([]);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [updatedRow, setUpdatedRow] = useState<number | null>(null);
  const [formData, setFormData] = useState<IFormInput>(formDataEmployee);

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

  const addNewEmployee = () => {
    const newEmployee: IEmployee = {
      id: 0,
      idCompany: parseInt(companyId),
      lastName: formData['lastName'],
      firstName: formData['firstName'],
      position: formData['position'],
    };

    dispatch(addEmployee(newEmployee));
    setFormData(formDataEmployee);
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
      <AddForm
        formData={formData}
        setFormData={setFormData}
        titleForm={'Добавление сотрудника'}
        TextBtn={'Добавить сотрудника'}
        addNewItem={addNewEmployee}
      >
        <input
          className="my-2 py-1"
          placeholder="LastName"
          key="lastName"
          autoComplete="off"
        />
        <input
          className="my-2 py-1"
          placeholder="FirstName"
          key="firstName"
          autoComplete="off"
        />
        <input
          className="my-2 py-1"
          placeholder="position"
          key="position"
          autoComplete="off"
        />
      </AddForm>
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
                  className="checkbox__row"
                  checked={checkedAll}
                  onChange={handleChangeCheckedAll}
                  type="checkbox"
                  id="employeeAll"
                  name="employeeAll"
                />
              </th>
            </tr>
            <tr>
              <th className="checkbox__row" colSpan={2}>
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
                dataRow={employee}
                checkboxes={checkboxes}
                changeCheckboxes={changeCheckboxes}
                updatedRow={updatedRow}
                setUpdatedRow={setUpdatedRow}
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
