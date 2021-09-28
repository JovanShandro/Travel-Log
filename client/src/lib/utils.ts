type FieldErrors = {
  field: string;
  message: string;
}[];

interface FormErrors {
  [key: string]: string;
}

// Format errors such as field acts as object key for the msg
export const formatErrors = (errors: FieldErrors): FormErrors => {
  if (!errors) return {};
  const result: FormErrors = {};
  errors.forEach((error) => {
    result[error.field] = error.message;
  });
  return result;
};
