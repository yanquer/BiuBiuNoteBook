import {bindToDefaultContainer, IFileService} from "@yanquer/common";
import {FileService} from "./file-service.ts";

export const bindMiddle = () => {
    bindToDefaultContainer(IFileService, FileService)
}

bindMiddle()


