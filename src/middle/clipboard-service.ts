
import { writeText, readText } from '@tauri-apps/plugin-clipboard-manager';

import {IClipboardService} from "./service.ts";


export class ClipboardService implements IClipboardService{
    async read(): Promise<string> {
        return await readText();
    }
    async write(text: string): Promise<void> {
        await writeText(text);
    }
}