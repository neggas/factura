"use client";

import { Field } from "@chakra-ui/react";
import {
  NumberInputField,
  NumberInputProps,
  NumberInputRoot,
} from "../number-input";
import { InputHTMLAttributes } from "react";

type NumberFieldInputDumbProps = InputHTMLAttributes<HTMLInputElement> &
  NumberInputProps & {
    label?: string;
    name: string;
    error?: string;
    hasError?: boolean;
    formatoptions?: Intl.NumberFormatOptions;
  };

const NumberFieldInputDumb = ({
  label,
  name,
  error,
  hasError,
  formatoptions,
  ...props
}: NumberFieldInputDumbProps) => {
  return (
    <Field.Root invalid={hasError}>
      <Field.Label htmlFor={name} textStyle="md">
        {label}
      </Field.Label>
      <NumberInputRoot formatOptions={formatoptions}>
        <NumberInputField
          {...props}
          w="full"
          h="45px"
          _placeholder={{ color: "text.muted" }}
          fontSize="20px"
        />
      </NumberInputRoot>
      {hasError && <Field.HelperText color="red.500">{error}</Field.HelperText>}
    </Field.Root>
  );
};

export default NumberFieldInputDumb;
