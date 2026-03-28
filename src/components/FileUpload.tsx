import { useState, useRef, type DragEvent } from "react";
import { Upload, FileText } from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const FileUpload = ({ onFileSelect, selectedFile }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith(".pdf") || file.name.endsWith(".epub"))) {
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div
      className={`upload-zone ${isDragging ? "border-primary" : ""}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.epub"
        className="hidden"
        onChange={handleChange}
      />
      {selectedFile ? (
        <div className="flex flex-col items-center gap-3">
          <FileText className="w-12 h-12 text-primary" />
          <p className="font-semibold text-foreground">{selectedFile.name}</p>
          <p className="text-sm text-muted-foreground">{formatSize(selectedFile.size)}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <Upload className="w-12 h-12 text-muted-foreground" />
          <p className="text-foreground">
            Arraste o ficheiro aqui ou <span className="font-semibold text-primary">clique para selecionar</span>
          </p>
          <p className="text-sm text-muted-foreground">PDF ou EPUB</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
