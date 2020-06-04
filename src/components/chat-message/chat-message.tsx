import cx from 'classnames';
import React from 'react';
import { Message } from 'src/store/model';
import { useGlobalState } from 'src/store/store';
import LinkedText from '../linked-text/linked-text';
import styles from './chat-message.module.scss';

export interface ChatMessageProps {
  message: Message;
}

function formatAMPM(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + ampm;
}

function format24Hours(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours}:${minutes}`;
}

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
