import {bindToDefaultContainer} from "@yanquer/common";
import {IMessageManager} from "./service.ts";
import {MessageManager} from "./message-manager.ts";


export const bindRenderManager = () => {
    bindToDefaultContainer(IMessageManager, MessageManager)
}

bindRenderManager()
