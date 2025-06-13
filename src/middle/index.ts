import {bindToDefaultContainer, IFileService} from "@yanquer/common";
import {FileService} from "./file-service.ts";
import {IClipboardService} from "./service.ts";
import {ClipboardService} from "./clipboard-service.ts";

export const bindMiddle = () => {
    bindToDefaultContainer(IFileService, FileService)
    bindToDefaultContainer(IClipboardService, ClipboardService)
}

bindMiddle()


