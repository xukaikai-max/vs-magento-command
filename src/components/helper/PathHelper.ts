import * as vscode from "vscode";
import * as path from "path";
import { CommandHelper } from "./CommandHelper";
import * as _ from "lodash";
import { BaseHelper } from "./BaseHelper";
import { SystemHelper } from "./SystemHelper";

/**
 * 路径帮助类
 */
export class PathHelper extends BaseHelper {
    /**
     * 项目 路径信息
     */
    static projectPath: string | undefined;

    /**
     * php 路径信息
     */
    static phpPath: string | undefined;

    /**
     * 获取当前所在工程根目录，有3种使用方法
     * @return String
     */
    static getProjectPath(): string | undefined {
        if (this.projectPath === undefined) {
            this.projectPath = vscode.workspace.rootPath;
        }
        return this.projectPath;
    }

    /**
     * 获取 php 路径
     * @return String
     */
    static getPhpPath(): string {
        if (this.phpPath === undefined) {
            let cmdRes = "";
            let systemType = SystemHelper.getSystemType();
            if (systemType === "win32") {
                cmdRes = CommandHelper.getExecData("where.exe php");
            } else if (systemType === "linux" || systemType === "darwin") {
                cmdRes = CommandHelper.getExecData("which php");
            }
            this.phpPath = _.trim(cmdRes);
        }
        return this.phpPath;
    }
}
