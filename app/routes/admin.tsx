import { api } from "convex/_generated/api";
import React, { useState, useRef } from "react";
import { useMutation, useAction } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "~/components/Layout";
import { generateFileUrls } from "convex/books_preprocessing";

interface UploadResult {
  success: boolean;
  message: string;
}

export default function FileUploadComponent() {
  const [bookTitle, setBookTitle] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToConvex = useMutation(api.books_preprocessing_test.uploadBook);

  const processBook = useAction(api.books_preprocessing_test.processBooks);

  const processFileIds = useMutation(api.books_preprocessing.generateFileUrls);

  const handleProcessBook = () => {
    processBook();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!bookTitle.trim()) {
      setUploadStatus("Please enter a book title before uploading.");
      return;
    }

    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setUploadStatus("Uploading...");

    const uploadResults: UploadResult[] = await Promise.all(
      Array.from(files).map(async (file: File) => {
        return new Promise<UploadResult>((resolve) => {
          const reader = new FileReader();
          reader.onload = async (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result as string;
            try {
              await uploadToConvex({ pageContent: content, bookTitle });
              resolve({
                success: true,
                message: `Successfully uploaded ${file.name}`,
              });
            } catch (error) {
              console.error("Error uploading file:", error);
              resolve({
                success: false,
                message: `Error uploading ${file.name}`,
              });
            }
          };
          reader.readAsText(file);
        });
      })
    );

    const successCount = uploadResults.filter(
      (result) => result.success
    ).length;
    const failureCount = uploadResults.length - successCount;

    setUploadStatus(
      `Uploaded ${successCount} file(s) successfully. ${failureCount} file(s) failed.`
    );
    setIsUploading(false);
  };

  return (
    <Layout>
      <div className="p-4 max-w-md mx-auto">
        <Input
          type="text"
          value={bookTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBookTitle(e.target.value)
          }
          placeholder="Enter book title"
          className="mb-4"
        />
        <div
          className="border-2 border-dashed p-4 mb-4 text-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <p>Click to select files or drag and drop .txt files here</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt"
            multiple
            className="hidden"
          />
        </div>
        {uploadStatus && (
          <Alert className="mb-4">
            <AlertDescription>{uploadStatus}</AlertDescription>
          </Alert>
        )}
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          Select Files
        </Button>
        <br />
        <Button className="" onClick={() => handleProcessBook()}>
          Process Books
        </Button>
        <br></br>
        <Button onClick={() => processFileIds()}>Generate File URLS</Button>
      </div>
    </Layout>
  );
}
