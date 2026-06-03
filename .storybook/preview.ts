import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'

import { THEME_IDS, setTheme, type ThemeId } from '../src/theme'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
  globalTypes: {
    palette: {
      description: 'Color palette theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEME_IDS.map((value) => ({
          value,
          title: value.charAt(0).toUpperCase() + value.slice(1),
        })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    palette: 'ink',
  },
  decorators: [
    (Story, { globals }) => {
      const palette = (globals.palette as ThemeId | undefined) ?? 'ink'

      useEffect(() => {
        setTheme(palette)
      }, [palette])

      return Story()
    },
  ],
}

export default preview;
