"use client";

import { Input, InputProps, TextProps } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
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
      <Field
        label={label}
        invalid={!!hasError}
        errorText={hasError ? `${error}` : ""}
        fontSize="16px">
        <Input
          name={name}
          id={name}
          {...props}
          _placeholder={{ color: "text.muted" }}
          fontSize="20px"
        />
      </Field>
    </>
  );
};

export default InputFieldDumb;
