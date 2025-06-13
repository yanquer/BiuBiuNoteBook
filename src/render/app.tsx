// for inject
// import 'reflect-metadata'
import "@yanquer/common"
// global css
import "@yanquer/browser/style/css/all.css"

// bind
import '../middle'
import './manager'
import "./tailwindcss_.css"

import {ATheme, BlurBgBox, DragHeader} from "@yanquer/browser";
import {BRouter} from "./router.tsx";
import {GlobalTips} from "./components/global-tips.tsx";
import {AppManager} from "./manager/app-manager.ts";


export const BiuBiuApp = () => {

    return <div className={"overflow-hidden"}>
        <ATheme className={"w-screen h-screen rounded-xl"} >
            <BlurBgBox
                defaultImg={"/images/bg.png"}
                // className={"w-screen h-screen rounded-xl"}
            >
                <div className={"w-full pl-2 h-8 fixed z-99 hidden md:block"} >
                    <DragHeader title={"BiuBiu日记"}
                                closeHandler={() => AppManager.quitApp()}
                    ></DragHeader>
                </div>
                <BRouter />
                <GlobalTips />
            </BlurBgBox>
        </ATheme>
    </div>
}

