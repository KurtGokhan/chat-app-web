import cx from 'classnames';
import React from 'react';
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom';
import { useGlobalState } from 'src/store/store';
import Chat from '../chat/chat';
import Settings from '../settings/settings';
import styles from './app.module.scss';


export default function App() {
  const [{ settings: { theme }, messages: { unreadMessageCount } }] = useGlobalState();

  return (
    <Router>
      <div className={cx(styles.app, 'app-root', theme)}>
        <nav className={styles.nav}>
          <NavLink activeClassName="active" exact to="/" >
            Chat
            {unreadMessageCount > 0 && <span className="notification">{unreadMessageCount}</span>}
          </NavLink>
          <NavLink activeClassName="active" to="/settings">Settings</NavLink>
        </nav>

        <Switch>
          <Route path="/settings" component={Settings} />
          <Route exact path="/" component={Chat} />
        </Switch>
      </div>
    </Router>
  );
}
