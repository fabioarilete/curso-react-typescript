import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts";
import { MenuLateraL } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <MenuLateraL>
          <AppRoutes />
        </MenuLateraL>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
