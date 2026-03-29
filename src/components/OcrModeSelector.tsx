import { motion } from "framer-motion";
import { Zap, Eye, ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OcrModeSelectorProps {
  mode: string;
  onChange: (mode: string) => void;
}

const options: { id: string; label: string; description: string; icon: LucideIcon }[] = [
  { id: "flash", label: "Flash", description: "Texto simples", icon: Zap },
  { id: "vision", label: "Vision", description: "Digitalizado", icon: Eye },
  { id: "max", label: "Max", description: "Com imagens", icon: ImageIcon },
];

const OcrModeSelector = ({ mode, onChange }: OcrModeSelectorProps) => {
  return (
    <div className="flex gap-3">
      {options.map((opt) => {
        const isSelected = mode === opt.id;
        const Icon = opt.icon;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`detail-option ${isSelected ? "selected" : ""}`}
            whileTap={{ scale: 0.97 }}
          >
            <div className="detail-radio" />
            <div className="flex items-center gap-2">
              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              <div>
                <p className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-secondary-foreground"}`}>
                  {opt.label}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {opt.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default OcrModeSelector;
