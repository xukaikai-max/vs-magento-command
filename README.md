# Magento command 

- 智能读取 magento 的命令数据，方便使用

  ![image-20230222132858360](./images/md/image-20230222132858360.png)

## 1. magento 常用命令部分：magento-batch-common

### 1.1：已存在的常用命令部分

![image-20230222133150136](./images/md/image-20230222133150136.png)

### 1.2：自定义配置的常用命令

- 在  setting.json 文件中配置即可

```json
{
    "magento-batch-common-customize": {
        "cache:clean": "缓存清理.",
        "setup:upgrade": "安装和升级数据",
        "setup:di:compile": "生成DI配置和所有可以自动生成的辅助类.",
    }
}
```

![image-20230222134741901](./images/md/image-20230222134741901.png)

## 2. magento 所有命令展示

- 展示 magento 当前可用的所用 command 命令信息

![image-20230222133545954](./images/md/image-20230222133545954.png)

## 3. 调用命令时追加参数

![image-20230222133757864](./images/md/image-20230222133757864.png)

![image-20230222133838832](./images/md/image-20230222133838832.png)

## 4. 命令复制

![image-20230222134833519](./images/md/image-20230222134833519.png)

