import {bindToDefaultContainer} from "@yanquer/common";
import {IMessageManager} from "./service.ts";
import {MessageManager} from "./message-manager.ts";
import {BiuManager} from "./biu-manager.ts";
import {CacheManager} from "./cache-manager.ts";


export const bindRenderManager = () => {
    bindToDefaultContainer(IMessageManager, MessageManager)
    bindToDefaultContainer(BiuManager, BiuManager)
    bindToDefaultContainer(CacheManager, CacheManager)
}

bindRenderManager()
