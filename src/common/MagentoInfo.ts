import * as path from "path";
import { PathHelper } from "../components/helper/PathHelper";
import { CommandHelper } from "../components/helper/CommandHelper";

export class MagentoInfo {
    /**
     * batch list 结果
     */
    private static magentiBathStr: string = "";

    /**
     * magento 路径信息
     */
    private static magentoPath: string = "";

    /**
     * 获取 magento 路径
     * @return String
     */
    static getMagentoPath(): string {
        if (this.magentoPath === "" || !PathHelper.getProjectPath()) {
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
    static getMagentiBathStr(): string {
        if (!this.magentiBathStr) {
            let phpPath = PathHelper.getPhpPath();
            let magentoPath: string | undefined = this.getMagentoPath();
            if (magentoPath && phpPath) {
                this.magentiBathStr = CommandHelper.getExecData(`${phpPath} ${magentoPath} list`);
            }
        }
        return this.magentiBathStr;
    }

    /**
     * 获取 batch 命令的字符串
     */
    static setMagentiBathStr(magentiBathStr: string): MagentoInfo {
        this.magentiBathStr = magentiBathStr;
        return this;
    }
}
