import React from 'react';
import styles from './settings.module.scss';

export default function Settings() {
  return <>
    <div className={styles.settingsContent}>
      <section>
        <label htmlFor="name">User name</label>
        <input type="text" id="name" name="name" />
      </section>

      <section>
        <label>Interface color</label>

        <div>
          <label className="radio"><input type="radio" name="theme" /> Light</label>
          <label className="radio"><input type="radio" name="theme" /> Dark</label>
        </div>
      </section>

      <section>
        <label>Clock display</label>

        <div>
          <label className="radio"><input type="radio" name="clock" /> 12 Hours</label>
          <label className="radio"><input type="radio" name="clock" /> 24 Hours</label>
        </div>
      </section>

      <section>
        <label>Send messages on <kbd>CTRL+ENTER</kbd></label>

        <div>
          <label className="radio"><input type="radio" name="send" /> On</label>
          <label className="radio"><input type="radio" name="send" /> Off</label>
        </div>
      </section>

      <section>
        <label htmlFor="language">Language</label>

        <select name="language" id="language">
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
      </section>

      <div className="settings-spacer" />

      <button>Reset to defaults</button>
    </div>
  </>;
}
