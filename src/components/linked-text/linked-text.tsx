import anchorme from 'anchorme';
import React from 'react';
import { ListingProps } from 'anchorme/dist/node/types';

const imageRegex = /.*\.(png|jpg|gif)$/;
const youtubeRegex = /youtube\.com\/watch\?v=/;
const youtubeReplacer = /.*watch\?v=(.*)$/;

export default function LinkedText({ text }: { text: string }) {
  const toRender: React.ReactNode[] = [];
  const media: React.ReactNode[] = [];

  let toParse = text;
  const links = anchorme.list(text);

  let prevLink: ListingProps = null as any;
  for (const link of links) {
    const prevText = text.substring(prevLink?.end || 0, link.start);
    const nextText = text.substring(link.end);

    prevLink = link;

    if (prevText) toRender.push(<span key={toRender.length}>{prevText}</span>);
    toParse = nextText;

    const key = toRender.length;

    let href = link.string;

    if (link.isURL) {
      if (!href.startsWith('http')) {
        href = `//${href}`;
      }
    } else if (link.isEmail) {
      href = `mailto:${href}`;
    }

    toRender.push(<a href={href} key={key} rel="noopener noreferrer" target="_blank">{link.string}</a>);

    if (imageRegex.test(href)) {
      media.push(<img key={media.length} src={href} alt={href} />);
    } else if (youtubeRegex.test(href)) {
      media.push(<div className="video-container" key={media.length} >
        <iframe src={`https://www.youtube.com/embed/${href.replace(youtubeReplacer, '$1')}`} title="Youtube"
          frameBorder={0} allowFullScreen allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
      </div>);
    }
  }

  if (toParse) toRender.push(toParse);

  return <>
    {toRender}
    {media}
  </>;
}
