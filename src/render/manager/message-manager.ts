import {Emitter, Event, getServiceBySymbolMayNull, injectable, OutTimeCache} from "@yanquer/common";
import { IMessageContent } from "./models";
import {IMessageManager} from "./service";


@injectable()
export class MessageManager implements IMessageManager{

    static shared = () => getServiceBySymbolMayNull<IMessageManager>(IMessageManager)

    protected didOpenTip = new Emitter<IMessageContent[]>();
    didOpenTipEvent: Event<IMessageContent[]> = this.didOpenTip.event;

    protected liveContent: {[key: number]: OutTimeCache<IMessageContent>} = []

    get tipContent(): IMessageContent[] {
        return Object.values(this.liveContent)
            .map(v => v.getOrReCreateData())
            .filter(v => !!v)
    }

    closeOneTipByTime(timeId?: number): void {
        if (timeId !== undefined) {
            delete this.liveContent[timeId]
            this.didOpenTip.fire(this.tipContent)
        }
    }

    showTip(content: IMessageContent){
        const time = Date.now();
        content.timeId = time;
        this.liveContent[time] = new OutTimeCache(
            content,
            () => this.closeOneTipByTime(time),
            undefined,
            content.autoCloseTime ?? 5000,
        )
        this.didOpenTip.fire(this.tipContent)
    }

    async info(msg: string | IMessageContent): Promise<void> {
        if (msg){
            let content = msg as IMessageContent;
            if (typeof msg == "string"){
                content = {
                    content: msg,
                    level: "info"
                }
            } else {
                content = msg as IMessageContent;
                content.level = "info";
            }
            this.showTip(content)
        }
    }
    async warn(msg: string | IMessageContent): Promise<void> {
        if (msg){
            let content = msg as IMessageContent;
            if (typeof msg == "string"){
                content = {
                    content: msg,
                    level: "warning"
                }
            } else {
                content = msg as IMessageContent;
                content.level = "warning";
            }
            this.showTip(content)
        }
    }
    async error(msg: string | IMessageContent): Promise<void> {
        if (msg){
            let content = msg as IMessageContent;
            if (typeof msg == "string"){
                content = {
                    content: msg,
                    level: "error"
                }
            } else {
                content = msg as IMessageContent;
                content.level = "error";
            }
            this.showTip(content)
        }
    }
}



