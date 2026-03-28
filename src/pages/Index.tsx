import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Sparkles, Zap, Shield } from "lucide-react";
import logo from "@/assets/cognixis-logo.png";
import FileUpload from "@/components/FileUpload";
import AudienceSelector from "@/components/AudienceSelector";
import LanguageSelect from "@/components/LanguageSelect";
import RewriteModeToggle from "@/components/RewriteModeToggle";
import DetailLevelSelector from "@/components/DetailLevelSelector";
import ProgressPanel from "@/components/ProgressPanel";
import NeuralBackground from "@/components/NeuralBackground";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [audience, setAudience] = useState("");
  const [language, setLanguage] = useState("Português Europeu");
  const [rewriteMode, setRewriteMode] = useState<"full" | "summarized">("full");
  const [detailLevel, setDetailLevel] = useState("normal");
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      <NeuralBackground />

      {/* Top ambient light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, hsl(210 100% 52% / 0.08) 0%, transparent 70%)",
        zIndex: 1,
      }} />

      <div className="relative z-10 max-w-[680px] mx-auto px-5 py-16 sm:py-24">
        {/* Hero Header */}
        <motion.header
          className="flex flex-col items-center text-center space-y-8 pb-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {/* Logo with glow ring */}
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-primary/20">
              <img src={logo} alt="Cognixis Tutor" className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-medium tracking-wide"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Sparkles className="w-3 h-3" />
              Powered by Advanced AI
            </motion.div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
              Book
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> Rewriter</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
              Transforme livros inteiros com inteligência artificial. 
              Adaptado ao seu público, no idioma que precisar.
            </p>
          </div>

          {/* Trust badges */}
          <motion.div
            className="flex items-center gap-6 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              Processamento rápido
            </span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-accent" />
              100% seguro
            </span>
          </motion.div>
        </motion.header>

        {/* Cards */}
        <div className="space-y-5">
          {/* Step 1 */}
          <motion.section
            className="glass-card p-7 space-y-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <div className="flex items-center gap-4">
              <div className="step-indicator">1</div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Importar livro</h2>
                <p className="text-xs text-muted-foreground">PDF ou EPUB · até 200 MB</p>
              </div>
            </div>
            <FileUpload file={file} onFileChange={setFile} />
          </motion.section>

          {/* Step 2 */}
          <motion.section
            className="glass-card p-7 space-y-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <div className="flex items-center gap-4">
              <div className="step-indicator">2</div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Configurações</h2>
                <p className="text-xs text-muted-foreground">Público-alvo e idioma de saída</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Modo de Reescrita
              </label>
              <RewriteModeToggle mode={rewriteMode} onChange={setRewriteMode} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Público-Alvo
              </label>
              <AudienceSelector selected={audience} onSelect={setAudience} />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Nível de Detalhamento
              </label>
              <DetailLevelSelector level={detailLevel} onChange={setDetailLevel} />
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
            className="glass-card p-7 space-y-5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div className="flex items-center gap-4">
              <div className="step-indicator">3</div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Entrega</h2>
                <p className="text-xs text-muted-foreground">Receba o resultado por email</p>
              </div>
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 rounded-xl bg-muted border border-border px-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300"
              />
            </div>
          </motion.section>

          {/* CTA */}
          <AnimatePresence mode="wait">
            {!processing && !complete && (
              <motion.div
                key="cta"
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                custom={4}
              >
                <button
                  onClick={handleProcess}
                  disabled={!canProcess}
                  className="btn-cta group"
                >
                  <span className="flex items-center justify-center gap-2.5">
                    Processar Livro
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </motion.div>
            )}

            {(processing || complete) && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ProgressPanel
                  progress={progress}
                  status={progressStatus}
                  isComplete={complete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center pt-16 pb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <p className="text-xs text-muted-foreground/60">
            © 2026 <span className="text-muted-foreground">Cognixis Lab</span> · Todos os direitos reservados
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
