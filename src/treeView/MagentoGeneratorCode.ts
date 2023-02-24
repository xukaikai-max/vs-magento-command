import * as _ from "lodash";
import { SettingInfo } from "../common/SettingInfo";
import { MagentoInfo } from "../common/MagentoInfo";
import { GeneratorCodeBaseTree } from "./GeneratorCodeBaseTree";

export class MagentoGeneratorCode extends GeneratorCodeBaseTree {
    getGeneratorTypeList(): { [key: string]: { [key: string]: string } } {
        // 先查看先所有模块信息，缓存信息，提升体验
        MagentoInfo.getMagentoModuleList();
        return {
            "new-module": {
                func: "newModule", // 调用哪个方法
                description: "构建新模块.",
                tooltip: "构建新模块.", // 鼠标悬停展示的信息
            },
            controller: {
                func: "controller", // 调用哪个方法
                description: "构建控制器.",
                tooltip: "构建控制器.", // 鼠标悬停展示的信息
            },
            helper: {
                func: "helper", // 调用哪个方法
                description: "构建 helper 类.",
                tooltip: "构建 helper 类.", // 鼠标悬停展示的信息
            },
            plugin: {
                func: "plugin", // 调用哪个方法
                description: "构建 plugin.",
                tooltip: "构建 plugin.", // 鼠标悬停展示的信息
            },
            observer: {
                func: "observer", // 调用哪个方法
                description: "构建观察者.",
                tooltip: "构建观察者.", // 鼠标悬停展示的信息
            },
        };
    }
}
