"use client";

import { Input, InputProps, TextProps, Field } from "@chakra-ui/react";
// import { Field } from "@/components/ui/field";
import { InputHTMLAttributes, ReactNode } from "react";

type InputDumbProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    placeholder?: string;
    name: string;
    defaultValue?: string | number | readonly string[];
    hasError?: boolean;
    label?: ReactNode;
    error?: string;
    bg?: string;
    labelProps?: TextProps;
  };

const InputFieldDumb = ({
  label,
  name,
  hasError,
  error,
  ...props
}: InputDumbProps) => {
  return (
    <>
      <Field.Root>
        {label && (
          <Field.Label htmlFor={name} textStyle="md">
            {label}
          </Field.Label>
        )}
        <Input
          name={name}
          id={name}
          {...props}
          _placeholder={{ color: "text.muted" }}
          fontSize="20px"
          height="45px"
        />
        {hasError && (
          <Field.HelperText color="red.500" textStyle="md">
            {error}
          </Field.HelperText>
        )}
      </Field.Root>
    </>
  );
};

export default InputFieldDumb;
