import React, { createContext, useReducer } from 'react';

export interface GlobalState {
}

export type Action = { type: string };


const initialState: GlobalState = {};
export const store = createContext(initialState);
const { Provider } = store;

export const StateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer((state: GlobalState, action: Action) => {
    switch (action.type) {
      case 'identity':
        return { ...state };
      default:
        throw new Error(`Action type '${action.type}' is not valid`);
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
