/**
 * 参数历史信息
 */
export class ArgsHistory {
    /**
     * 存放全部的历史信息
     */
    private argsList: { [key: string]: string } = {};

    setArgs(cmd: string, args: string): this {
        this.argsList[cmd] = args;
        return this;
    }

    getArgs(cmd: string): string {
        return this.argsList[cmd];
    }

    /**
     * 获取全部的命令信息
     * @returns
     */
    public getArgsList(): { [key: string]: string } {
        return this.argsList;
    }

    /**
     * 删除全部的历史命令
     */
    dispose() {}
}
