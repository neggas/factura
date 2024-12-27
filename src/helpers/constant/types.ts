import { JSX } from "react";

export type UserSession = {
  expires: Date;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type NavigationLinkType = {
  component: JSX.Element;
};

type ImageFileMimeType =
  | "image/png"
  | "image/gif"
  | "image/jpeg"
  | "image/svg+xml"
  | "image/webp"
  | "image/avif"
  | "image/heic"
  | "image/bmp";

type TextFileMimeType =
  | "text/css"
  | "text/csv"
  | "text/html"
  | "text/markdown"
  | "text/plain";
type FontFileMimeType =
  | "font/ttf"
  | "font/otf"
  | "font/woff"
  | "font/woff2"
  | "font/eot"
  | "font/svg";
type VideoFileMimeType =
  | "video/mp4"
  | "video/webm"
  | "video/ogg"
  | "video/quicktime"
  | "video/x-msvideo";
type AudioFileMimeType =
  | "audio/mpeg"
  | "audio/ogg"
  | "audio/wav"
  | "audio/webm"
  | "audio/aac"
  | "audio/flac"
  | "audio/x-m4a";
type FileMimeTypeGroup =
  | "image/*"
  | "audio/*"
  | "video/*"
  | "text/*"
  | "application/*"
  | "font/*";

type ApplicationFileMimeType =
  | "application/pdf"
  | "application/zip"
  | "application/json"
  | "application/xml"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/rtf"
  | "application/x-rar"
  | "application/x-7z-compressed"
  | "application/x-tar"
  | "application/vnd.microsoft.portable-executable";

type AnyString = string & {};

export type FileMimeType =
  | ImageFileMimeType
  | ApplicationFileMimeType
  | TextFileMimeType
  | FontFileMimeType
  | VideoFileMimeType
  | AudioFileMimeType
  | FileMimeTypeGroup
  | AnyString;

export interface FileType {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface CreateInvoiceDto {
  email: string;
  comment: string;
  invoice: FileType | null;
  dueDate: string;
  amount: string;
  rib: string;
  bank: string;
  dropName: string;
}

export interface Invoice {
  id: string;
  email: string;
  comment: string | null;
  invoice: string;
  dueDate: string;
  amount: string;
  rib: string;
  bank: string;
  dropName: string;
  status: "paid" | "pending" | "lost";
  updated_at: Date | null;
  created_at: Date;
  deleted_at: Date | null;
}
