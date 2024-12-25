"use client";

import { NumberInputProps } from "@/components/ui/number-input";
import { useField } from "formik";
import { InputHTMLAttributes, useEffect } from "react";

import NumberFieldInputDumb from "@/components/ui/dumbs/numberFieldInput";
type NumberFieldInputProps = InputHTMLAttributes<HTMLInputElement> &
  NumberInputProps & {
    label?: string;
    placeholder?: string;
    name: string;
    defaultValue?: number | string;
    partlyControledValue?: string;
    validate?: (
      value: string
    ) => undefined | string | Promise<undefined | string>;
    validateOnChange?: boolean;
    formatoptions?: Intl.NumberFormatOptions | undefined;
  };

const NumberFieldInput = ({
  label,
  validateOnChange = true,
  defaultValue,
  partlyControledValue,
  formatoptions,
  ...props
}: NumberFieldInputProps) => {
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
    <NumberFieldInputDumb
      {...props}
      label={label}
      name={field.name}
      error={error}
      hasError={hasError}
      onChange={onChange}
      formatOptions={formatoptions}
      defaultValue={defaultValue}
      w="full"
      h="full"
    />
  );
};

export default NumberFieldInput;
