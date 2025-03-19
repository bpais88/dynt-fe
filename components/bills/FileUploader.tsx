"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { File as FileIcon, Upload, X } from "lucide-react";
import { useState } from "react";

type FileUploaderProps = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const FileUploader = ({ files, setFiles }: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
      e.target.value = ""; // Reset input
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer",
          isDragging ? "border-primary bg-primary/5" : "border-border",
          "transition-colors duration-200"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
        />
        <label htmlFor="file-upload" className="cursor-pointer w-full h-full">
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">
              Drag and drop files here or click to browse
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Support for documents, images, and PDFs
            </p>
          </div>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Uploaded Files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between py-2 px-3 rounded-md bg-muted"
              >
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4" />
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
