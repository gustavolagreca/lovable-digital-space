import { motion } from "framer-motion";

interface RewriteModeToggleProps {
  mode: "full" | "summarized";
  onChange: (mode: "full" | "summarized") => void;
}

const RewriteModeToggle = ({ mode, onChange }: RewriteModeToggleProps) => {
  const isFull = mode === "full";

  return (
    <div
      className="relative flex rounded-xl bg-muted/60 border border-border p-1 cursor-pointer"
      onClick={() => onChange(isFull ? "summarized" : "full")}
    >
      <motion.div
        className="absolute top-1 bottom-1 rounded-lg bg-gradient-to-r from-primary to-accent"
        style={{ width: "calc(50% - 4px)" }}
        animate={{ x: isFull ? 4 : "calc(100% + 4px)" }}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
      <span
        className={`relative z-10 flex-1 text-center py-2.5 text-sm font-medium transition-colors duration-300 ${
          isFull ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        Reescrita Inteligente
      </span>
      <span
        className={`relative z-10 flex-1 text-center py-2.5 text-sm font-medium transition-colors duration-300 ${
          !isFull ? "text-primary-foreground" : "text-muted-foreground"
        }`}
      >
        Reescrita Resumida
      </span>
    </div>
  );
};

export default RewriteModeToggle;
