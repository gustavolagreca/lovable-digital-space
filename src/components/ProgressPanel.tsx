import { motion } from "framer-motion";
import { CheckCircle, Download, Loader2 } from "lucide-react";

interface ProgressPanelProps {
  progress: number;
  status: string;
  isComplete: boolean;
}

const ProgressPanel = ({ progress, status, isComplete }: ProgressPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="glass-card p-6"
    >
      {isComplete ? (
        <div className="text-center space-y-5 py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          >
            <CheckCircle className="w-14 h-14 text-accent mx-auto" />
          </motion.div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Processamento concluído
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              O PDF reescrito foi enviado para o seu email.
            </p>
          </div>
          <button className="btn-cta max-w-xs mx-auto flex items-center justify-center gap-2">
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <h3 className="text-sm font-semibold text-foreground">A processar</h3>
            <span className="ml-auto text-xs font-mono text-muted-foreground">
              {progress}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">{status}</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressPanel;
