import {RouterProvider} from "react-router-dom";
import Routes from "@/Routes.tsx";

const App = () => {
    return (
        <RouterProvider router={Routes()}/>
    );
};

export default App;
