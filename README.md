## 📦 What is own.tiles?

own.tiles is a typescript library for easily creating, configuring and integrating web widgets into React projects and websites.

## 🚀 Quick Start Example Website

### 1. Clone the repository

```bash
git clone https://github.com/own-page/own.tiles.git
```

### 2. Install dependencies

```bash
cd own.tiles && npm i
```

### 3. Run next.js server

```bash
npm run dev
```

## ⚛️ Quick Start for React

### 1. Install own.tiles via [npm](https://www.npmjs.com/):

```bash
npm install git+https://github.com/own-page/own.tiles.git
```

### 2. Import own.tiles:

```ts
import { widgets } from 'own.tiles';
```

### 3. Use in your tsx files:

```tsx
return <widgets.XYZ />;
```

## 🛠️ Developer Guide

### Widget Configuration

Each widget in own.tiles is configured using a standardized structure. Here's what you can define:

```typescript
type TileInfo = {
  // Unique identifier for the widget
  name: string;
  // Licensing information
  license: {
    type: string;
    fullText: string;
  };
  // Widget author details
  author: {
    name: string;
    url: string;
  };
  // A11Y compliance info
  accessibility: {
    rating: string;
    standard: string;
  };
  // Cookie usage details
  cookieInformation: {
    type: string;
    description: string;
  }[];
  // Source domain of external content
  origin: string;
  // Minimum widget dimensions
  minDimensions: {
    w: number;
    h: number;
  };
  // Widget properties
  props: Record<string, PropInfo>;
  // The actual React component
  Component: React.ComponentType;
};
```

### Automatic Type Handling

own.tiles automatically generates appropriate input controls based on prop types:

- `string`: Renders a text input field with optional icon
- `boolean`: Renders a toggle switch
- `string[]`: Renders a dropdown with predefined options

Properties can be configured with additional options:

```typescript
type PropInfo = {
  type: 'string' | 'boolean' | string[]; // Property type
  description?: string; // Help text
  slowLoad?: boolean; // Enables debounced updates
};
```

### Example Widget Implementation

Here's a minimal example of a custom widget:

```typescript
import { type RawTileInfo } from 'own.tiles';

type Props = {
  text: string;
  enabled: boolean;
};

export const MyWidget = (props: Props) => {
  return <div>{props.enabled ? props.text : 'Disabled'}</div>;
};

export const tile: RawTileInfo<'mywidget', Props> = {
  name: 'mywidget',
  license: { type: 'MIT', fullText: 'MIT' },
  author: {
    name: 'Your Name',
    url: 'https://example.com'
  },
  accessibility: {
    rating: 'AA',
    standard: 'WCAG 2.1'
  },
  cookies: {
    type: 'necessary'
    description: 'Essential for running the widget properly.'
  }
  props: {
    text: { type: 'string', description: 'Display text' },
    enabled: { type: 'boolean', description: 'Enable/disable widget' }
  },
  Component: memo(MyWidget)
};
```
