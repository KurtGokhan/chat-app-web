import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { GlobalState, Action, Theme, Language, GlobalSettings, Message } from './model';
import { socket } from './socket';
import { useTranslation } from 'react-i18next';
import { storedSettings, saveStoredData } from './storage';

const generateRandomName = () => {
  const randomNumber = Math.floor(1000 + Math.random() * 9000).toFixed(0);
  return `guest${randomNumber}`
};

export const initialSettings: GlobalSettings = {
  name: generateRandomName(),
  theme: Theme.Light,
  clock24Hours: false,
  language: Language.English,
  sendOnCtrlEnter: false,
};

export const initialState: GlobalState = {
  messages: {
    list: [],
    unreadMessageCount: 0,
  },
  settings: storedSettings || initialSettings,
};



export const reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case 'resetSettings': return { ...state, settings: initialSettings };
    case 'setSettings': return { ...state, settings: { ...state.settings, ...action.value } };

    case 'receiveMessage': return {
      ...state, messages: {
        list: [...state.messages.list, action.value],
        unreadMessageCount: state.messages.unreadMessageCount + 1,
      }
    };
    case 'sendMessage': return { ...state, messages: { ...state.messages, list: [...state.messages.list, { ...action.value, self: true }] } };
    case 'markAllMessagesRead': return { ...state, messages: { ...state.messages, unreadMessageCount: 0 } };

    default: throw new Error(`Action type '${action['type']}' is not valid`);
  };
};


export const StateContext = createContext<[GlobalState, React.Dispatch<Action>]>([initialState, () => null]);

/**
 * Wrapper component for providing the global state context to children
 */
export function StateProvider({ children }: React.PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { i18n } = useTranslation();

  // Propagate language change
  useEffect(() => {
    i18n.changeLanguage(state.settings.language);
  }, [i18n, state.settings.language]);

  // Save settings to storage when they change
  useEffect(() => {
    saveStoredData('settings', state.settings);
  }, [state.settings]);

  // When a message is received from the socket, dispatch the action `receiveMessage`
  useEffect(() => {
    socket.on('message', (msg: Message) => { dispatch({ type: 'receiveMessage', value: msg }) });
  }, []);

  // Wrap the children with the state context
  return <StateContext.Provider value={[state, dispatch]} children={children} />;
};

/**
 * React hook for returning the `state` and `dispatch` for the global state
 */
export const useGlobalState = () => useContext(StateContext);
