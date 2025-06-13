// for inject
// import 'reflect-metadata'
import "@yanquer/common"
// global css
import "@yanquer/browser/style/css/all.css"

// bind
import '../middle'
import "./tailwindcss_.css"

import {ATheme} from "@yanquer/browser";
import {BRouter} from "./router.tsx";


export const BiuBiuApp = () => {

    return <div>
        <ATheme className={"w-screen h-screen"}>
            <BRouter />
        </ATheme>
    </div>
}

