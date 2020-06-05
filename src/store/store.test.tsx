import { reducer, initialSettings, initialState } from './store';
import { GlobalState, GlobalSettings, Theme, Message } from './model';

describe('Store reducer', () => {
  it('handles resetSettings action correctly', () => {
    const state: GlobalState = { ...initialState, settings: {} as any };
    const result = reducer(state, { type: 'resetSettings' });

    expect(result.settings).toEqual(initialSettings);
  });

  it('handles setSettings action correctly', () => {
    const testUserName = 'Test user name $$$';
    const testSettings: Partial<GlobalSettings> = { theme: Theme.Dark, name: testUserName };
    const result = reducer(initialState, { type: 'setSettings', value: testSettings });

    expect(result.settings).toEqual({ ...initialSettings, theme: 'dark', name: testUserName });
  });

  it('handles sendMessage action correctly', () => {
    const testMessage: Message = { message: 'Test message *324$#!', date: Date.now(), user: 'Test user $!*-' };
    const result = reducer(initialState, { type: 'sendMessage', value: testMessage });

    expect(result.messages.list[0]).toEqual({ ...testMessage, self: true });
  });

  it('handles receiveMessage action correctly', () => {
    const testMessage: Message = { message: 'Test message *324$#!', date: Date.now(), user: 'Test user $!*-' };
    const result = reducer(initialState, { type: 'receiveMessage', value: testMessage });

    expect(result.messages.list[0]).toEqual({ ...testMessage });
  });

  it('handles markAllMessagesRead action correctly', () => {
    const state: GlobalState = { ...initialState, messages: { ...initialState.messages, unreadMessageCount: 5 } };
    const result = reducer(state, { type: 'markAllMessagesRead' });

    expect(result.messages.unreadMessageCount).toEqual(0);
  });
});
