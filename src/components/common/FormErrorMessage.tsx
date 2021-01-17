import React from 'react';

interface FormErrorMessageProps {
  msg?: string;
}
const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ msg }) => {
  if (!msg) return null;
  return (
    <span role="alert" className="font-medium text-red-500">
      {msg}
    </span>
  );
};

export default FormErrorMessage;
