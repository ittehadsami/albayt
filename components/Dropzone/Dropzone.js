import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const Dropzone = ({ handleInputChange, image = null }) => {
  const [acceptedFile, setAcceptedFile] = useState(null);
  const [preview, setPreview] = useState(image);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setAcceptedFile(file);

    const event = {
      target: {
        name: "image",
        files: acceptedFiles,
      },
    };
    handleInputChange(event);

    // Generate a preview URL for the new file
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = () => {
    setAcceptedFile(null);
    setPreview(null);
    handleInputChange({ target: { name: "image", files: [] } });
  };

  useEffect(() => {
    // Revoke the preview URL to free up memory when the component unmounts or when acceptedFile changes
    return () => {
      if (acceptedFile) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [acceptedFile, preview]);

  return (
    <div className="mt-2 w-full rounded-md">
      <div
        {...getRootProps({
          className:
            "h-[200px] bg-gray-100 flex items-center justify-center border border-light border-dashed rounded-lg",
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <p className="p-3 text-xl font-semibold text-center text-gray-500">
              Upload Image&nbsp;<span className="text-red-500">*</span>
            </p>
            <p className="p-3 text-center text-gray-400">
              Drag and drop an image here, or click to select one
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        {preview && (
          <div className="relative rounded-md my-4">
            <button
              onClick={removeFile}
              className="absolute top-0 right-0 p-2 bg-red-500 rounded-full hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-40 mt-2 rounded-md"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
