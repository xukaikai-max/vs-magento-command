import * as vscode from "vscode";
import * as _ from "lodash";

/**
 * vscode 配置陪信息获取
 */
export class SettingInfo {
    /**
     * 获取当前所在工程根目录，有3种使用方法
     * @return String
     */
    static getCustomizeBathList(): { [key: string]: string } {
        let customizeBathList = this.getConfigData("magento-batch-common-customize");
        let configBatchList: { [key: string]: string } = {};
        _.forIn(customizeBathList, function (value, key) {
            if (typeof value === "string" && typeof key === "string") {
                configBatchList[key] = value;
            }
        });
        return configBatchList;
    }

    /**
     * 获取配置文件中数据信息
     * @param configName
     * @returns
     */
    static getConfigData(configName: string): vscode.WorkspaceConfiguration {
        return vscode.workspace.getConfiguration(configName);
    }
}
