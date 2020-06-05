import React, { useCallback } from 'react';
import styles from './settings.module.scss';
import { useGlobalState } from 'src/store/store';
import { GlobalSettings } from 'src/store/model';
import { useTranslation, Trans } from 'react-i18next';

/**
 * The component for settings page.
 * Various settings for the application can be modified in this page
 */
export default function Settings() {
  const [state, dispatch] = useGlobalState();
  const { t } = useTranslation();

  /** A helper function to set checked state and bind onChange of radio input */
  const bindRadio = useCallback((key: keyof GlobalSettings, value: string | boolean) => {
    return {
      checked: state.settings[key] === value,
      onChange: () => dispatch({ type: 'setSettings', value: { [key]: value } }),
    };
  }, [state.settings, dispatch]);

  return <div className={styles.settingsContent}>
    <div className="settings-area">
      <section>
        <label htmlFor="name">{t('User name')}</label>
        <input type="text" id="name" name="name" value={state.settings.name}
          onChange={(e) => dispatch({ type: 'setSettings', value: { name: e.target.value } })} />
      </section>

      <section>
        <label>{t('Interface color')}</label>

        <div>
          <label className="radio">
            <input type="radio" name="theme" {...bindRadio('theme', 'light')} />
            <span>{t('Light')}</span>
          </label>
          <label className="radio">
            <input type="radio" name="theme" {...bindRadio('theme', 'dark')} />
            <span>{t('Dark')}</span>
          </label>
        </div>
      </section>

      <section>
        <label>{t('Clock display')}</label>

        <div>
          <label className="radio">
            <input type="radio" name="clock" {...bindRadio('clock24Hours', false)} />
            <span>{t('12 Hours')}</span>
          </label>
          <label className="radio">
            <input type="radio" name="clock" {...bindRadio('clock24Hours', true)} />
            <span>{t('24 Hours')}</span>
          </label>
        </div>
      </section>

      <section>
        <label>
          <Trans i18nKey="Send message on CTRL+ENTER">
            Send messages on <kbd>CTRL+ENTER</kbd>
          </Trans>
        </label>

        <div>
          <label className="radio">
            <input type="radio" name="send" {...bindRadio('sendOnCtrlEnter', true)} />
            <span>{t('On')}</span>
          </label>
          <label className="radio">
            <input type="radio" name="send" {...bindRadio('sendOnCtrlEnter', false)} />
            <span>{t('Off')}</span>
          </label>
        </div>
      </section>

      <section>
        <label htmlFor="language">{t('Language')}</label>

        <select name="language" id="language" value={state.settings.language}
          onChange={(e) => dispatch({ type: 'setSettings', value: { language: e.target.value as any } })} >
          <option value="en">English</option>
          <option value="tr">Türkçe</option>
        </select>
      </section>

      <div className="settings-spacer" />

      <button onClick={() => dispatch({ type: 'resetSettings' })}>{t('Reset to defaults')}</button>
    </div>
  </div>;
}
