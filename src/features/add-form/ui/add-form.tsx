import { Dispatch } from 'react';
import { IFormInput } from '@/shared/types';
import { formDataCompany, formDataEmployee } from '@/shared/model/form-data';

interface IProps {
  children: JSX.Element[];
  formData: IFormInput;
  setFormData: Dispatch<React.SetStateAction<IFormInput>>;
  titleForm: string;
  TextBtn: string;
  addNewItem: () => void;
}

export const AddForm = ({
  children,
  formData,
  setFormData,
  titleForm,
  TextBtn,
  addNewItem,
}: IProps) => {
  const handleInputChange = (key: string, text: string) => {
    let newFormData = { ...formData };
    newFormData[key] = text;
    setFormData(newFormData);
  };

  const handleSendForm = () => {
    let error = '';

    if (Object.values(formData).some((item) => item === '')) {
      error = 'fields cannot be empty';
      if ('name' in formData) setFormData(formDataCompany);
      if ('lastName' in formData) setFormData(formDataEmployee);
    }

    if (Object.values(formData).some((item) => Number(item))) {
      error = 'fields cannot be number';
      if ('name' in formData) setFormData(formDataCompany);
      if ('lastName' in formData) setFormData(formDataEmployee);
    }

    if (error) return alert(error);

    addNewItem();
  };

  const mappedChildren = children.map((child) => {
    return {
      ...child,
      props: {
        ...child.props,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(child.key ?? '', e.target.value),
        value: formData && child.key ? formData[child.key] : '',
      },
    };
  });
  return (
    <section className="flex flex-col w-[584px]">
      <h3 className="text-center">{titleForm}</h3>
      {mappedChildren}
      <button className="button_add" onClick={handleSendForm}>
        {TextBtn}
      </button>
    </section>
  );
};
