import {RouterProvider} from "react-router-dom";
import Routes from "@/Routes.tsx";
import {ThemeProvider} from "@/components/theme-provider/ThemepProvider.tsx";

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={Routes()}/>
        </ThemeProvider>
    );
};

export default App;
