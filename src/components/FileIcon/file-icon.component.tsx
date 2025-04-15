import { File, FileImage, FileType2, FileX2 } from "lucide-react";

interface FileIconProps {
  mimetype: string;
}
export const FileIcon: React.FC<FileIconProps> = ({ mimetype }) => {
  if (mimetype.includes("image")) {
    return <FileImage />;
  }
  if (
    mimetype.includes("csv") ||
    mimetype.includes("xls") ||
    mimetype.includes("excel")
  ) {
    return <FileX2 />;
  }
  if (
    mimetype.includes("doc") ||
    mimetype.includes("pdf") ||
    mimetype.includes("txt")
  ) {
    return <FileType2 />;
  }
  return <File />;
};
