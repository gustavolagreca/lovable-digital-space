import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import logo from "@/assets/cognixis-logo.png";
import FileUpload from "@/components/FileUpload";
import AudienceSelector from "@/components/AudienceSelector";
import LanguageSelect from "@/components/LanguageSelect";
import ProgressPanel from "@/components/ProgressPanel";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  }),
};

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState("Português Europeu");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressStatus, setProgressStatus] = useState("");
  const [complete, setComplete] = useState(false);
  const { toast } = useToast();

  const canProcess = file && audience && email;

  const handleProcess = () => {
    if (!file) return toast({ title: "Ficheiro em falta", description: "Importe um ficheiro PDF ou EPUB.", variant: "destructive" });
    if (!audience) return toast({ title: "Público-alvo em falta", description: "Selecione o público-alvo.", variant: "destructive" });
    if (!email) return toast({ title: "Email em falta", description: "Insira o seu email.", variant: "destructive" });

    setProcessing(true);
    setProgress(0);
    setComplete(false);
    setProgressStatus("A iniciar processamento...");

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setComplete(true);
          setProcessing(false);
          return 100;
        }
        const chapter = Math.floor(p / 10) + 1;
        setProgressStatus(`A reescrever capítulo ${chapter}...`);
        return p + 3;
      });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(210 20% 50%) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-[640px] mx-auto px-5 py-12 sm:py-16 space-y-6">
        {/* Header */}
        <motion.header
          className="flex flex-col items-center text-center space-y-5 pb-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-primary/10 ring-1 ring-border">
            <img src={logo} alt="Cognixis Tutor" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Book Rewriter
            </h1>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-sm">
              Reescreva livros completos com inteligência artificial, adaptados ao seu público e idioma.
            </p>
          </div>
        </motion.header>

        {/* Step 1 */}
        <motion.section
          className="glass-card p-6 space-y-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <div className="flex items-center gap-3">
            <div className="step-indicator">1</div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Importar livro</h2>
              <p className="text-xs text-muted-foreground">Ficheiro PDF ou EPUB até 200 MB</p>
            </div>
          </div>
          <FileUpload file={file} onFileChange={setFile} />
        </motion.section>

        {/* Step 2 */}
        <motion.section
          className="glass-card p-6 space-y-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <div className="flex items-center gap-3">
            <div className="step-indicator">2</div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Configurações</h2>
              <p className="text-xs text-muted-foreground">Defina público-alvo e idioma de saída</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Público-Alvo
            </label>
            <AudienceSelector selected={audience} onSelect={setAudience} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Idioma da Resposta
            </label>
            <LanguageSelect value={language} onChange={setLanguage} />
          </div>
        </motion.section>

        {/* Step 3 */}
        <motion.section
          className="glass-card p-6 space-y-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <div className="flex items-center gap-3">
            <div className="step-indicator">3</div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Entrega</h2>
              <p className="text-xs text-muted-foreground">Receba o livro reescrito por email</p>
            </div>
          </div>
          <div className="relative">
            <Mail className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-lg bg-muted border border-border px-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
          </div>
        </motion.section>

        {/* CTA */}
        {!processing && !complete && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <button
              onClick={handleProcess}
              disabled={!canProcess}
              className="btn-cta"
            >
              <span className="flex items-center justify-center gap-2">
                Processar Livro
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </motion.div>
        )}

        {/* Progress */}
        {(processing || complete) && (
          <ProgressPanel
            progress={progress}
            status={progressStatus}
            isComplete={complete}
          />
        )}

        {/* Footer */}
        <motion.footer
          className="text-center pt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <p className="text-xs text-muted-foreground">
            Powered by <span className="font-medium text-secondary-foreground">Cognixis Tutor</span>
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
