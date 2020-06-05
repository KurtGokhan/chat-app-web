import cx from 'classnames';
import React from 'react';
import { Message } from 'src/store/model';
import { useGlobalState } from 'src/store/store';
import LinkedText from '../linked-text/linked-text';
import styles from './chat-message.module.scss';
import { format24Hours, formatAMPM } from 'src/util/date';

export interface ChatMessageProps {
  message: Message;
}

/**
 * Renders a single chat message's time, user and message content as a chat bubble
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  const [{ settings: { clock24Hours } }] = useGlobalState();
  const date = new Date(message.date);

  return <li className={cx(styles.chatMessage, { 'right-aligned': message.self })}>
    <div className="sender-info">
      <em className="time">{clock24Hours ? format24Hours(date) : formatAMPM(date)}</em>
      <span className="separator">&nbsp;&bull;&nbsp;</span>
      <span className="name">{message.user}</span>
    </div>

    <div className="bubble-container">
      <div className="bubble-arrow"></div>
      <div className="bubble">
        <LinkedText text={message.message} />
      </div>
    </div>
  </li>;
}
