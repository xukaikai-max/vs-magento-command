import * as _ from "lodash";
import { SettingInfo } from "../common/SettingInfo";
import { MagentoInfo } from "../common/MagentoInfo";
import { BaseTree } from "./BaseTree";

export class MagentoBatchCommon extends BaseTree {
    /**
     * /usr/local/bin/php
     * 解析 magento 的 batch 命令
     * @returns
     */
    getMagentiBathcommandList(): { [key: string]: { [key: string]: string } } {
        if (!MagentoInfo.getMagentiBathStr()) {
            return {};
        }
        let magentiBathcommandList = {
            cache: {
                "cache:clean": "Cleans cache type(s)",
                "cache:disable": "Disables cache type(s)",
                "cache:enable": "Enables cache type(s)",
                "cache:flush": "Flushes cache storage used by cache type(s)",
                "cache:status": "Checks cache status",
            },
            cron: {
                "cron:install": "Generates and installs crontab for current user",
                "cron:remove": "Removes tasks from crontab",
                "cron:run": "Runs jobs by schedule",
            },
            indexer: {
                "indexer:info": "Shows allowed Indexers",
                "indexer:reindex": "Reindexes Data",
                "indexer:reset": "Resets indexer status to invalid",
                "indexer:set-mode": "Sets index mode type",
                "indexer:show-mode": "Shows Index Mode",
                "indexer:status": "Shows status of Indexer",
            },
            setup: {
                "setup:di:compile": "Generates DI configuration and all missing classes that can be auto-generated",
                "setup:upgrade": "Upgrades the Magento application, DB data, and schema",
            },
        };

        let customizeBathList = SettingInfo.getCustomizeBathList();
        if (Object.keys(customizeBathList).length > 0) {
            magentiBathcommandList = _.merge(magentiBathcommandList, { customize: customizeBathList });
        }
        return magentiBathcommandList;
    }
    
    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}
