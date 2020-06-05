import React from 'react';
import { render } from '@testing-library/react';
import Settings from './settings';
import { StateContext } from 'src/store/store';
import { GlobalState } from 'src/store/model';

describe('Settings', () => {
  it('updates state correctly', () => {
    // Arrange
    const dispatch = jest.fn();
    const state = { settings: { clock24Hours: false } } as GlobalState;

    // Act
    const { baseElement } = render(<StateContext.Provider value={[state, dispatch]}><Settings /></StateContext.Provider>);
    const radio = baseElement.querySelector('input[type=radio][name=clock]:not([checked])') as HTMLInputElement;
    radio.click();

    // Assert
    expect(dispatch).toBeCalledWith({ type: 'setSettings', value: { clock24Hours: true } });
  });
});
