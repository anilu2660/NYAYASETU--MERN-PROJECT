"use client";
import { useState, useRef } from "react";
import { Upload, FileText, X, Loader, CheckCircle, AlertTriangle } from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
}

interface FileUploadProps {
  onFilesSelected?: (files: File[]) => void;
  onFileUpload?: (uploadedFiles: UploadedFile[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  filingType?: string;
  courtLevel?: string;
}

const FileUpload = ({
  onFilesSelected,
  onFileUpload,
  maxFiles = 10,
  maxSize = 10, // 10MB
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  className = "",
  filingType = "petition",
  courtLevel = "district"
}: FileUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB limit`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(', ')}`;
    }

    return null;
  };

  const processFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert('Some files were rejected:\n' + errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const newUploadedFiles: UploadedFile[] = validFiles.map((file, index) => ({
        id: Date.now() + index.toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading' as const,
        progress: 0
      }));

      setUploadedFiles(prev => [...prev, ...newUploadedFiles]);
      onFilesSelected?.(validFiles);

      // Actually upload files
      uploadFiles(newUploadedFiles, validFiles);
    }
  };

  const uploadFiles = async (files: UploadedFile[], originalFiles: File[]) => {
    setIsUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const originalFile = originalFiles[i];
      
      try {
        const formData = new FormData();
        formData.append('files', originalFile);
        formData.append('category', 'petition'); // Default category
        formData.append('filingType', filingType);
        formData.append('courtLevel', courtLevel);
        
        const response = await fetch('http://localhost:3001/api/files/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === file.id 
                ? { ...f, status: 'success' as const, progress: 100 }
                : f
            )
          );
        } else {
          throw new Error('Upload failed');
        }
      } catch (error) {
        console.error('Upload error:', error);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === file.id 
              ? { ...f, status: 'error' as const, error: 'Upload failed' }
              : f
          )
        );
      }
    }
    
    setIsUploading(false);
    onFileUpload?.(files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={className}>
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:bg-secondary/50'
        }`}
        onClick={handleFileSelect}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <>
            <Loader className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-primary mb-4">Uploading files...</p>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${uploadedFiles.length > 0 
                    ? uploadedFiles.reduce((acc, f) => acc + (f.progress || 0), 0) / uploadedFiles.length 
                    : 0}%` 
                }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {uploadedFiles.filter(f => f.status === 'success').length} of {uploadedFiles.length} files uploaded
            </p>
          </>
        ) : (
          <>
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Drag and drop files here or click to browse
            </p>
            <button 
              type="button" 
              className="btn-secondary"
              onClick={(e) => {
                e.stopPropagation();
                handleFileSelect();
              }}
            >
              Select Files
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: {acceptedTypes.join(', ')} (Max {maxSize}MB per file)
            </p>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file) => (
            <div key={file.id} className="flex items-center p-3 bg-secondary rounded-lg">
              <FileText className="h-4 w-4 text-primary mr-3" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {file.status === 'uploading' && (
                  <>
                    <div className="w-16 bg-secondary rounded-full h-1">
                      <div 
                        className="bg-primary h-1 rounded-full transition-all duration-300" 
                        style={{ width: `${file.progress || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{file.progress || 0}%</span>
                  </>
                )}
                
                {file.status === 'success' && (
                  <CheckCircle className="h-4 w-4 text-success" />
                )}
                
                {file.status === 'error' && (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
                
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-background rounded transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
