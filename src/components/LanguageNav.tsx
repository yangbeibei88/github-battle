import { Language } from "../utils/types.tsx";

export function LanguageNav({
  selected,
  onUpdateLanguage,
}: {
  selected: string;
  onUpdateLanguage: (language: Language) => void;
}) {
  const languages: Language[] = [
    "All",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "Rust",
    "Ruby",
    "CSS",
  ];

  return (
    <ul className="flex justify-center items-center space-x-4 font-semibold py-3 text-xl">
      {languages.map((language) => (
        <li key={language}>
          <button
            className=""
            style={
              language === selected ? { color: "rgb(187, 46, 31)" } : undefined
            }
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}
