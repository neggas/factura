"use client";

import {
  FileUploadClearTrigger,
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
  FileUploadRootProps,
} from "@/components/ui/file-upload";
import { InputGroup } from "../input-group";
import { CloseButton } from "../close-button";
import { FileUploadFileChangeDetails, InputProps } from "@chakra-ui/react";
import { FileMimeType } from "@/helpers/constant/types";
import { useField } from "formik";
import { useCallback } from "react";

type FileInputFieldProps = FileUploadRootProps &
  InputProps & {
    label: string;
    description: string;
    name: string;
    allowDrop?: boolean;
    accept?: Record<string, string[]> | FileMimeType | FileMimeType[];
    files?: File[] | null;
    validateOnChange?: boolean;
    onFileChange?: (val: FileUploadFileChangeDetails | null) => void;
    validate?: (_: unknown) => undefined | string | Promise<unknown>;
  };

const FileInputField = ({
  label,
  description,
  allowDrop = true,
  validateOnChange = true,
  onFileChange,
  accept = "image/jpeg, image/png, application/pdf",
  ...props
}: FileInputFieldProps) => {
  const [{}, { error }, { setValue, setTouched }] =
    useField<FileUploadFileChangeDetails | null>(props);

  const handleChange = useCallback(
    (val: FileUploadFileChangeDetails | null) => {
      setValue(val, validateOnChange);
      setTouched(true, false);

      if (onFileChange) {
        onFileChange(val);
      }
    },
    [onFileChange, setTouched, setValue, validateOnChange]
  );

  return (
    <FileUploadRoot
      w="full"
      h="full"
      alignItems="stretch"
      allowDrop={allowDrop}
      maxFiles={10}
      accept={accept}
      invalid={!!error}
      onFileChange={handleChange}>
      <FileUploadDropzone label={label} description={description} />
      <InputGroup
        w="full"
        endElement={
          <FileUploadClearTrigger asChild>
            <CloseButton
              me="-1"
              size="xs"
              variant="plain"
              focusVisibleRing="inside"
              focusRingWidth="2px"
              pointerEvents="auto"
              color="fg.subtle"
            />
          </FileUploadClearTrigger>
        }>
        <FileUploadList />
      </InputGroup>
    </FileUploadRoot>
  );
};

export default FileInputField;
