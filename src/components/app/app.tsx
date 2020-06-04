import React from 'react';
import styles from './app.module.scss';
import { Switch, Route, HashRouter as Router, NavLink } from 'react-router-dom';
import Chat from '../chat/chat';
import Settings from '../settings/settings';
import cx from 'classnames';
import { useGlobalState } from 'src/store/store';

export default function App() {
  const [{ settings: { theme } }] = useGlobalState();

  return (
    <Router>
      <div className={cx(styles.app, 'app-root', theme)}>
        <nav className={styles.nav}>
          <NavLink activeClassName="active" exact to="/" >Chat</NavLink>
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
