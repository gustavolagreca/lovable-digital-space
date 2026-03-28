import { useState } from "react";
import logo from "@/assets/cognixis-logo.png";
import FileUpload from "@/components/FileUpload";
import AudienceSelector from "@/components/AudienceSelector";
import LanguageSelect from "@/components/LanguageSelect";
import ProgressSection from "@/components/ProgressSection";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState("Português Europeu");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleProcess = () => {
    if (!file) {
      toast({ title: "Erro", description: "Por favor, selecione um ficheiro.", variant: "destructive" });
      return;
    }
    if (!audience) {
      toast({ title: "Erro", description: "Por favor, selecione o público-alvo.", variant: "destructive" });
      return;
    }
    if (!email) {
      toast({ title: "Erro", description: "Por favor, insira o seu email.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setProgressStatus("A iniciar processamento...");

    // Simulate progress for demo
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setIsProcessing(false);
          return 100;
        }
        setProgressStatus(`A processar capítulo ${Math.floor(prev / 10) + 1}...`);
        return prev + 5;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={logo} alt="Cognixis Tutor" className="w-24 h-24 mx-auto rounded-2xl" />
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
              Book Rewriter
            </h1>
            <p className="text-muted-foreground mt-1">
              Reescreva livros com Inteligência Artificial
            </p>
          </div>
        </div>

        {/* Step 1: Upload */}
        <div className="step-card space-y-4">
          <div className="flex items-center gap-3">
            <span className="step-badge">1</span>
            <h2 className="text-lg font-semibold text-foreground">Importar Livro</h2>
          </div>
          <FileUpload onFileSelect={setFile} selectedFile={file} />
        </div>

        {/* Step 2: Settings */}
        <div className="step-card space-y-6">
          <div className="flex items-center gap-3">
            <span className="step-badge">2</span>
            <h2 className="text-lg font-semibold text-foreground">Configurações</h2>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Público-Alvo</label>
            <AudienceSelector selected={audience} onSelect={setAudience} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Idioma da Resposta</label>
            <LanguageSelect value={language} onChange={setLanguage} />
          </div>
        </div>

        {/* Step 3: Email */}
        <div className="step-card space-y-4">
          <div className="flex items-center gap-3">
            <span className="step-badge">3</span>
            <h2 className="text-lg font-semibold text-foreground">Email para Receber o PDF</h2>
          </div>
          <Input
            type="email"
            placeholder="seu.email@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Action Button */}
        {!isProcessing && !isComplete && (
          <button onClick={handleProcess} className="btn-process">
            Processar Livro Completo
          </button>
        )}

        {/* Progress / Result */}
        {(isProcessing || isComplete) && (
          <ProgressSection
            progress={progress}
            status={progressStatus}
            isComplete={isComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
