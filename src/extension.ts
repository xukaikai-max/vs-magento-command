import * as vscode from "vscode";
import { MagentoBatch } from "./treeView/MagentoBatch";
import { MagentoBatchCommon } from "./treeView/MagentoBatchCommon";
import { CommandHelper } from "./components/helper/CommandHelper";
import { MagentoTreeItem } from "./treeView/BaseTree";
import { ArgsHistory } from "./components/history/ArgsHistory";
import { CopyHelper } from "./components/helper/CopyHelper";
import { LogHelper } from "./components/helper/LogHelper";
import { MagentoInfo } from "./common/MagentoInfo";

export function activate(context: vscode.ExtensionContext) {
    let magentoBatchObj = new MagentoBatch();
    /**
     * 导航所有 view 导入
     */
    vscode.window.registerTreeDataProvider("magento-batch", magentoBatchObj);
    let magentoBatchCommonObj = new MagentoBatchCommon();
    /**
     * 导航常用 view 导入
     */
    vscode.window.registerTreeDataProvider("magento-batch-common", magentoBatchCommonObj);

    /**
     * cmd 命令执行导入
     */
    context.subscriptions.push(
        vscode.commands.registerCommand("shell.runCommand", (cmd) => {
            console.log(cmd);
            CommandHelper.exec(cmd);
        })
    );
    let argsHistoryObj = new ArgsHistory();
    /**
     * 命令运行
     */
    context.subscriptions.push(
        vscode.commands.registerCommand("magento-batch-run.editEntry", (node: MagentoTreeItem) => {
            // let nodeCmdStr = node.cmd;
            // let lastArgs = argsHistoryObj.getArgs(nodeCmdStr); // 最后一次录入的参数
            // var options = {
            //     placeHolder: `Please enter args for ${nodeCmdStr}.`,
            //     value: lastArgs,
            // };
            // this.command = {
            //     title: "magento cmd",
            //     command: "shell.runCommand",
            //     arguments: [this.cmd],
            // };
            // vscode.commands.executeCommand("shell.runCommand", { arguments: node.cmd }, () => {
            //     console.log(111);
            // });
        })
    );
    /**
     * 参数追加
     */
    context.subscriptions.push(
        vscode.commands.registerCommand("magento-batch-args.editEntry", (node: MagentoTreeItem) => {
            let nodeCmdStr = node.cmd;
            let lastArgs = argsHistoryObj.getArgs(nodeCmdStr); // 最后一次录入的参数
            var options = {
                placeHolder: `设置参数 ${nodeCmdStr}.`,
                value: lastArgs,
            };
            vscode.window.showInputBox(options).then((args) => {
                if (args) {
                    let argsArr = args.split(" ").filter((val) => {
                        return val !== "";
                    });
                    let argsStr = argsArr.join(" ");
                    if (argsStr !== "") {
                        argsHistoryObj.setArgs(nodeCmdStr, argsStr); // 将生效的参数保存起来，方便下次选择
                        CommandHelper.exec(`${nodeCmdStr} ${argsStr}`);
                    }
                }
            });
            // vscode.window.showQuickPick(defaultValueList, options).then((args) => {
            //     if (args) {
            //         historyArgsObj.setArgs(args); // 将生效的参数保存起来，方便下次选择
            //         CommandHelper.exec(`${nodeCmdStr} ${args}`);
            //     }
            // });
        })
    );
    // 为参数追加设置一个数组变量，方便设置 "when": "view in ext.editEntryList && viewItem == args",
    vscode.commands.executeCommand("setContext", "ext.editEntryList", ["magento-batch", "magento-batch-common"]);
    /**
     * 常用命令 刷新按钮事件载入
     */
    context.subscriptions.push(
        vscode.commands.registerCommand("magento-batch-common.refreshEntry", () => {
            return magentoBatchCommonObj.refresh();
        })
    );
    /**
     * 所有命令 刷新按钮事件载入
     */
    context.subscriptions.push(
        vscode.commands.registerCommand("magento-batch.refreshEntry", () => {
            return magentoBatchObj.refresh();
        })
    );
    /**
     * 复制命令触发
     */
    context.subscriptions.push(
        vscode.commands.registerCommand("magento-batch.deleteEntry", (node: MagentoTreeItem) => {
            let copyStr = `${MagentoInfo.getMagentoRelativePath()} ${node.cmdStr}`;
            CopyHelper.writeText(copyStr);
            LogHelper.showInformationMess("复制命令成功。");
        })
    );
}

export function deactivate() { }
