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
  };

const NumberFieldInputDumb = ({
  label,
  name,
  error,
  hasError,
  ...props
}: NumberFieldInputDumbProps) => {
  return (
    <Field.Root invalid={hasError}>
      <Field.Label htmlFor={name} textStyle="md">
        {label}
      </Field.Label>
      <NumberInputRoot formatOptions={props.formatOptions}>
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
