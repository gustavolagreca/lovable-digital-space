import { motion } from "framer-motion";
import { BookOpen, GraduationCap, FlaskConical, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AudienceSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

interface AudienceOption {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const options: AudienceOption[] = [
  {
    id: "criancas",
    label: "Crianças",
    description: "Linguagem simples e acessível",
    icon: BookOpen,
  },
  {
    id: "adolescentes",
    label: "Adolescentes",
    description: "Tom casual e envolvente",
    icon: Users,
  },
  {
    id: "universitarios",
    label: "Universitários",
    description: "Nível académico intermédio",
    icon: GraduationCap,
  },
  {
    id: "especialistas",
    label: "Especialistas",
    description: "Terminologia técnica avançada",
    icon: FlaskConical,
  },
];

const AudienceSelector = ({ selected, onSelect }: AudienceSelectorProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        const Icon = opt.icon;
        return (
          <motion.button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`audience-option ${isSelected ? "selected" : ""}`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="option-radio" />
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${isSelected ? "bg-primary/15" : "bg-secondary"}`}>
              <Icon className={`w-[18px] h-[18px] ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-secondary-foreground"}`}>
                {opt.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {opt.description}
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default AudienceSelector;
