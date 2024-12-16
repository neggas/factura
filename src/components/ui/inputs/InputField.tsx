"use client";

import { InputHTMLAttributes, useEffect } from "react";
import InputFieldDumb from "../dumbs/InputField";
import { TextProps } from "@chakra-ui/react";
import { useField } from "formik";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  placeholder?: string;
  name: string;
  defaultValue?: string | number | readonly string[];
  partlyControledValue?: string;
  validate?: (
    value: string
  ) => undefined | string | Promise<undefined | string>;
  validateOnChange?: boolean;
  variantTextLabel?: string;
  labelProps?: TextProps;
};

const InputField = ({
  label,
  validateOnChange = true,
  defaultValue,
  partlyControledValue,

  ...props
}: InputProps) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(event.target.value, validateOnChange);
    setTouched(true, false);
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue, setValue]);

  useEffect(() => {
    if (partlyControledValue) {
      setValue(partlyControledValue);
    }
  }, [partlyControledValue, setValue]);

  const hasError = !!error && touched;

  return (
    <InputFieldDumb
      w="full"
      h="full"
      {...props}
      label={label}
      defaultValue={defaultValue}
      name={field.name}
      hasError={hasError}
      error={error}
      onChange={onChange}
    />
  );
};

export default InputField;
