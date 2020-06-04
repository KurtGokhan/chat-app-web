import React, { useCallback, useRef } from 'react';
import styles from './chat.module.scss';
import sendIcon from 'src/images/send.png';
import ChatMessage from '../chat-message/chat-message';
import { useGlobalState } from 'src/store/store';

export default function Chat() {
  const [state, dispatch] = useGlobalState();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const resetTextareaSize = useCallback(() => {
    const element = textRef.current;
    if (!element) return;
    element.style.height = '5px';
    element.style.height = (element.scrollHeight) + 'px';
  }, [textRef]);

  const onSubmit = useCallback(() => {
    if (!textRef.current) return;

    const message = textRef.current.value as string;
    if (message) {
      dispatch({ type: 'addMessage', value: { self: true, user: state.settings.name, date: Date.now(), message } });
    }

    textRef.current.value = '';
    textRef.current.focus();
    resetTextareaSize();
  }, [state, dispatch, textRef, resetTextareaSize]);

  const onKey = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const isEnter = event.keyCode === 13;
    if (!isEnter) return;

    // If shift is pressed, always perform a line-break
    if (event.shiftKey) return;

    // If sendOnCtrlEnter is on, submit when ctrl is pressed
    // If sendOnCtrlEnter is off, always submit
    // Otherwise skip
    if (!state.settings.sendOnCtrlEnter || event.ctrlKey) {
      onSubmit();
      event.preventDefault();
    }
  }, [state, onSubmit]);

  return <>
    <div className={styles.chatContent}>
      <ul>
        {state.messages.list.map((x, i) =>
          <ChatMessage message={x} key={i}></ChatMessage>
        )}
      </ul>
    </div>

    <div className={styles.chatInputSection}>
      <textarea placeholder="Enter message" rows={1} onInput={resetTextareaSize} ref={textRef} onSubmit={onSubmit} onKeyDown={onKey} />

      <button onClick={onSubmit}>
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  </>;
}
