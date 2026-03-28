import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X } from "lucide-react";

interface FileUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

const FileUpload = ({ file, onFileChange }: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && /\.(pdf|epub)$/i.test(dropped.name)) {
      onFileChange(dropped);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) onFileChange(selected);
  };

  const formatSize = (b: number) =>
    b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  return (
    <div
      className={`upload-zone-pro ${dragging ? "dragging" : ""} ${file ? "has-file" : ""}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => !file && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.epub"
        className="hidden"
        onChange={handleInput}
      />

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground truncate max-w-[280px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {formatSize(file.size)} · {file.name.split(".").pop()?.toUpperCase()}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFileChange(null);
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-foreground">
                Arraste o ficheiro ou{" "}
                <span className="text-primary font-medium cursor-pointer">selecione</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 font-mono">
                Formatos suportados: PDF, EPUB
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileUpload;
