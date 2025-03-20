import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { MenuLateraL } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateraL>
            <AppRoutes />
          </MenuLateraL>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
