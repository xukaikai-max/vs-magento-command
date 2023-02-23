import { BaseHelper } from "./BaseHelper";

/**
 * 系统帮助类
 */
export class SystemHelper extends BaseHelper {
    /**
     * 在Mac上,变量返回darwin.在Windows上,它返回win32(即使在64位).可能的值有:'darwin','freebsd','linux','sunos'或'win32'
     * "aix" | "android" | "darwin" | "freebsd" | "haiku" | "linux" | "openbsd" | "sunos" | "win32" | "cygwin" | "netbsd"
     * @return String
     */
    static getSystemType(): NodeJS.Platform {
        return process.platform;
    }
}
