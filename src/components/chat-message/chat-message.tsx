import React from 'react';
import styles from './chat-message.module.scss';
import cx from 'classnames';

export interface ChatMessageProps {
  rightAligned?: boolean;
}

export default function ChatMessage(props: ChatMessageProps) {
  return <li className={cx(styles.chatMessage, { 'right-aligned': props.rightAligned })}>
    <div className="bubble-container">
      <div className="bubble-arrow"></div>
      <div className="bubble">
        Heasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd fHeasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd fHeasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd fHeasdfasdfsdfsdfa asdf sadf ds fsdaf sdaf sd f
    </div>
    </div>
  </li>;
}
