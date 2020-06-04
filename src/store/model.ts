
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  English = 'en',
  Turkish = 'tr',
}

export interface Message {
  user: string;
  message: string;
  date: number;
  self: boolean;
}

export interface GlobalSettings {
  name: string,
  theme: Theme,
  clock24Hours: boolean,
  sendOnCtrlEnter: boolean,
  language: Language,
}

export interface GlobalState {
  messages: {
    list: Message[],
    lastSeen: number,
  },
  settings: GlobalSettings,
}


export interface ActionBase<K extends string> { type: K }

export interface SetSettingsAction extends ActionBase<'setSettings'> { value: Partial<GlobalSettings> }
export interface ResetSettingsAction extends ActionBase<'resetSettings'> { }

export interface AddMessageAction extends ActionBase<'addMessage'> { value: Message }
export interface UpdateLastSeenAction extends ActionBase<'updateLastSeen'> { }

export type Action = SetSettingsAction | ResetSettingsAction | AddMessageAction | UpdateLastSeenAction;

