
export interface IDialogService{

}

export const IClipboardService = Symbol.for('IClipboardService');
export interface IClipboardService{
    read(): Promise<string>
    write(text: string): Promise<void>
}



