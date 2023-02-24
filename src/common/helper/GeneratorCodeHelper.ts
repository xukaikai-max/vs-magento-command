import * as vscode from "vscode";
import { MagentoInfo } from "../MagentoInfo";
import { GeneratorCodeTreeItem } from "../../treeView/GeneratorCodeBaseTree";
import { RegExpHelper } from "./RegExpHelper";
/**
 * 生成代码的帮助类
 */
export class GeneratorCodeHelper {
    exec(node: GeneratorCodeTreeItem) {
        let funcName = node.func;
        this[funcName].call(this, node);
    }
    /**
     * 模块添加功能实现
     *      php bin/magento generate:code Xukai_Generate --type=new-module
     * @param node
     */
    private newModule(node: GeneratorCodeTreeItem) {
        var options = {
            placeHolder: `module 模块名称设置. 格式：Aaa_Bbb`,
            value: "",
            validateInput: (moduleNameStr: string): string => {
                let magentoModuleList = MagentoInfo.getMagentoModuleList();
                let ErrorMess = "";
                if (!RegExpHelper.moduleNameMatch(moduleNameStr)) {
                    ErrorMess = "模块名称格式错误.";
                }
                if (magentoModuleList.includes(moduleNameStr)) {
                    ErrorMess = "模块已经存在.";
                }
                return ErrorMess;
            },
        };

        vscode.window.showInputBox(options).then((moduleNameStr) => {
            let commandStr = MagentoInfo.getCommandStr();
            if (commandStr && moduleNameStr) {
                let newModuleStr = `${commandStr} generate:code ${moduleNameStr} --type=new-module`;
                vscode.commands.executeCommand("shell.runCommand", newModuleStr);
            }
        });
    }
    /**
     * 模块添加功能实现
     *      php bin/magento generate:code Pactera_Generate --type=controller --name=Index --area=frontend --path=Test --router=generate
     * @param node
     */
    private controller(node: GeneratorCodeTreeItem) {
        // 模块选择
        this.moduleSelect((moduleName: string) => {
            if (!moduleName) {
                return;
            }
            // 区域选择
            this.areaSelect((areaname: string) => {
                if (!areaname) {
                    return;
                }
                var options = {
                    placeHolder: `module 路径信息.格式：Aaa/Bbb`,
                    validateInput: (pathNameStr: string): string => {
                        let ErrorMess = "";
                        if (!RegExpHelper.pathNameMatch(pathNameStr)) {
                            ErrorMess = "路径名称格式错误.";
                        }
                        return ErrorMess;
                    },
                };
                vscode.window.showInputBox(options).then((pathNameStr) => {
                    if (!pathNameStr) {
                        return;
                    }
                    let pathNameList = pathNameStr.split("/");

                    var options = {
                        placeHolder: `module 路由信息.格式：aaa`,
                        validateInput: (routeNameStr: string): string => {
                            let ErrorMess = "";
                            if (!RegExpHelper.routeNameMatch(routeNameStr)) {
                                ErrorMess = "路由名称格式错误.";
                            }
                            return ErrorMess;
                        },
                    };
                    vscode.window.showInputBox(options).then((routeNameStr) => {
                        if (!routeNameStr) {
                            return;
                        }
                        let commandStr = MagentoInfo.getCommandStr();
                        if (commandStr) {
                            let newModuleStr = `${commandStr} generate:code ${moduleName} --type=controller --area=${areaname} --router=${routeNameStr} --path=${pathNameList[0]} --name=${pathNameList[1]}`;
                            vscode.commands.executeCommand("shell.runCommand", newModuleStr);
                        }
                    });
                });
            });
        });
    }
    /**
     * 模块添加功能实现
     *      php bin/magento generate:code Pactera_Generate --type=helper --name=HelpTest
     * @param node
     */
    private helper(node: GeneratorCodeTreeItem) {
        // 模块选择
        this.moduleSelect((moduleName: string) => {
            if (!moduleName) {
                return;
            }
            var options = {
                placeHolder: `helper 类名称.格式：首字母大写`,
                validateInput: (helperNameStr: string): string => {
                    let ErrorMess = "";
                    if (!RegExpHelper.helperNameMatch(helperNameStr)) {
                        ErrorMess = "helper 类名称格式错误.";
                    }
                    return ErrorMess;
                },
            };
            vscode.window.showInputBox(options).then((helperNameStr) => {
                if (!helperNameStr) {
                    return;
                }
                let commandStr = MagentoInfo.getCommandStr();
                if (commandStr) {
                    let newModuleStr = `${commandStr} generate:code ${moduleName} --type=helper --name=${helperNameStr}`;
                    vscode.commands.executeCommand("shell.runCommand", newModuleStr);
                }
            });
        });
    }
    /**
     * 模块添加功能实现
     *      php bin/magento generate:code Pactera_Generate --type=plugin --area=frontend --name=ShopRepositoryPlugin --plugin="\Pactera\Generate\Model\ShopRepository"
     * @param node
     */
    private plugin(node: GeneratorCodeTreeItem) {
        // 模块选择
        this.moduleSelect((moduleName: string) => {
            if (!moduleName) {
                return;
            }
            // 区域选择
            this.areaSelect((areaname: string) => {
                if (!areaname) {
                    return;
                }
                var options = {
                    placeHolder: `plugin 作用的类. 例如：\Magento\Catalog\Model\Product`,
                    validateInput: (onPluginNameStr: string): string => {
                        let ErrorMess = "";
                        if (!RegExpHelper.onPluginNameMatch(onPluginNameStr)) {
                            ErrorMess = "plugin 类名称格式错误.";
                        }
                        return ErrorMess;
                    },
                };
                vscode.window.showInputBox(options).then((onPluginNameStr) => {
                    if (!onPluginNameStr) {
                        return;
                    }
                    var options = {
                        placeHolder: `plugin 名称. 例如：ProductPlugin`,
                        validateInput: (pluginNameStr: string): string => {
                            let ErrorMess = "";
                            if (!RegExpHelper.pluginNameMatch(pluginNameStr)) {
                                ErrorMess = "plugin 类名称格式错误.";
                            }
                            return ErrorMess;
                        },
                    };
                    vscode.window.showInputBox(options).then((pluginNameStr) => {
                        if (!pluginNameStr) {
                            return;
                        }
                        let commandStr = MagentoInfo.getCommandStr();
                        if (commandStr) {
                            let newModuleStr = `${commandStr} generate:code ${moduleName} --type=plugin --area=${areaname} --name=${pluginNameStr}  --plugin=${onPluginNameStr.trim()}`;
                            vscode.commands.executeCommand("shell.runCommand", newModuleStr);
                        }
                    });
                });
            });
        });
    }
    /**
     * 模块添加功能实现
     *      php bin/magento generate:code Pactera_Generate --type=observer --name=ShopSaveAfterObserver --event=shop_save_after
     * @param node
     */
    private observer(node: GeneratorCodeTreeItem) {
        // 模块选择
        this.moduleSelect((moduleName: string) => {
            if (!moduleName) {
                return;
            }
            var options = {
                placeHolder: `observer 类名称. 例如： ProductSaveAfterObserver`,
                validateInput: (observerClassNameStr: string): string => {
                    let ErrorMess = "";
                    if (!RegExpHelper.observerClassNameMatch(observerClassNameStr)) {
                        ErrorMess = "observer 类名称格式错误.";
                    }
                    return ErrorMess;
                },
            };
            vscode.window.showInputBox(options).then((observerClassNameStr) => {
                if (!observerClassNameStr) {
                    return;
                }
                var options = {
                    placeHolder: `observer 事件名称. 例如： product_save_after`,
                    validateInput: (observerNameStr: string): string => {
                        let ErrorMess = "";
                        if (!RegExpHelper.observerNameMatch(observerNameStr)) {
                            ErrorMess = "observer 事件名称格式错误.";
                        }
                        return ErrorMess;
                    },
                };
                vscode.window.showInputBox(options).then((observerNameStr) => {
                    if (!observerNameStr) {
                        return;
                    }
                    let commandStr = MagentoInfo.getCommandStr();
                    if (commandStr) {
                        let newModuleStr = `${commandStr} generate:code ${moduleName} --type=observer --event=${observerNameStr} --name=${observerClassNameStr}`;
                        vscode.commands.executeCommand("shell.runCommand", newModuleStr);
                    }
                });
            });
        });
    }

    /**
     * module 选择
     * @param func
     */
    private moduleSelect(func: Function) {
        // 从所有的 module 中检索字符串，并且去除 Magento 的模块
        let magentoModuleList = MagentoInfo.getMagentoModuleList().filter((val: string) => {
            return !val.includes("Magento_");
        });

        var moduleSelectOptions = {
            placeHolder: `module 模块选择.`,
            value: "",
        };
        // 模块名称选择
        vscode.window.showQuickPick(magentoModuleList, moduleSelectOptions).then((moduleName) => {
            func(moduleName);
        });
    }
    /**
     * area 选择
     * @param func
     */
    private areaSelect(func: Function) {
        var moduleSelectOptions = {
            placeHolder: `area 区域选择.`,
            value: "",
        };
        // 模块名称选择
        vscode.window.showQuickPick(["frontend", "adminhtml"], moduleSelectOptions).then((areaname) => {
            func(areaname);
        });
    }
}
