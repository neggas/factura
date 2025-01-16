"use client";

import { Box, TextProps, Field } from "@chakra-ui/react";
import Select, { SingleValue } from "react-select";
import { useField } from "formik";
import { InputHTMLAttributes, useEffect, useState } from "react";

export type Option = {
  value: string;
  label?: string;
};

type AutoCompleteFieldProps = InputHTMLAttributes<HTMLInputElement> & {
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
  onChange?: (event: Option) => void;
  options: Option[];
};

const AutocompleteInputField = ({
  options,
  label,
  validateOnChange = true,
  defaultValue,
  partlyControledValue,
  onChange: onChangeProps,
  ...props
}: AutoCompleteFieldProps) => {
  const [field, meta, helpers] = useField(props);
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const onChange = (changes: SingleValue<Option>): void => {
    setValue(changes, validateOnChange);
    setSelectedOption(changes);
    setTouched(true, false);
    if (onChangeProps && changes) {
      onChangeProps(changes);
    }
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
    <Field.Root w="full">
      <Box w="full">
        {label && (
          <Field.Label htmlFor={props.name} textStyle="md">
            {label}
          </Field.Label>
        )}
        <Select
          {...field}
          value={selectedOption}
          options={options}
          onChange={onChange}
          onBlur={() => setTouched(true)}
          isMulti={false}
        />

        {hasError && (
          <Field.HelperText color="red.500" textStyle="md">
            {error}
          </Field.HelperText>
        )}
      </Box>
    </Field.Root>
  );
};

export default AutocompleteInputField;
