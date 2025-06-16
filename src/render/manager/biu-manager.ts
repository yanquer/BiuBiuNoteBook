import {Emitter, getServiceBySymbolMayNull, inject, injectable, Logger, postConstruct} from "@yanquer/common";
import {CacheDataOne, CacheManager} from "./cache-manager.ts";
import {countDatesInPeriods} from "../../common/common.ts";

export interface RecordAnalyze{
    total: number, avgDuration: number,
    weekCount: number, monthCount: number, yearCount: number,
    todayCount: number,
}

@injectable()
export class BiuManager {
    static shared = () => getServiceBySymbolMayNull(BiuManager)

    // 计时器更新
    protected timeCountChangeEmitter = new Emitter<number>()
    timeCountChangeEvent = this.timeCountChangeEmitter.event

    // 改变时传递原始数据
    protected biuDataChangeEmitter = new Emitter<CacheDataOne[]>()
    biuDataChangeEvent = this.biuDataChangeEmitter.event

    // 改变时传递计算后的数据
    protected biuDataChangeEmitter2 = new Emitter<RecordAnalyze>()
    biuDataChangeEvent2 = this.biuDataChangeEmitter2.event

    protected timerCount = 0
    protected intervalTimer: number = -1
    // 最大时间不超过 5 小时,
    //  不然就是有病了
    protected maxTime = 5 *  60 * 60 * 1000;

    start(){
        if (this.intervalTimer !== -1){
            return
        }

        Logger.debug("Starting...")
        this.intervalTimer = setInterval(() => {
            if (this.timerCount > this.maxTime) {
                this.stop()
                return
            }
            this.timerCount++
            this.timeCountChangeEmitter.fire(this.timerCount)
        }, 1000)
    }

    protected note?: string
    setNote(note: string){
        this.note = note
    }

    stop(){
        if (this.intervalTimer !== -1){
            Logger.debug("Stop...")
            clearInterval(this.intervalTimer)
            this.intervalTimer = -1

            const thisTime = this.timerCount
            const note = this.note

            this.timerCount = 0
            this.note = undefined

            this.timeCountChangeEmitter.fire(this.timerCount)
            this.save(thisTime, note)
        }
    }

    @inject(CacheManager)
    protected readonly cacheManager?: CacheManager

    protected save(timeCount: number, note?: string){
        this.cacheManager?.append({duration: timeCount, note})

        this.onRecordChange()
    }

    get allRecord(){
        // readonly
        return this.cacheManager?.cacheData
    }

    @postConstruct()
    protected doInit(){
        this.onRecordChange()
    }

    // 计算
    cacheAnalyze?: RecordAnalyze
    protected onRecordChange(){
        Logger.debug("onRecordChange... ", )

        const currentData = this.allRecord
        if (currentData){
            this.biuDataChangeEmitter.fire(currentData)

            // 总数
            const total = currentData.length
            // 平均时长
            const totalTime = currentData.map(v => v.duration)
                .reduce((a, b) => a + b, 0)
            const avgDuration = totalTime / total
            // 今日次数
            const today = (new Date()).toLocaleDateString()
            let todayTime = 0
            currentData.forEach(v => {
                v.recordTime?.startsWith(today) && todayTime++
            })

            // 本周次数
            // 本月次数
            // 本年次数
            const {thisWeekCount, thisMonthCount, thisYearCount, thisDayCount} = countDatesInPeriods(currentData.map(v => v.recordTime!))

            this.cacheAnalyze = {
                total,
                avgDuration,
                weekCount: thisWeekCount,
                monthCount: thisMonthCount,
                yearCount: thisYearCount,
                todayCount: thisDayCount,
            }
            Logger.debug("onRecordChange... this.cacheAnalyze: ", this.cacheAnalyze)
            this.biuDataChangeEmitter2.fire(this.cacheAnalyze)

        }
    }

}




