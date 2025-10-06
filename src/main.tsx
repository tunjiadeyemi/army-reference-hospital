import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { AppContextProvider } from './context/AppContext.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>
);
