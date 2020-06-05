
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  English = 'en',
  Turkish = 'tr',
}

export interface Message {
  readonly user: string;
  readonly message: string;
  readonly date: number;
  readonly self?: boolean;
}

export interface GlobalSettings {
  readonly name: string,
  readonly theme: Theme,
  readonly clock24Hours: boolean,
  readonly sendOnCtrlEnter: boolean,
  readonly language: Language,
}

export interface GlobalState {
  readonly messages: {
    readonly list: Message[],
    readonly unreadMessageCount: number,
  },
  readonly settings: GlobalSettings,
}


export interface ActionBase<K extends string> { type: K }

interface SetSettings extends ActionBase<'setSettings'> { value: Partial<GlobalSettings> }
interface ResetSettings extends ActionBase<'resetSettings'> { }

interface ReceiveMessage extends ActionBase<'receiveMessage'> { value: Message }
interface SendMessage extends ActionBase<'sendMessage'> { value: Message }
interface MarkAllMessagesRead extends ActionBase<'markAllMessagesRead'> { }

export type Action = SetSettings | ResetSettings | ReceiveMessage | MarkAllMessagesRead | SendMessage;

