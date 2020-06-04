import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { GlobalState, Action, Theme, Language, GlobalSettings, Message } from './model';
import { socket } from './socket';

const generateRandomName = () => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000).toFixed(0);
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
  messages: {
    list: [],
    lastSeen: 0,
  },
  settings: storedSettings || initialSettings,
};



const reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case 'resetSettings': return { ...state, settings: initialSettings };
    case 'setSettings': return { ...state, settings: { ...state.settings, ...action.value } };

    case 'addMessage': return { ...state, messages: { list: [...state.messages.list, action.value], lastSeen: Date.now() } };
    case 'sendMessage': return { ...state, messages: { list: [...state.messages.list, { ...action.value, self: true }], lastSeen: Date.now() } };
    case 'updateLastSeen': return { ...state, messages: { ...state.messages, lastSeen: Date.now() } };

    default: throw new Error(`Action type '${action['type']}' is not valid`);
  };
};


export const StateContext = createContext<[GlobalState, React.Dispatch<Action>]>([initialState, () => null]);

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(state.settings));
  }, [state]);

  useEffect(() => {
    socket.on('message', (msg: Message) => { dispatch({ type: 'addMessage', value: msg }) });
  }, []);

  return <StateContext.Provider value={[state, dispatch]} children={children} />;
};


export const useGlobalState = () => useContext(StateContext);
