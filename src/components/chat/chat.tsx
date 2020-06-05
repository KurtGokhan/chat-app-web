import React, { useCallback, useRef, useEffect } from 'react';
import styles from './chat.module.scss';
import sendIcon from 'src/assets/send.png';
import ChatMessage from '../chat-message/chat-message';
import { useGlobalState } from 'src/store/store';
import { sendMessage } from 'src/store/socket';
import emoticons from 'src/assets/emoticons.json';
import { useTranslation } from 'react-i18next';

/**
 * The component for chat page.
 * It shows the chat message stream and allows messages to be sent
 */
export default function Chat() {
  const [state, dispatch] = useGlobalState();
  const { t } = useTranslation();

  const textRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    dispatch({ type: 'markAllMessagesRead' });

    const handle = setInterval(() => {
      console.log('check timeout');

      const scroll = scrollRef.current;
      if (!scroll) return;

      if ((scroll.scrollTop + scroll.offsetHeight + 20) >= scroll.scrollHeight) {
        dispatch({ type: 'markAllMessagesRead' });
      }
    }, 3000);

    return () => clearInterval(handle);
  }, [dispatch, scrollRef]);


  const scrollToBottom = useCallback(() => {
    const scroll = scrollRef.current;
    if (!scroll) return;

    scroll.scrollTo(0, scroll.scrollHeight);
  }, [scrollRef]);

  const resetTextareaSize = useCallback(() => {
    const element = textRef.current;
    if (!element) return;
    element.style.height = '5px';
    element.style.height = (element.scrollHeight) + 'px';
  }, [textRef]);


  const onSubmit = useCallback(() => {
    if (!textRef.current) return;

    const message = (textRef.current.value || '' as string).trim();
    if (message) {
      const msg = { user: state.settings.name, date: Date.now(), message };
      dispatch({ type: 'sendMessage', value: msg });
      sendMessage(msg);

      textRef.current.value = '';
      setTimeout(scrollToBottom, 100);
    }

    textRef.current.focus();
    resetTextareaSize();
  }, [state, textRef, dispatch, resetTextareaSize, scrollToBottom]);


  const onInput = useCallback(() => {
    if (!textRef.current) return;

    let value = textRef.current.value;

    for (const [search, emoji] of emoticons) {
      if (value.endsWith(search)) value = value.replace(search, emoji);
    }

    textRef.current.value = value;
    resetTextareaSize();
  }, [textRef, resetTextareaSize]);


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
    <div className={styles.chatContent} ref={scrollRef}>
      <ul>
        {state.messages.list.map((x, i) =>
          <ChatMessage message={x} key={i}></ChatMessage>
        )}
      </ul>
    </div>

    <div className={styles.chatInputSection}>
      <textarea placeholder={t('Enter message')} rows={1} onInput={onInput} ref={textRef} onSubmit={onSubmit} onKeyDown={onKey} autoFocus />

      <button onClick={onSubmit}>
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  </>;
}
