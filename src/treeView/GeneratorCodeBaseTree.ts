import * as vscode from "vscode";
import { PathHelper } from "../components/helper/PathHelper";
import { MagentoInfo } from "../common/MagentoInfo";

/**
 * magento 的导航标签基类
 */
export abstract class GeneratorCodeBaseTree implements vscode.TreeDataProvider<GeneratorCodeTreeItem> {
    getTreeItem(element: GeneratorCodeTreeItem): GeneratorCodeTreeItem {
        return element;
    }
    getChildren(element?: GeneratorCodeTreeItem): Thenable<GeneratorCodeTreeItem[]> {
        if (!element) {
            let generatorTypeList = this.getGeneratorTypeList();
            // 初始没有值的时候，便利最外侧的值
            if (generatorTypeList) {
                const outerInfo: GeneratorCodeTreeItem[] = [];
                Object.keys(generatorTypeList).forEach((type, index) => {
                    outerInfo.push(new GeneratorCodeTreeItem(
                        type, 
                        generatorTypeList[type]["func"],
                        generatorTypeList[type]["description"], 
                        generatorTypeList[type]["tooltip"], 
                        vscode.TreeItemCollapsibleState.None
                    ));
                });
                return Promise.resolve(outerInfo);
            } else {
                return Promise.resolve([]);
            }
        }
        return Promise.resolve([]);
    }

    abstract getGeneratorTypeList(): { [key: string]: { [key: string]: any } };

    // 刷新按钮代码
    public _onDidChangeTreeData: vscode.EventEmitter<GeneratorCodeTreeItem | undefined | null | void> = new vscode.EventEmitter<GeneratorCodeTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<GeneratorCodeTreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
    refresh(): void {
        MagentoInfo.setMagentoBathStr("");
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
export class GeneratorCodeTreeItem extends vscode.TreeItem {

    /**
     *
     * @param label 命令描述
     * @param description 命令详细
     * @param cmdStr magento的命令，例如 c:c
     * @param collapsibleState 是否可展开
     */
    constructor(
        public readonly label: string, 
        public func: "newModule" | "controller" | "helper", 
        public description: string, 
        public tooltip: string, 
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        // 调用父级的构造类
        super(label, collapsibleState);
        // 光标悬停时候的标题
        this.tooltip = `${this.description}`;
        this.description = description;
    }
}
