
export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export enum Language {
  English = 'en',
  Turkish = 'tr',
}

export interface GlobalSettings {
  name: string,
  theme: Theme,
  clock24Hours: boolean,
  sendOnCtrlEnter: boolean,
  language: Language,
}

export interface GlobalState {
  settings: GlobalSettings,
}

export interface ActionBase<K extends string> { type: K }

export interface IdentityAction extends ActionBase<'identity'> { }

export interface SetSettingsAction extends ActionBase<'setSettings'> { value: Partial<GlobalSettings> }
export interface ResetSettingsAction extends ActionBase<'resetSettings'> { }

export type Action = IdentityAction | SetSettingsAction | ResetSettingsAction;

