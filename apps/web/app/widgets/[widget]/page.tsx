/* eslint-disable react/prop-types */
'use client';

import { notFound, useParams, useSearchParams } from 'next/navigation';
import { widgets } from '@own.page/own.tiles';

// type LowerCaseWidgets = {
//   [K in keyof typeof widgets as Lowercase<K & string>]: (typeof widgets)[K];
// };

const lowerCaseWidgets = Object.fromEntries(
  Object.entries(widgets).map(([key, value]) => [key.toLowerCase(), value])
);

const WidgetPage = () => {
  const { widget } = useParams(); // Get the widget slug from the params
  const searchParams = useSearchParams();
  const props = Object.fromEntries(searchParams.entries());

  const Tile = lowerCaseWidgets[widget as keyof typeof lowerCaseWidgets]; // Get the tile based on the slug

  if (!Tile) notFound();

  const getHeight = () => {
    // Try to get height from search params first
    const heightParam = searchParams.get('height');
    if (heightParam) {
      return parseInt(heightParam, 10);
    }

    // Fall back to min dimensions
    const minDimensions = 'minDimensions' in Tile ? Tile.minDimensions : null;
    const height = minDimensions
      ? (typeof minDimensions === 'function'
          ? minDimensions({}).h
          : minDimensions.h) * 96
      : 288;
    return height;
  };

  const getWidth = () => {
    // Try to get width from search params first
    const widthParam = searchParams.get('width');
    if (widthParam) {
      return parseInt(widthParam, 10);
    }

    // Fall back to min dimensions
    const minDimensions = 'minDimensions' in Tile ? Tile.minDimensions : null;
    const width = minDimensions
      ? (typeof minDimensions === 'function'
          ? minDimensions({}).w
          : minDimensions.w) * 96
      : 288;
    return width;
  };

  const height = getHeight();
  const width = getWidth();

  return (
    <div className="overflow-hidden" style={{ height, width }}>
      <Tile.Component {...props} />
    </div>
  );
};

export default WidgetPage;
