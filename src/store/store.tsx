import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { GlobalState, Action, Theme, Language, GlobalSettings } from './model';

const generateRandomName = () => {
  const randomNumber = Math.floor(Math.random() * 10000).toFixed(0).padStart(4, '0');
  return `guest${randomNumber}`
};


function getStoredData<T = any>(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) ?? '') as T;
  } catch {
    return undefined;
  }
}

const storedSettings = getStoredData<GlobalSettings>('settings');

const initialSettings: GlobalSettings = {
  name: generateRandomName(),
  theme: Theme.Light,
  clock24Hours: false,
  language: Language.English,
  sendOnCtrlEnter: false,
};

export const initialState: GlobalState = {
  settings: storedSettings || initialSettings,
};

const reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case 'identity': return { ...state };
    case 'resetSettings': return { ...state, settings: initialSettings };
    case 'setSettings': return { ...state, settings: { ...state.settings, ...action.value } };

    default: throw new Error(`Action type '${action['type']}' is not valid`);
  };
};


export const StateContext = createContext<[GlobalState, React.Dispatch<Action>]>([initialState, () => null]);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(state.settings));
  }, [state]);

  return <StateContext.Provider value={[state, dispatch]} children={children} />;
};


export const useGlobalState = () => useContext(StateContext);
