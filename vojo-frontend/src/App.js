import React from 'react';
import AppRouter from './routes/AppRouter';

import { ThemeProvider } from '@mindlab-vojo/component-library'

function App() {
  return (
    <ThemeProvider>
      <AppRouter/>
    </ThemeProvider>
  );
}

export default App;
