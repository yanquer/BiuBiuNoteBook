import {ReactNode} from "react";
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import {Welcome} from "./pages/welcome.tsx";
import {Home} from "./pages/home.tsx";

export enum RouterPath {
    INDEX = "/",
    WELCOME = "/welcome",
    HOME = "/home"
}

export const BRouter = (): ReactNode => {

    const a=  <Routes>
        <Route index element={<Welcome />} />
        <Route path={RouterPath.WELCOME} element={<Welcome />} />
        <Route path={RouterPath.HOME} element={<Home />} />
    </Routes>

    return <BrowserRouter>
        {a}
    </BrowserRouter>
}

export const RouterLink = ({path, name}: {
    path: RouterPath,
    name: ReactNode,
}) => {
    return <Link to={path}>{name}</Link>
}
