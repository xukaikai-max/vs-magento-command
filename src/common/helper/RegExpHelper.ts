/**
 * 正则表达式帮助
 */
export class RegExpHelper {
    /**
     * 模块名称格式校验：两个单词，下划线拼接
     */
    static moduleNameMatch(moduleName: string): boolean {
        var regExp = /\b[A-Z][a-z]+_[A-Z][a-z]+\b/g;
        if (moduleName.match(regExp) === null) {
            return false;
        }
        return true;
    }

    /**
     * 路径名称格式校验：两个单词，/ 拼接
     */
    static pathNameMatch(pathName: string): boolean {
        var regExp = /\b[A-Z][a-z]+\/[A-Z][a-z]+\b/g;
        if (pathName.match(regExp) === null) {
            return false;
        }
        return true;
    }

    /**
     * 路由名称格式校验：小写英文单词
     */
    static routeNameMatch(routeName: string): boolean {
        var regExp = /[a-z]+/g;
        if (routeName.match(regExp) === null) {
            return false;
        }
        return true;
    }
    /**
     * helper 名称格式校验：首字母大写的单词
     */
    static helperNameMatch(helperName: string): boolean {
        var regExp = /\b[A-Z][a-z|A-Z]+\b/g;
        if (helperName.match(regExp) === null) {
            return false;
        }
        return true;
    }
    /**
     * Plugin 作用的类名称格式校验：
     */
    static onPluginNameMatch(onPluginName: string): boolean {
        var regExp = /^\\([A-Z][a-z]+\\)+[A-Z][a-z]+$/g;
        if (onPluginName.match(regExp) === null) {
            return false;
        }
        return true;
    }
    /**
     * Plugin 作用的类名称格式校验：
     */
    static pluginNameMatch(pluginName: string): boolean {
        var regExp = /\b[A-Z][a-z|A-Z]+\b/g;
        if (pluginName.match(regExp) === null) {
            return false;
        }
        return true;
    }

    /**
     * Plugin 作用的类名称格式校验：
     */
    static observerClassNameMatch(observerClassNameMatch: string): boolean {
        var regExp = /\b[A-Z][a-z|A-Z]+\b/g;
        if (observerClassNameMatch.match(regExp) === null) {
            return false;
        }
        return true;
    }

    /**
     * Plugin 作用的类名称格式校验：
     */
    static observerNameMatch(observerNameMatch: string): boolean {
        var regExp = /[a-z]+/g;
        if (observerNameMatch.match(regExp) === null) {
            return false;
        }
        return true;
    }
}
