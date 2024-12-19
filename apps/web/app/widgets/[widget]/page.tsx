'use client';

import { notFound, useParams, useSearchParams } from 'next/navigation';
import { widgets } from 'own.tiles';
import 'own.tiles/style.css';

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
    const minDimensions = 'minDimensions' in Tile ? Tile.minDimensions : null;
    const height = minDimensions
      ? (typeof minDimensions === 'function'
          ? minDimensions({}).h
          : minDimensions.h) * 96
      : 288;
    return height;
  };

  const height = getHeight();

  return (
    <div className="overflow-hidden" style={{ height }}>
      <Tile.Component {...props} />
    </div>
  ); // Render the tile with props
};

export default WidgetPage;
