import React from 'react';
import { render } from '@testing-library/react';
import Chat from './chat';
import { StateContext, initialSettings } from 'src/store/store';
import { GlobalState, Message } from 'src/store/model';

describe('Chat', () => {
  const sampleMessage: Message = { date: Date.now(), user: 'Test user', message: 'Test message' };

  it('sends messages correctly', () => {
    // Arrange
    const testUser = 'My test user';
    const messageContent = 'My test Message';

    const dispatch = jest.fn();
    const state = {
      settings: { ...initialSettings, name: testUser },
      messages: { unreadMessageCount: 0, list: [sampleMessage] },
    } as GlobalState;

    // Act
    const { baseElement } = render(<StateContext.Provider value={[state, dispatch]}><Chat /></StateContext.Provider>);

    const textarea = baseElement.querySelector('textarea') as HTMLTextAreaElement;
    textarea.value = messageContent;

    const button = baseElement.querySelector('button') as HTMLButtonElement;
    button.click();

    // Assert
    expect(dispatch.mock.calls[1][0]).toMatchObject({ type: 'sendMessage', value: { message: messageContent, user: testUser } });
  });
});
