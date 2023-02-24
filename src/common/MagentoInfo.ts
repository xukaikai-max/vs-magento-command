import * as path from "path";
import { PathHelper } from "../components/helper/PathHelper";
import { CommandHelper } from "../components/helper/CommandHelper";

export class MagentoInfo {
    /**
     * 获取命令执行前部分信息
     */
    private static commandStr: string = "";

    /**
     * magento 路径信息
     */
    private static magentoPath: string = "";

    /**
     * batch list 结果
     */
    private static magentoBathStr: string = "";

    /**
     * module list 结果
     */
    private static magentoModuleList: string[] = [];

    /**
     * 获取命令执行前部分信息
     * @returns
     */
    static getCommandStr(): string {
        if (!this.commandStr) {
            let phpPath = PathHelper.getPhpPath();
            let magentoPath: string | undefined = this.getMagentoPath();
            if (magentoPath && phpPath) {
                this.commandStr = `${phpPath} ${magentoPath} `;
            }
        }
        return this.commandStr;
    }

    /**
     * 获取 magento 路径
     * @return String
     */
    static getMagentoPath(): string | undefined {
        if (this.magentoPath === "" && PathHelper.getProjectPath()) {
            this.magentoPath = `${PathHelper.getProjectPath()}${path.sep}bin${path.sep}magento`;
        }
        return this.magentoPath;
    }

    /**
     * 获取 magento 相对路径
     * @return String
     */
    static getMagentoRelativePath(): string {
        return `.${path.sep}bin${path.sep}magento`;
    }

    /**
     * 获取 batch 命令的字符串
     */
    static getMagentoBathStr(): string {
        if (!this.magentoBathStr) {
            if (this.getCommandStr()) {
                this.magentoBathStr = CommandHelper.getExecData(`${this.getCommandStr()} list`);
            }
        }
        return this.magentoBathStr;
    }

    /**
     * 获取 batch 命令的字符串
     */
    static setMagentoBathStr(magentiBathStr: string): MagentoInfo {
        this.magentoBathStr = magentiBathStr;
        return this;
    }

    /**
     * 获取 module 命令的结果集
     */
    static getMagentoModuleList(): string[] {
        if (this.magentoModuleList.length === 0) {
            if (this.getCommandStr()) {
                let moduleStr = CommandHelper.getExecData(`${this.getCommandStr()} module:status`);
                this.magentoModuleList = moduleStr.split("\n").filter((val) => {
                    return val.includes("_") && val !== "";
                });
            }
        }
        return this.magentoModuleList;
    }

    /**
     * 设置 module 命令的结果集
     */
    static setMagentoModuleList(moduleList: string[]): MagentoInfo {
        this.magentoModuleList = moduleList;
        return this;
    }
}
