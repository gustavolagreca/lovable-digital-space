interface AudienceSelectorProps {
  selected: string;
  onSelect: (audience: string) => void;
}

const audiences = [
  { id: "criancas", label: "Crianças", icon: "👶" },
  { id: "adolescentes", label: "Adolescentes", icon: "🧑" },
  { id: "universitarios", label: "Universitários", icon: "🎓" },
  { id: "especialistas", label: "Especialistas", icon: "🔬" },
];

const AudienceSelector = ({ selected, onSelect }: AudienceSelectorProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {audiences.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelect(a.id)}
          className={`audience-chip ${selected === a.id ? "active" : ""}`}
        >
          <span className="text-2xl">{a.icon}</span>
          <span className="text-sm font-medium">{a.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AudienceSelector;
