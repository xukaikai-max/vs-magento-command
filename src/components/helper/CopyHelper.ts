import * as vscode from "vscode";
import { BaseHelper } from "./BaseHelper";

/**
 * 复制粘贴帮助类
 */
export class CopyHelper extends BaseHelper {
    /**
     * 粘贴文本内容
     * @returns A thenable that resolves to a string.
     */
    static readText(): Thenable<string> {
        return vscode.env.clipboard.readText();
    }

    /**
     * 赋值文本内容
     * @returns A thenable that resolves when writing happened.
     */
    static writeText(value: string): Thenable<void> {
        return vscode.env.clipboard.writeText(value);
    }
}
