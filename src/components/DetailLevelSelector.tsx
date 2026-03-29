import { motion } from "framer-motion";

interface DetailLevelSelectorProps {
  level: string;
  onChange: (level: string) => void;
}

const levels = [
  { id: "lite", label: "Lite", description: "Menos detalhes, mais conciso" },
  { id: "normal", label: "Normal", description: "Equilíbrio ideal" },
  { id: "expandido", label: "Espandido", description: "Máximo de detalhes" },
];

const DetailLevelSelector = ({ level, onChange }: DetailLevelSelectorProps) => {
  return (
    <div className="flex gap-3">
      {levels.map((opt) => {
        const isSelected = level === opt.id;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`detail-option ${isSelected ? "selected" : ""}`}
            whileTap={{ scale: 0.97 }}
          >
            <div className="detail-radio" />
            <div>
              <p className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-secondary-foreground"}`}>
                {opt.label}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                {opt.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default DetailLevelSelector;
