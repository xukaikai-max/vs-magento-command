import { LogHelper } from "../components/helper/LogHelper";
import { BatchBaseTree } from "./BatchBaseTree";
import { MagentoInfo } from "../common/MagentoInfo";

export class MagentoBatch extends BatchBaseTree {
    /**
     * /usr/local/bin/php
     * 解析 magento 的 batch 命令
     * @returns
     */
    getMagentiBathcommandList(): { [key: string]: { [key: string]: string } } {
        let magentoList = MagentoInfo.getMagentoBathStr().split("\\")[0].split("\n");
        if (magentoList.length < 1) {
            LogHelper.showErrorMess("magento batch 命令解析错误.");
        }
        let delTopFlag = false;
        let magentoCmdList = magentoList.filter((val) => {
            // 将这个之前的命令都删除掉
            if (delTopFlag === false && val.trim() === "admin") {
                delTopFlag = true;
            }
            return delTopFlag && val.trim() !== "";
        });
        let resObj: { [key: string]: { [key: string]: string } } = {};
        let resObjKey = "";
        magentoCmdList.forEach((val, index) => {
            if (!val.includes(":")) {
                resObjKey = val.trim();
                resObj[resObjKey] = {};
            } else {
                let cmdList = val.split(" ").filter((val) => {
                    return val !== "";
                });
                let cmd: string = cmdList[0];
                cmdList.shift();
                resObj[resObjKey][cmd] = cmdList.join(" ");
            }
        });
        return resObj;
    }
}
