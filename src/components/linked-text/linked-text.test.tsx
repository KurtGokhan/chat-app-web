import React from 'react';
import { render } from '@testing-library/react';
import LinkedText from './linked-text';

describe('LinkedText', () => {
  it('renders plain text', () => {
    const text = `Some text and some other text`;
    const { baseElement } = render(<LinkedText text={text} />);

    expect(baseElement).toHaveTextContent(text);
    expect(baseElement.querySelector('a')).toBeFalsy();
    expect(baseElement.querySelector('img')).toBeFalsy();
    expect(baseElement.querySelector('iframe')).toBeFalsy();
  });

  it('renders image links as img', () => {
    // Arrange
    const imageUrl = 'https://www.google.com.tr/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    const text = `Some text ${imageUrl} some other text`;

    // Act
    const { baseElement } = render(<LinkedText text={text} />);

    // Assert
    expect(baseElement).toHaveTextContent(text);

    const image = baseElement.querySelector('img');
    expect(image?.src).toEqual(imageUrl);
  });

  it('renders youtube links as iframe', () => {
    // Arrange
    const text = 'Some text https://www.youtube.com/watch?v=dQw4w9WgXcQ some other text';
    const embedUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

    // Act
    const { baseElement } = render(<LinkedText text={text} />);

    // Assert
    expect(baseElement).toHaveTextContent(text);

    const iframe = baseElement.querySelector('iframe');
    expect(iframe?.src).toEqual(embedUrl);
  });

  it('renders other links as anchor', () => {
    const url = 'http://google.com/';
    const text = `Some text ${url} some other text`;

    const { baseElement } = render(<LinkedText text={text} />);

    expect(baseElement).toHaveTextContent(text);
    const anchor = baseElement.querySelector('a');
    expect(anchor?.href).toEqual(url);
  });

  it('prepends protocol is missing', () => {
    const url = 'google.com/';
    const text = `Some text ${url} some other text`;

    const { baseElement } = render(<LinkedText text={text} />);

    expect(baseElement).toHaveTextContent(text);
    const anchor = baseElement.querySelector('a');
    expect(anchor?.href).toEqual('http://' + url);
  });
});
