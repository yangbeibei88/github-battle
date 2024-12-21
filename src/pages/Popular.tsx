import { useEffect, useReducer, useRef, useState } from "react";
import { ReposGrid } from "../components/ReposGrid.tsx";
import { LanguageNav } from "../components/LanguageNav.tsx";
import { Language, Repo } from "../utils/types.tsx";
import { fetchPopularRepos } from "../utils/api.tsx";
import { Loading } from "../components/Loading.tsx";

interface PopularState extends Partial<Record<Language, Repo[]>> {
  error: null | string;
}

type PopularActionType =
  | {
      type: "success";
      payload: { selectedLanguage: Language; repos: Repo[] };
    }
  | { type: "error"; payload: { error: Error } };

function popularReducer(state: PopularState, action: PopularActionType) {
  switch (action.type) {
    case "success": {
      return {
        ...state,
        [action.payload.selectedLanguage]: action.payload.repos,
        error: null,
      };
    }

    case "error": {
      return {
        ...state,
        error: action.payload.error.message,
      };
    }
    default: {
      throw new Error(`The action type is not supported.`);
    }
  }
}

export function Popular() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("All");
  const [state, dispatch] = useReducer(popularReducer, { error: null });

  const fetchedLanguages = useRef<Language[]>([]);

  useEffect(() => {
    if (fetchedLanguages.current.includes(selectedLanguage) === false) {
      fetchedLanguages.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage)
        .then((repos) => {
          if (repos) {
            dispatch({ type: "success", payload: { selectedLanguage, repos } });
          }
        })
        .catch((error) => dispatch({ type: "error", payload: { error } }));
    }
  }, [fetchedLanguages, selectedLanguage]);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  return (
    <>
      <LanguageNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text="Fetching Repos" />}

      {state.error && <p className="text-center">{state.error}</p>}
      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </>
  );
}
