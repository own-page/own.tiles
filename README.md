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
  // Minimum widget dimensions (in grid units, 1 unit = 96px)
  minDimensions: {
    w: number; // width in units
    h: number; // height in units
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

### Advanced Widget Features

#### Debounced Properties

Properties marked with `slowLoad: true` will use debounced updates to prevent excessive re-renders:

```typescript
props: {
  link: {
    type: 'string',
    description: 'Video URL',
    slowLoad: true  // Updates after 2 second delay
  }
}
```

#### Automatic Input Icons

The PropsForm system automatically maps icons to common property names:

- `username` → User icon
- `link` → Link icon
- `theme` → Palette icon

#### Clipboard Integration

Text inputs automatically handle system-wide paste events for the first input field, making it easy to paste content from anywhere.

#### Widget Dimensions

Widgets use a grid-based sizing system:

- 1 unit = 96px
- Default width: 5.5 units (528px)
- Default height: 3 units (288px)
- Width options: 1-10 units (96px-960px)
- Height options: 1-10 units (96px-960px)

You can specify dimensions in two ways:

1. Via URL parameters: `?width=528&height=288`
2. Via component props: `width={528} height={288}`

The widget will respect:

1. URL parameters first
2. Component props second
3. Fall back to minimum dimensions defined in the widget config

### Widget Best Practices

#### Accessibility

- Always provide ARIA labels for interactive elements
- Use semantic HTML elements
- Include proper contrast ratios
- Example:

```typescript
<IFrame
  title="YouTube video player"
  aria-label="YouTube video content"
  // ... other props
/>
```

#### Performance

- Use `memo()` for widget components to prevent unnecessary re-renders
- Implement `slowLoad` for properties that trigger expensive operations
- Use lazy loading for iframes: `loading="lazy"`

#### Security

- Always validate external URLs before using them
- Implement proper sandbox attributes for iframes
- Example URL validation:

```typescript
const parseLink = (rawLink: string) => {
  try {
    const url = new URL(rawLink);
    if (!ALLOWED_DOMAINS.includes(url.hostname)) {
      console.error('Invalid domain:', rawLink);
      return '';
    }
    // ... additional validation
  } catch (error) {
    console.error('Invalid URL:', rawLink);
    return '';
  }
};
```

#### Cookie Compliance

Define cookie usage clearly in the widget configuration:

```typescript
cookieInformation: [
  {
    type: 'necessary',
    description: 'Required for core functionality'
  },
  {
    type: 'analytics',
    description: 'Used for performance monitoring'
  }
];
```

### Integration Examples

#### With Next.js

```tsx
import { widgets } from 'own.tiles';

export default function Page() {
  return (
    <div className="widget-container">
      <widgets.YouTube
        link="https://youtube.com/watch?v=..."
        // Optional: Override default dimensions
        width={528} // 5.5 units (default max width)
        height={288} // 3 units
      />
    </div>
  );
}
```

#### With Custom Styling

Widgets support standard CSS customization through CSS variables:

```css
.widget-container {
  --tile-radius: 12px; /* Border radius for widgets */
  /* Add other custom variables as needed */
}
```

### Troubleshooting

Common issues and solutions:

- If widgets don't render, check that all required props are provided
- For iframe content issues, verify that proper permissions are set in `allow` attribute
- Performance issues might require implementing `slowLoad` for expensive props
