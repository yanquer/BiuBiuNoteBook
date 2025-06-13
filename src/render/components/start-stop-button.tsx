// import {ChevronRightIcon} from "@radix-ui/react-icons";
import {Text} from "@radix-ui/themes";
import {AIconButton} from "./a-icon-button.tsx";
import {useEffect, useState} from "react";
import {BiuManager} from "../manager/biu-manager.ts";
import {formatTimerStr} from "@yanquer/common";

export const StartStopButton = () => {

    const [isStart, setIsStart] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        return BiuManager.shared()?.timeCountChangeEvent(d => setCurrentTime(d));
    }, [])

    const strTime = formatTimerStr(currentTime)

    return <AIconButton
        width={"72px"}
        height={"36px"}
        // @ts-ignore
        onClick={event => {
            const biu = BiuManager.shared()
            const _isStart = isStart
            setIsStart(!_isStart);
            _isStart ? biu?.stop() : biu?.start()
        }}
    >
        {/*<ChevronRightIcon color={"white"} />*/}
        {
            strTime ?
                <Text color={"gray"} size={"1"}>{strTime}</Text> :
                <Text color={"gray"} size={"4"}>{isStart ? "停止" : "开始"}</Text>

        }
    </AIconButton>
}
