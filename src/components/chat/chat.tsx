import React from 'react';
import styles from './chat.module.scss';
import sendIcon from 'src/images/send.png';
import ChatMessage from '../chat-message/chat-message';

export default function Chat() {
  return <>
    <div className={styles.chatContent}>
      <ul>
        <ChatMessage></ChatMessage>
        <ChatMessage></ChatMessage>
        <ChatMessage></ChatMessage>
        <ChatMessage rightAligned></ChatMessage>
        <ChatMessage rightAligned></ChatMessage>
      </ul>
    </div>

    <div className={styles.chatInputSection}>
      <textarea placeholder="Enter message" rows={1} onInput={(event) => {
        const element = event.target as HTMLElement;
        element.style.height = '5px';
        element.style.height = (element.scrollHeight) + 'px';
      }} />

      <button>
        <img src={sendIcon} alt="Send" />
      </button>
    </div>
  </>;
}
