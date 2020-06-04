import React, { useCallback } from 'react';
import styles from './settings.module.scss';
import { useGlobalState } from 'src/store/store';
import { GlobalSettings } from 'src/store/model';

export default function Settings() {
  const [state, dispatch] = useGlobalState();

  const bindRadio = useCallback((key: keyof GlobalSettings, value: string | boolean) => {
    return {
      checked: state.settings[key] === value,
      onChange: () => dispatch({ type: 'setSettings', value: { [key]: value } }),
    };
  }, [state.settings, dispatch]);

  return <>
    <div className={styles.settingsContent}>
      <section>
        <label htmlFor="name">User name</label>
        <input type="text" id="name" name="name" value={state.settings.name}
          onChange={(e) => dispatch({ type: 'setSettings', value: { name: e.target.value } })} />
      </section>

      <section>
        <label>Interface color</label>

        <div>
          <label className="radio">
            <input type="radio" name="theme" {...bindRadio('theme', 'light')} />
            Light
          </label>
          <label className="radio">
            <input type="radio" name="theme" {...bindRadio('theme', 'dark')} />
            Dark
          </label>
        </div>
      </section>

      <section>
        <label>Clock display</label>

        <div>
          <label className="radio">
            <input type="radio" name="clock" {...bindRadio('clock24Hours', false)} />
            12 Hours
          </label>
          <label className="radio">
            <input type="radio" name="clock" {...bindRadio('clock24Hours', true)} />
            24 Hours
          </label>
        </div>
      </section>

      <section>
        <label>Send messages on <kbd>CTRL+ENTER</kbd></label>

        <div>
          <label className="radio">
            <input type="radio" name="send" {...bindRadio('sendOnCtrlEnter', true)} />
            On
          </label>
          <label className="radio">
            <input type="radio" name="send" {...bindRadio('sendOnCtrlEnter', false)} />
            Off
          </label>
        </div>
      </section>

      <section>
        <label htmlFor="language">Language</label>

        <select name="language" id="language" value={state.settings.language}
          onChange={(e) => dispatch({ type: 'setSettings', value: { language: e.target.value as any } })} >
          <option value="en">English</option>
          <option value="tr">Turkish</option>
        </select>
      </section>

      <div className="settings-spacer" />

      <button onClick={() => dispatch({ type: 'resetSettings' })}>Reset to defaults</button>
    </div>
  </>;
}
