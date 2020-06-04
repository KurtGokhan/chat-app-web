
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
  self?: boolean;
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
    unreadMessageCount: number,
  },
  settings: GlobalSettings,
}


export interface ActionBase<K extends string> { type: K }

interface SetSettings extends ActionBase<'setSettings'> { value: Partial<GlobalSettings> }
interface ResetSettings extends ActionBase<'resetSettings'> { }

interface ReceiveMessage extends ActionBase<'receiveMessage'> { value: Message }
interface SendMessage extends ActionBase<'sendMessage'> { value: Message }
interface MarkAllMessagesRead extends ActionBase<'markAllMessagesRead'> { }

export type Action = SetSettings | ResetSettings | ReceiveMessage | MarkAllMessagesRead | SendMessage;

