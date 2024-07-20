import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/app-store';
import { CompanyBlog } from '@/widgets/company-blog';
import { EmployeeBlog } from '@/widgets/employee-blog';
import { ICompany, IEmployee } from '@/shared/types';

export const HomePage = () => {
  const [checkboxesCompany, setCheckboxesCompany] = useState<string[]>([]);
  const [slice, setSlice] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);

  const companyList: ICompany[] = useSelector((state: RootState) =>
    state.company.companyList.slice(0, 16 * slice)
  );

  const employeeList: IEmployee[] = useSelector((state: RootState) =>
    state.employee.employeeList
      .filter((element) => element.idCompany === parseInt(checkboxesCompany[0]))
      .slice(0, 16 * slice)
  );

  useEffect(() => {
    if (fetching) {
      setFetching(false);
      setSlice((prev) => prev + 1);
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <main className="flex justify-between m-auto w-[1250px] py-8 px-4 gap-10">
      <>
        <CompanyBlog
          companyList={companyList}
          checkboxesCompany={checkboxesCompany}
          setCheckboxesCompany={setCheckboxesCompany}
        />
        {checkboxesCompany.length === 1 && (
          <EmployeeBlog
            employeeList={employeeList}
            companyId={checkboxesCompany[0]}
          />
        )}
      </>
    </main>
  );
};
