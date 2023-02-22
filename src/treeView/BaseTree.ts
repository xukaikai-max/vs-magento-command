import * as vscode from "vscode";
import { PathHelper } from "../components/helper/PathHelper";
import { MagentoInfo } from "../common/MagentoInfo";

/**
 * magento 的导航标签基类
 */
export abstract class BaseTree implements vscode.TreeDataProvider<MagentoTreeItem> {
    getTreeItem(element: MagentoTreeItem): MagentoTreeItem {
        return element;
    }
    getChildren(element?: MagentoTreeItem): Thenable<MagentoTreeItem[]> {
        if (!element) {
            // 初始没有值的时候，便利最外侧的值
            if (this.getMagentiBathcommandList()) {
                const outerInfo: MagentoTreeItem[] = [];
                Object.keys(this.getMagentiBathcommandList()).forEach((label, index) => {
                    outerInfo.push(new MagentoTreeItem(label, "", "", vscode.TreeItemCollapsibleState.Collapsed));
                });
                return Promise.resolve(outerInfo);
            } else {
                return Promise.resolve([]);
            }
        } else {
            let currentGroup: any = element.label;
            const sonList = this.getMagentiBathcommandList()[currentGroup];
            const outerInfo: MagentoTreeItem[] = [];
            Object.keys(sonList).forEach((label, index) => {
                outerInfo.push(new MagentoTreeItem(label, sonList[label], label, vscode.TreeItemCollapsibleState.None));
            });
            return Promise.resolve(outerInfo);
        }
    }

    abstract getMagentiBathcommandList(): { [key: string]: { [key: string]: string } };

    // 刷新按钮代码
    public _onDidChangeTreeData: vscode.EventEmitter<MagentoTreeItem | undefined | null | void> = new vscode.EventEmitter<MagentoTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<MagentoTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    refresh(): void {
        MagentoInfo.setMagentiBathStr("");
        this._onDidChangeTreeData.fire();
    }
}

/**
 * 需要在 getChildren 返回的类集合
 *
 *   collapsibleState：TreeItemCollapsibleState.Collapsed 树显示为已折叠。
 *   collapsibleState：TreeItemCollapsibleState.Expanded  树显示为已展开。
 *   collapsibleState：TreeItemCollapsibleState.None      表示树项没有子项。
 */
export class MagentoTreeItem extends vscode.TreeItem {
    cmd: string = "";
    /**
     *
     * @param label 命令描述
     * @param description 命令详细
     * @param cmdStr magento的命令，例如 c:c
     * @param collapsibleState 是否可展开
     */
    constructor(public readonly label: string, public description: string, public cmdStr: string, public readonly collapsibleState: vscode.TreeItemCollapsibleState) {
        // 调用父级的构造类
        super(label, collapsibleState);
        // 光标悬停时候的标题
        this.tooltip = `${this.label}`;
        this.description = description;
        this.setCmd(this.cmdStr);
        this.setCommand(this.cmdStr);
        this.setContextValue(this.cmdStr);
    }
    /**
     * 设置点击出发的命令
     * @param cmd
     */
    setCmd(cmd: string) {
        let phpPath = PathHelper.getPhpPath();
        let magentoPath = MagentoInfo.getMagentoPath();
        if (cmd && phpPath && magentoPath) {
            this.cmd = `${phpPath} ${magentoPath} ${cmd}`;
        }
    }

    /**
     * 设置点击出发的命令
     * @param cmd
     */
    setCommand(cmd: string) {
        let phpPath = PathHelper.getPhpPath();
        let magentoPath = MagentoInfo.getMagentoPath();
        if (cmd && phpPath && magentoPath) {
            this.command = {
                title: "magento cmd",
                command: "shell.runCommand",
                arguments: [this.cmd],
            };
        }
    }
    /**
     * 设置 contextValue , 用来设置 package.json 中的 viewItem = contextValue
     * @param cmd
     */
    setContextValue(cmd: string) {
        let phpPath = PathHelper.getPhpPath();
        let magentoPath = MagentoInfo.getMagentoPath();
        console.log(`cmd : ${cmd}`);
        console.log(`phpPath : ${phpPath}`);
        console.log(`magentoPath : ${magentoPath}`);

        if (cmd && phpPath && magentoPath) {
            this.contextValue = "args";
        }
    }
}
