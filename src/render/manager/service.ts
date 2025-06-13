import {Event} from "@yanquer/common";

import {IMessageContent} from "./models";


/// 应用内通知管理
export const IMessageManager = Symbol.for('IMessageManager')
export interface IMessageManager{
    didOpenTipEvent: Event<IMessageContent[]>
    closeOneTipByTime(timeId?: number): void

    info(msg: string | IMessageContent): Promise<void>
    warn(msg: string | IMessageContent): Promise<void>
    error(msg: string | IMessageContent): Promise<void>

}



