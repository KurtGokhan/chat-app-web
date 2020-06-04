import React from 'react';
import styles from './chat-message.module.scss';
import cx from 'classnames';

export interface ChatMessageProps {
  rightAligned?: boolean;
}

export default function ChatMessage(props: ChatMessageProps) {
  return <li className={cx(styles.chatMessage, { 'right-aligned': props.rightAligned })}>
    <div className="sender-info">
      <em className="time">{'22:12'}</em>
      <span className="separator">&nbsp;&bull;&nbsp;</span>
      <span className="name">{'Person name'}</span>
    </div>
    <div className="bubble-container">
      <div className="bubble-arrow"></div>
      <div className="bubble">
        Heasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd fHeasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd fHeasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd fHeasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd f
    </div>
    </div>
  </li>;
}
