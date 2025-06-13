import {relaunch, exit, } from "@tauri-apps/plugin-process";


export namespace AppManager{
    export const quitApp = (code=0) => exit(code)
    export const restartApp = () => relaunch()
}

