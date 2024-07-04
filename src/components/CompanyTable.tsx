import { Dispatch, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Company } from '.';
import { ICompany } from '../types';
import { addCompany, removeCompany } from '../store/reducers/companySlice';
import { removeAllCompanyEmployees } from '../store/reducers/employeeSlice';
import { changeChecked, changeCheckedAll } from '../utils';

interface IProps {
  companyList: ICompany[];
  checkboxesCompany: string[];
  setCheckboxesCompany: Dispatch<React.SetStateAction<string[]>>;
}

export const CompanyTable = ({
  companyList,
  checkboxesCompany,
  setCheckboxesCompany,
}: IProps) => {
  const dispatch = useDispatch();

  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [updatedStr, setUpdatedStr] = useState<number | null>(null);
  const [inputCompanyName, setInputCompanyName] = useState<string>('');
  const [inputCompanyAddress, setInputCompanyAddress] = useState<string>('');

  const companyIdList = companyList.map((item) => {
    return item.id + 'company';
  });

  const handleChangeCheckedAll = () => {
    setCheckedAll((checkedAll) => !checkedAll);
  };

  const changeCheckboxes = (id: string) => {
    setCheckboxesCompany(
      checkboxesCompany.includes(id)
        ? checkboxesCompany.filter((el: string) => el !== id)
        : [...checkboxesCompany, id]
    );
  };

  const addNewCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let error = '';

    const clearInputs = () => {
      setInputCompanyName('');
      setInputCompanyAddress('');
    };

    if (Number(inputCompanyName) || Number(inputCompanyAddress)) {
      error = 'fields cannot be number';
      clearInputs();
    }

    if (!inputCompanyName || !inputCompanyAddress) {
      error = 'fields cannot be empty';
      clearInputs();
    }

    if (error) return alert(error);

    const newCompany: ICompany = {
      id: companyList[companyList.length - 1]?.id + 1 || 1,
      name: inputCompanyName,
      address: inputCompanyAddress,
    };

    dispatch(addCompany(newCompany));
    clearInputs();
  };

  const delCompany = () => {
    const companyId = checkboxesCompany.map((item) => {
      return parseInt(item);
    });
    dispatch(removeCompany(companyId));
    dispatch(removeAllCompanyEmployees(companyId));
    setCheckboxesCompany([]);
    setCheckedAll(false);
  };

  useEffect(() => {
    changeCheckedAll(
      checkboxesCompany,
      companyList,
      setCheckboxesCompany,
      checkedAll,
      companyIdList
    );
  }, [checkedAll]);

  useEffect(() => {
    changeChecked(checkboxesCompany, companyList, setCheckedAll);
  }, [checkboxesCompany]);

  return (
    <div>
      <form className="flex flex-col w-[584px]" onSubmit={addNewCompany}>
        <h3 className="text-center">Добавление компании</h3>
        <input
          value={inputCompanyName}
          onChange={(e) => setInputCompanyName(e.target.value)}
          className="my-2 py-1"
          placeholder="Name"
          name="companyName"
          autoComplete="off"
        />
        <input
          value={inputCompanyAddress}
          onChange={(e) => setInputCompanyAddress(e.target.value)}
          className="my-2 py-1"
          placeholder="Address"
          name="companyAddress"
          autoComplete="off"
        />
        <button className="button_add" type="submit">
          Добавить компанию
        </button>
      </form>
      <button
        onClick={delCompany}
        className={`button_del mb-14 ${
          checkboxesCompany.length ? 'visible' : 'invisible'
        }`}
      >
        Удалить выбранные компании
      </button>
      {companyList.length ? (
        <table>
          <thead>
            <tr>
              <th colSpan={2} className="text-start">
                Компании
              </th>
              <th colSpan={2} className="text-end pr-2">
                Выделить всё
                <input
                  className="checkbox__str"
                  checked={checkedAll}
                  onChange={handleChangeCheckedAll}
                  type="checkbox"
                  id="companyAll"
                  name="companyAll"
                />
              </th>
            </tr>
            <tr>
              <th colSpan={2}>Name</th>
              <th>The number of employees</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {companyList.map((company) => (
              <Company
                key={company.id}
                dataStr={company}
                checkboxes={checkboxesCompany}
                changeCheckboxes={changeCheckboxes}
                updatedStr={updatedStr}
                setUpdatedStr={setUpdatedStr}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-center text-2xl">Компании отсутствуют</h2>
      )}
    </div>
  );
};
