import { Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/app-store';
import { AddForm } from '@/features/add-form';
import { Company } from '@/features/company-row';
import { addCompany, removeCompany } from '@/entities/company/model/slice';
import { removeAllCompanyEmployees } from '@/entities/employee/model/slice';
import { ICompany, IFormInput } from '@/shared/types';
import { formDataCompany } from '@/shared/model/form-data';
import { changeChecked, changeCheckedAll } from '@/shared/lib';

interface IProps {
  companyList: ICompany[];
  checkboxesCompany: string[];
  setCheckboxesCompany: Dispatch<React.SetStateAction<string[]>>;
}

export const CompanyBlog = ({
  companyList,
  checkboxesCompany,
  setCheckboxesCompany,
}: IProps) => {
  const dispatch = useDispatch();

  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [updatedRow, setUpdatedRow] = useState<number | null>(null);
  const [formData, setFormData] = useState<IFormInput>(formDataCompany);
  const companyListAll: ICompany[] = useSelector(
    (state: RootState) => state.company.companyList
  );

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

  const addNewCompany = () => {
    const newCompany: ICompany = {
      id: companyListAll[companyListAll.length - 1]?.id + 1 || 1,
      name: formData['name'],
      address: formData['address'],
    };

    dispatch(addCompany(newCompany));
    setFormData(formDataCompany);
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
      <AddForm
        formData={formData}
        setFormData={setFormData}
        titleForm={'Добавление компании'}
        TextBtn={'Добавить компанию'}
        addNewItem={addNewCompany}
      >
        <input
          className="my-2 py-1"
          placeholder="Name"
          key="name"
          autoComplete="off"
        />
        <input
          className="my-2 py-1"
          placeholder="Address"
          key="address"
          autoComplete="off"
        />
      </AddForm>
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
                  className="checkbox__row"
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
                dataRow={company}
                checkboxes={checkboxesCompany}
                changeCheckboxes={changeCheckboxes}
                updatedRow={updatedRow}
                setUpdatedRow={setUpdatedRow}
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
