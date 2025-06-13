

/// 数据统计
import {MiniCard} from "./mini-card.tsx";
import {Grid} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import {BiuManager, RecordAnalyze} from "../manager/biu-manager.ts";
import {formatTime, Logger} from "@yanquer/common";


export const StatisticsData = () => {

    const [recordData, setRecordData] = useState<RecordAnalyze|undefined>(undefined);

    useEffect(() => {
        const biuManager = BiuManager?.shared()
        const data = biuManager?.cacheAnalyze
        setRecordData(data)

        return biuManager?.biuDataChangeEvent2(dt => {
            Logger.debug("biuDataChangeEvent2: ", dt)
            setRecordData({...dt})
        })
    }, [])

    return <Grid columns={"2"} gap={"2"}>
        <MiniCard name={"总次数"} description={recordData?.total ?? 0} />
        <MiniCard name={"平均持续时间"} description={formatTime(Math.ceil(recordData?.avgDuration ?? 0)) || 0} />
        <MiniCard name={"今日次数"} description={recordData?.todayCount ?? 0} />
        <MiniCard name={"本周次数"} description={recordData?.weekCount ?? 0} />
        <MiniCard name={"本月次数"} description={recordData?.monthCount ?? 0} />
        <MiniCard name={"本年次数"} description={recordData?.yearCount ?? 0} />
    </Grid>
}

