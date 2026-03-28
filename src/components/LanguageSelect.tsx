import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

interface LanguageSelectProps {
  value: string;
  onChange: (v: string) => void;
}

const groups = [
  { label: "Português", items: ["Português Europeu", "Português Brasileiro"] },
  { label: "Inglês", items: ["Inglês Britânico (UK)", "Inglês Americano (USA)", "Inglês Australiano"] },
  { label: "Espanhol", items: ["Espanhol (Espanha)", "Espanhol (América Latina)"] },
  { label: "Francês", items: ["Francês (França)", "Francês (Canadá)", "Francês (Bélgica)", "Francês (Suíça)"] },
  { label: "Alemão", items: ["Alemão (Alemanha)", "Alemão (Áustria)", "Alemão (Suíça)"] },
  { label: "Italiano", items: ["Italiano"] },
  { label: "Holandês", items: ["Holandês (Países Baixos)", "Holandês (Bélgica)"] },
  { label: "Nórdicas", items: ["Sueco", "Norueguês", "Dinamarquês", "Finlandês", "Islandês"] },
  { label: "Eslavas", items: ["Russo", "Polaco", "Checo", "Eslovaco", "Ucraniano", "Búlgaro", "Croata", "Sérvio", "Esloveno"] },
  { label: "Asiáticas", items: ["Chinês Simplificado", "Chinês Tradicional", "Japonês", "Coreano", "Hindi", "Bengali", "Tailandês", "Vietnamita", "Indonésio"] },
  { label: "Médio Oriente", items: ["Árabe", "Turco", "Persa", "Hebraico"] },
  { label: "Africanas", items: ["Suaíli", "Yoruba", "Zulu", "Afrikaans"] },
];

const LanguageSelect = ({ value, onChange }: LanguageSelectProps) => {
  return (
    <div className="relative">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-11 bg-muted border-border text-foreground pl-10">
          <Globe className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <SelectValue placeholder="Selecione um idioma" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border max-h-72">
          {groups.map((g) => (
            <SelectGroup key={g.label}>
              <SelectLabel className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                {g.label}
              </SelectLabel>
              {g.items.map((item) => (
                <SelectItem key={item} value={item} className="text-foreground text-sm">
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelect;
