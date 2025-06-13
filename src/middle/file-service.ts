import { exists, stat,
    readTextFile, readDir,
    writeTextFile, mkdir,
    readFile,
    rename,
} from '@tauri-apps/plugin-fs';
import { join } from '@tauri-apps/api/path';

import { injectable, IFileService} from "@yanquer/common"


@injectable()
export class FileService implements IFileService {

    async isDir(name: string): Promise<boolean> {
        if (await this.isExists(name)){
            // 获取文件/目录元数据
            const fileMetadata = await stat(name);
            return fileMetadata.isDirectory
        }
        return false
    }

    async isFile(name: string): Promise<boolean> {
        if (await this.isExists(name)){
            // 获取文件/目录元数据
            const fileMetadata = await stat(name);
            return fileMetadata.isFile
        }
        return false
    }

    async open(path: string): Promise<string> {
        return await readTextFile(path)
    }

    async openYaml<T>(path: string): Promise<T> {
        const data = await this.open(path)
        if (data){
            return JSON.parse(data) as T
        }
        return undefined as T
    }

    async readDir(path: string, recursive = false): Promise<string[]> {
        const dirChild = await readDir(path);
        if (recursive){
            const children: string[] = []
            await dirChild.map(async (v) => {
                if (v.isDirectory){
                    const item = await join(path, v.name)
                    children.splice(children.length, 0,
                        ...(await this.readDir(item)))
                } else {
                    children.push(v.name)
                }
            })
            return children
        } else
            return dirChild?.map(v => v.name)
    }

    async write(path: string, data: any): Promise<void> {
        await writeTextFile(path, data)
    }

    async writeYaml(path: string, data: any): Promise<void> {
        await this.write(path, JSON.stringify(data))
    }

    async isExists(path: string): Promise<boolean> {
        return await exists(path) as boolean;
    }

    async mkDir(path: string, recursive?: boolean | number): Promise<boolean> {
        await mkdir(path, {recursive: !!recursive})
        return true
    }

    // todo: buffer / array buffer ?
    // @ts-ignore
    async openBuffer(path: string): Promise<Buffer | undefined> {
        // return await readFile(path)
    }

    async openBuffer2(path: string): Promise<Uint8Array | undefined> {
        return await readFile(path)
    }

    async move(originPath: string, newPath: string): Promise<boolean> {
        await rename(originPath, newPath)
        return true
    }

}
