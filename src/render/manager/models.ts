import {ReactNode} from "react";

export interface IMessageContent {
    // 时间戳
    timeId?: number,

    title?: string,
    desc?: string,
    content: ReactNode
    level?: "info" | "warning" | "error"
    sureBtnClick?: () => void,
    cancelBtnClick?: () => void,
    // 自动关闭时间, 单位 ms
    autoCloseTime?: number
}

