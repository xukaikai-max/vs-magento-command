import * as vscode from "vscode";
import { BaseHelper } from "./BaseHelper";

/**
 * log 的帮助类
 */
export class LogHelper extends BaseHelper {
    static outputChannel: vscode.OutputChannel;

    /**
     * 获取输出到控制台的类
     * @returns
     */
    static getOutputChannel(): vscode.OutputChannel {
        if (!LogHelper.outputChannel) {
            LogHelper.outputChannel = vscode.window.createOutputChannel(this.OUTPUT_CHANNEL_NAME, this.OUTPUT_CHANNEL_LANGUAGE_ID);
        }
        return LogHelper.outputChannel;
    }

    /**
     * 输出信息到控制台
     * @param mess
     */
    static showOutputChannelMess(mess: string, lineFlg = true) {
        if (lineFlg) {
            LogHelper.getOutputChannel().appendLine(mess);
        } else {
            LogHelper.getOutputChannel().append(mess);
        }
        LogHelper.getOutputChannel().show();
    }

    /**
     * 错误信息提示
     * @param mess
     */
    static showErrorMess(mess: string) {
        vscode.window.showErrorMessage(mess);
    }

    /**
     * 信息提示
     * @param mess
     */
    static showInformationMess(mess: string) {
        vscode.window.showInformationMessage(mess);
    }
}
