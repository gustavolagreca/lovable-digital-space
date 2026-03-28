import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface ProgressSectionProps {
  progress: number;
  status: string;
  isComplete: boolean;
  downloadUrl?: string;
}

const ProgressSection = ({ progress, status, isComplete, downloadUrl }: ProgressSectionProps) => {
  if (isComplete) {
    return (
      <div className="step-card text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
        <h3 className="text-xl font-bold text-foreground">Livro reescrito com sucesso!</h3>
        <p className="text-muted-foreground">O PDF foi gerado e enviado para o seu email.</p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="btn-process inline-block mt-4 px-8 py-3 no-underline"
          >
            ⬇ Download PDF
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="step-card space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚙️</span>
        <h3 className="text-lg font-semibold text-foreground">Progresso</h3>
      </div>
      <Progress value={progress} className="h-3 bg-secondary" />
      <p className="text-sm text-muted-foreground">{status}</p>
    </div>
  );
};

export default ProgressSection;
