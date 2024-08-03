import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const FileUploadButton = ({ id, name, onChange, multiple, ...props }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = (event) => {
    event.preventDefault
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    console.log(files)
    console.log(name)
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple={multiple}
        id={id}
        name={name}
        
        {...props} // Handle file change locally and pass to parent
      />
      <button
        className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
        onClick={handleButtonClick}
      >
        <Upload className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">Upload</span>
      </button>
    </div>
  );
};

export default FileUploadButton;