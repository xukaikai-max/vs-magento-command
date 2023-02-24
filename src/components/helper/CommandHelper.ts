import * as childProcess from "child_process";
import * as iconvLite from "iconv-lite";
import * as _ from "lodash";
import { LogHelper } from "./LogHelper";
import { BaseHelper } from "./BaseHelper";

/**
 * 命令行帮助类
 */
export class CommandHelper extends BaseHelper {
    /**
     * 执行命令的方法
     * @param cmd
     * @param options
     */
    static exec(cmd: string) {
        let cmdList = _.split(cmd, " ").filter((cmd) => {
            return cmd !== "";
        });
        const spawn = childProcess.spawn(cmdList[0], _.slice(cmdList, 1));
        LogHelper.showOutputChannelMess(`>>> Command start run : \`${cmd}\` `); // 输出命令开始日志
        spawn.stdout.setEncoding("binary");
        spawn.stderr.setEncoding("binary");
        spawn.stdout.on("data", (data) => {
            LogHelper.showOutputChannelMess(iconvLite.decode(data, "cp936"), false); // 输出命令运行日志
        });
        spawn.stderr.on("data", (errorObj) => {
            LogHelper.showOutputChannelMess(iconvLite.decode(errorObj, "cp936"), false); // 输出命令运行日志
        });
        spawn.on("error", (errorObj) => {
            LogHelper.showErrorMess(`${errorObj.name} : ${errorObj.message}`); // 输出错误运行日志
        });
        spawn.on("close", (code) => {
            let runStatus = code === 0 ? "successfully" : "failed";
            LogHelper.showOutputChannelMess(`<<< Command end run ${runStatus}  .....`, true); // 结束输出命令运行日志
        });
    }

    /**
     * 执行命令获取结果
     * @param cmd
     * @returns
     */
    static getExecData(cmd: string): string {
        try {
            let magentoCmdStr = childProcess.execSync(cmd, { encoding: "utf-8" });
            // return iconvLite.decode(magentoCmdStr, "cp936");
            return magentoCmdStr;
        } catch (error) {
            LogHelper.showErrorMess(`命令执行失败：${cmd}`); // 输出错误运行日志
            return "";
        }
    }
}
