import {getServiceBySymbolMayNull, inject, injectable, postConstruct} from "@yanquer/common";
import {IClipboardService} from "../../middle/service.ts";
import {IMessageManager} from "./service.ts";

export interface CacheDataOne{
    // 记录的时间, 格式 '6/13/2025, 3:48:48 PM'
    recordTime?: string
    // 持续时长
    duration: number,
    // 备注
    note?: string,
}

@injectable()
export class CacheManager {
    static shared = () => getServiceBySymbolMayNull(CacheManager)

    protected cacheKey = "BiuBiuCache-CacheManager"
    protected _cacheData: CacheDataOne[] = []

    get cacheData(){
        return this._cacheData
    }

    @postConstruct()
    protected doInit(){
        this.load()
    }

    protected load(){
        const data = localStorage.getItem(this.cacheKey)
        if (data){
            this._cacheData = JSON.parse(data) || []
        }
    }

    save(){
        localStorage.setItem(this.cacheKey, JSON.stringify(this._cacheData))
    }

    append(data: CacheDataOne) {
        if (data){
            data.recordTime = data.recordTime ?? (new Date()).toLocaleString()
        }
        this._cacheData.push(data)
        this.save()
    }

    @inject(IClipboardService)
    protected readonly clipboardService?: IClipboardService;
    @inject(IMessageManager)
    protected readonly messageManager?: IMessageManager;
    // 导入
    async exportIn(){
        const data = await this.clipboardService?.read()
        if (data){
            const jsonData = JSON.parse(data)
            if (jsonData && Array.isArray(jsonData) && jsonData.length > 0 && jsonData[0].recordTime) {
                this._cacheData = jsonData
                this.save()
                this.messageManager?.info("成功导入数据")
                // todo, 刷新前端
                return
            }
            this.messageManager?.info("导入数据失败, 未能识别剪切板数据")

        }
        this.messageManager?.info("导入数据失败, 未在剪切板识别到数据")

    }
    // 导出
    async exportOut(){
        await this.clipboardService?.write(JSON.stringify(this._cacheData))
        this.messageManager?.info("成功导出数据到剪切板")
    }
}
