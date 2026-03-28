import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const languageGroups = [
  { label: "Português", options: ["Português Europeu", "Português Brasileiro"] },
  { label: "Inglês", options: ["Inglês Britânico (UK)", "Inglês Americano (USA)", "Inglês Australiano"] },
  { label: "Espanhol", options: ["Espanhol (Espanha)", "Espanhol (América Latina)"] },
  { label: "Francês", options: ["Francês (França)", "Francês (Canadá)", "Francês (Bélgica)", "Francês (Suíça)"] },
  { label: "Alemão", options: ["Alemão (Alemanha)", "Alemão (Áustria)", "Alemão (Suíça)"] },
  { label: "Italiano", options: ["Italiano"] },
  { label: "Holandês", options: ["Holandês (Países Baixos)", "Holandês (Bélgica)"] },
  { label: "Línguas Nórdicas", options: ["Sueco", "Norueguês", "Dinamarquês", "Finlandês", "Islandês"] },
  { label: "Línguas Eslavas", options: ["Russo", "Polaco", "Checo", "Eslovaco", "Ucraniano", "Búlgaro", "Croata", "Sérvio", "Esloveno"] },
  { label: "Línguas Asiáticas", options: ["Chinês Mandarim (Simplificado)", "Chinês Mandarim (Tradicional)", "Japonês", "Coreano", "Hindi", "Bengali", "Tailandês", "Vietnamita", "Indonésio", "Malaio", "Filipino (Tagalog)"] },
  { label: "Médio Oriente", options: ["Árabe (Padrão Moderno)", "Turco", "Persa (Farsi)", "Hebraico"] },
  { label: "Línguas Africanas", options: ["Suaíli", "Amhárico", "Yoruba", "Zulu", "Afrikaans"] },
];

const LanguageSelect = ({ value, onChange }: LanguageSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-secondary border-border text-foreground">
        <SelectValue placeholder="Selecione um idioma" />
      </SelectTrigger>
      <SelectContent className="bg-card border-border max-h-80">
        {languageGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel className="text-muted-foreground">{group.label}</SelectLabel>
            {group.options.map((opt) => (
              <SelectItem key={opt} value={opt} className="text-foreground">
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;
