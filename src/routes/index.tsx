import { Button } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { UseAppThemeContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { toggleTheme } = UseAppThemeContext();

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <Button variant="contained" color="primary" onClick={toggleTheme}>
            TOGGLE THEME
          </Button>
        }
      />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
