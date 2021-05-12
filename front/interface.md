## 接口文档
接口目录：

- [接口文档](#接口文档)
  - [云端接口](#云端接口)
    - [1. 获取模板列表](#1-获取模板列表)
    - [2. 添加产品](#2-添加产品)
    - [3. 获取产品信息详情](#3-获取产品信息详情)
    - [4. 保存产品模板](#4-保存产品模板)
    - [5. UI包下载](#5-ui包下载)
  - [postMessage接口](#postmessage接口)
    - [监听模板message消息接口](#监听模板message消息接口)
      - [1. 获取全局schema](#1-获取全局schema)
      - [2. 获取组件schema](#2-获取组件schema)
      - [3. 获取设备信息（strings,profile）](#3-获取设备信息stringsprofile)
      - [4. 获取模板ready标志](#4-获取模板ready标志)
      - [5. 获取模板保存的配置信息](#5-获取模板保存的配置信息)
    - [postMessage下发消息至模板接口](#postmessage下发消息至模板接口)
      - [1. 设置模板全局schema](#1-设置模板全局schema)
      - [2. 设置模板相关组件schema](#2-设置模板相关组件schema)
      - [3. 模板参数启用与禁用](#3-模板参数启用与禁用)
      - [4. 模板'实时预览'状态切换](#4-模板实时预览状态切换)
      - [5. 模板初始化数据设置](#5-模板初始化数据设置)
      - [6. 模板增加参数](#6-模板增加参数)
      - [7. 模板页面位置切换](#7-模板页面位置切换)
      - [8. 模板设置保存动作发起](#8-模板设置保存动作发起)

### 云端接口
#### 1. 获取模板列表 
   - *接口名称：`/templates`*
   - *接口方法：`get`*
   - *接口返回：*
       - 参数类型：json string
       - 参数格式：
            ```json
            {
            data: [{
                    id: 123,
                    title: '模板1', //string    模本的名称
                    editable: true, //boolean  是否支持编辑
                    extendable: true, //boolean  是否支持新增自定义参数
                    category: '电工',
                    supports: ['开光', '定时', '延时', '童锁', '电流'],
                    snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
                    products: [{
                            model: 'JS-23',
                            name: 'SP MINI',
                        },
                        {
                            model: 'JS-24',
                            name: 'SP MINI',
                        }, {
                            model: 'JS-25',
                            name: 'SP MINI',
                        }, {
                            model: 'JS-26',
                            name: 'SP MINI',
                        }, {
                            model: 'JS-27',
                            name: 'SP MINI',
                        }
                    ]
                }, {
                    id: '12209',
                    title: '模板2', //string    模本的名称
                    editable: true, //boolean  是否支持编辑
                    extendable: true, //boolean  是否支持新增自定义参数
                    category: '安防',
                    supports: ['开光', '定时', '延时', '童锁', '电流'],
                    snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
                }, {
                    id: 'sdffs',
                    title: '模板1', //string    模本的名称
                    editable: true, //boolean  是否支持编辑
                    extendable: true, //boolean  是否支持新增自定义参数
                    category: '电工',
                    supports: ['开光', '定时', '延时', '童锁', '电流', '延时', '童锁', '电流', '延时', '童锁', '电流'],
                    snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
                },
                {
                    id: 'xxx',
                    title: '模板1', //string    模本的名称
                    editable: true, //boolean  是否支持编辑
                    extendable: true, //boolean  是否支持新增自定义参数
                    category: '电工',
                    supports: ['开光', '定时', '延时', '童锁', '电流', '延时', '童锁', '电流'],
                    snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
                },
                ...
            ]
        }
            ```


#### 2. 添加产品
   - *接口名称：`/products/add`*
   - *接口方法：`post`*
   - *body参数：*
       - 参数类型：json string
       - 参数格式：
            ```json
            {
                templateId:123,
                model:'sdfasd',
                name:'xxx'
            }
            ```
   - *接口返回：*
       - 参数类型：json string
       - 参数格式：
            ```json
            {
                data:'success'
            }
            ```

#### 3. 获取产品信息详情 
   - *接口名称：`/products/detail`*
   - *接口方法：`post`*
   - *body参数：*
       - 参数类型：json string
       - 参数格式：
            ```json
            {
                templateId:123,
                model:'sdfasd'
            }
            ```
   - *接口返回：*
       - 参数类型：json string
       - 参数格式：
            ```json
            {
                data: {
                    profile: {
                        "desc": {
                            "cat": "184",
                            "model": "235242",
                            "pid": "00000000000000000000000078690000",
                            "vendor": ""
                        },
                        "encrypttype": 1,
                        "groups": [],
                        "issubdev": 0,
                        "protocol": [],
                        "srvs": ["108.1.184"],
                        "subscribable": 0,
                        "suids": [{
                            "intfs": {
                                "batstate": [{"act": 1, "idx": 1, "ifttt": 0, "in": [2, 0, 100, 1, 1]}],
                                "border": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1]}],
                                "dblclean": [{"act": 3, "idx": 1, "ifttt": 0, "in": [1, 0, 1]}],
                                "dirctrl": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1, 2, 3, 4]}],
                                "fault": [{
                                    "act": 1,
                                    "idx": 1,
                                    "ifttt": 1,
                                    "in": [1, 0, 9, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38]
                                }],
                                "fullelectric": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1]}],
                                "preciseclean": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1]}],
                                "pwr": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1]}],
                                "recharge": [{"act": 3, "idx": 1, "ifttt": 0, "in": [1, 0, 1]}],
                                "robot_control": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1]}],
                                "swprbt_appoint1": [{"act": 3, "idx": 1, "ifttt": 3, "in": [1, 0, 1, 2]}],
                                "swprbt_state": [{"act": 1, "idx": 1, "ifttt": 0, "in": [1, 1, 2, 6, 7, 11, 12, 13]}],
                                "swprbt_time": [{"act": 3, "idx": 1, "ifttt": 3, "in": [2, 0, 1440, 1, 1]}]
                            }, "suid": ""
                        }],
                        "timeout": [3, 5],
                        "transform": {},
                        "ver": "",
                        "wificonfigtype": 4
                    },
                    strings: {
                        "cat_name": "扫地机器人",
                        "dev_name": "安泰迪扫地机器人",
                        "error": {
                            "cmd": "Execute command error",
                            "device_offline": "Device is offline",
                            "sdk": "SDK init failed"
                        },
                        "intfs": {
                            "batstate": {"name": "电流图标", "unit": "", "values": {"1": "0", "2": "100"}},
                            "border": {"name": "沿边", "values": {"0": "关", "1": "开"}},
                            "dblclean": {"name": "定点", "values": {"0": "关", "1": "开"}},
                            "dirctrl": {"name": "方向键", "values": {"0": "停止", "1": "前进", "2": "后退", "3": "左转", "4": "右转"}},
                            "fault": {
                                "name": "报警提示",
                                "values": {
                                    "0": "无故障",
                                    "12": "左主动轮过载",
                                    "13": "右主动轮过载",
                                    "14": "左边刷过载",
                                    "15": "右边刷过载",
                                    "20": "左边地检故障",
                                    "21": "左中地检故障",
                                    "22": "右中地检故障",
                                    "23": "右边地检故障",
                                    "24": "左边碰撞故障",
                                    "25": "右边碰撞故障",
                                    "26": "左边墙检故障",
                                    "27": "左中墙检故障",
                                    "28": "中间墙检故障",
                                    "29": "右中墙检故障",
                                    "30": "右边墙检故障",
                                    "31": "红外接收头故障",
                                    "32": "中间滚刷过载保护",
                                    "33": "吸尘过载保护",
                                    "34": "前轮测速异常",
                                    "35": "电池没电保护",
                                    "36": "中间滚刷未安装",
                                    "37": "电池温度故障",
                                    "38": "垃圾盒未安装",
                                    "9": "轮子悬空"
                                }
                            },
                            "fullelectric": {"name": "满电清扫", "values": {"0": "关", "1": "开"}},
                            "preciseclean": {"name": "自动", "values": {"0": "关", "1": "开"}},
                            "pwr": {"name": "电源开关", "values": {"0": "关", "1": "开"}},
                            "recharge": {"name": "回充", "values": {"0": "关", "1": "开"}},
                            "robot_control": {"name": "启停按键", "values": {"0": "启动", "1": "停止"}},
                            "swprbt_appoint1": {"name": "预约清扫", "values": {"0": "关闭", "1": "单次", "2": "循环"}},
                            "swprbt_state": {
                                "name": "工作状态",
                                "values": {
                                    "1": "休眠",
                                    "11": "拖地工作",
                                    "12": "寻找充电桩",
                                    "13": "清扫工作",
                                    "2": "待机",
                                    "6": "充电中",
                                    "7": "充电完成"
                                }
                            },
                            "swprbt_time": {"name": "工作时长", "unit": "min", "values": {"1": "0", "2": "1440"}}
                        },
                        "vendor_name": "BroadLink"
                    },
                    settings: {
                        component: {pwr: {…}, pwr1: {…}, pwr2: {…}, pwr3: {…}, pwr4: {…}, …},
                        container: {homePageReadonly: [], homePageOperate: ["pwr", "pwr3", "mode"], settingsPage: ["pwr1", "pwr2", "pwr4"]},
                        global: {updateStrategy: "success", themeColor: "#1748ba"}
                        },
                    previewUrl: "http://10.10.30.207:3000/"
            }
            ```

#### 4. 保存产品模板
   - *接口名称：`/products/save`*
   - *接口方法：`post`*
   - *body参数：*
       - 参数类型：json string
       - 参数格式：
            *其中 files 参数数据来源于[postMessage接口-获取模板保存的配置信息](#5-获取模板保存的配置信息)* 
            ```json
            {
                templateId:123,
                model:'sdfasd',
                files:{...}
            }
            ```
    
   - *接口返回：*
       - 参数类型：json string
       - 参数格式：
            ```json
            {
                data:'success'
            }
            ```

#### 5. UI包下载
   - *接口名称：`/products/download?templateId=demo&model=111`,其中url中的templateId和model参数需要传入对应的数据*
   - *接口方法：`get`*
   - *接口返回：*
       - 参数类型：gzip


### postMessage接口

#### 监听模板message消息接口

##### 1. 获取全局schema 
  - *message type: `GLOBAL_SCHEMA`*
  - *message payload:*
    ```json
    {
        "title":"全局属性",
        "type":"object",
        "required":["updateStrategy","themeColor"],
        "properties":{
            "themeColor":{
                "type":"string",
                "title":"主题色",
                "format":"color",
                "default":"#1748ba"
            },
            "updateStrategy":{
                "type":"string",
                "title":"更新策略",
                "description":"immediate：立刻更新;success：控制成功后更新;loop：只依靠轮询",
                "default":"success",
                "enum":["immediate","success","loop"]
            }
        }
    }
    ```

##### 2. 获取组件schema 
  - *message type: `COMPONENT_SCHEMA`*
  - *message payload:*
    ```json
    {
        "key":"pwr",
        "schema":{
            "title":"功能",
            "type":"object",
            "required":["name","location","addToTimer"],
            "properties":{
                "name":{
                    "type":"string",
                    "title":"功能名称",
                    "maxLength":10,
                    "default":"电源开"},
                    "addToTimer":{
                        "type":"boolean",
                        "title":"定时/场景",
                        "description":"是否添加到定时/场景界面",
                        "default":true},
                        "icon":{
                            "type":"string",
                            "title":"图标",
                            "media":{
                                "binaryEncoding":"base64",
                                "type":"img/svg"
                                },
                            "default":"data:image/svg+xml;base64,......"
                        },
                        "location":{
                            "type":"Integer",
                            "title":"显示位置",
                            "default":"home",
                            "enumSource":[{"source":[
                                    {"value":"home","title":"首页"},
                                    {"value":"setting","title":"功能设置"}],
                                "title":"{{item.title}}","value":"{{item.value}}"
                            }]
                        }
                    }
                }
            }
        }
    }
    ```

##### 3. 获取设备信息（strings,profile）
  - *message type: `DEVICE_INTFS_INFO`*
  - *message payload:*
    ```json
        {
        "profile": {
            "desc": {
                "cat": "104",
                "model": "BL-POWERSTRIP",
                "pid": "000000000000000000000000d04f0000",
                "vendor": ""
            },
            "issubdev": 0,
            "protocol": [],
            "srvs": ["112.1.104"],
            "subscribable": 0,
            "suids": [{
                "intfs": {
                    "maxworktime1": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [2, 0, 86400, 1, 1]
                    }],
                    "pwr": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [4]
                    }],
                    "mode": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [1, 1, 2, 3, 4, 5]
                    }],
                    "pwr1": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [4, 0, 1]
                    }],
                    "pwr2": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [1, 0, 1]
                    }],
                    "pwr3": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [4]
                    }],
                    "pwr4": [{
                        "act": 3,
                        "idx": 1,
                        "ifttt": 0,
                        "in": [4]
                    }]
                },
                "suid": ""
            }],
            "timeout": [3, 5],
            "ver": "",
            "wificonfigtype": 2
        },
        "strings": {
            "cat_name": "扫地机器人",
            "dev_name": "安泰迪扫地机器人",
            "error": {
                "cmd": "Execute command error",
                "device_offline": "Device is offline",
                "sdk": "SDK init failed"
            },
            "intfs": {
                "batstate": {
                    "name": "电流图标",
                    "unit": "",
                    "values": {
                        "1": "0",
                        "2": "100"
                    }
                },
                "border": {
                    "name": "沿边",
                    "values": {
                        "0": "关",
                        "1": "开"
                    }
                },
                "dblclean": {
                    "name": "定点",
                    "values": {
                        "0": "关",
                        "1": "开"
                    }
                },
                "dirctrl": {
                    "name": "方向键",
                    "values": {
                        "0": "停止",
                        "1": "前进",
                        "2": "后退",
                        "3": "左转",
                        "4": "右转"
                    }
                },
                "fullelectric": {
                    "name": "满电清扫",
                    "values": {
                        "0": "关",
                        "1": "开"
                    }
                },
                "pwr2": {
                    "name": "自动",
                    "values": {
                        "0": "关",
                        "1": "开"
                    }
                },
                "pwr": {
                    "name": "电源开",
                    "values": {
                        "0": "关",
                        "1": "开"
                    }
                },
                "pwr1": {
                    "name": "回充",
                    "values": {
                        "0": "关",
                        "1": "开"
                    }
                },
                "robot_control": {
                    "name": "启停按键",
                    "values": {
                        "0": "启动",
                        "1": "停止"
                    }
                },
                "swprbt_appoint1": {
                    "name": "预约清扫",
                    "values": {
                        "0": "关闭",
                        "1": "单次",
                        "2": "循环"
                    }
                },
                "swprbt_state": {
                    "name": "工作状态",
                    "values": {
                        "1": "休眠",
                        "2": "待机",
                        "6": "充电中",
                        "7": "充电完成",
                        "11": "拖地工作",
                        "12": "寻找充电桩",
                        "13": "清扫工作"
                    }
                },
                "swprbt_time": {
                    "name": "工作时长",
                    "unit": "min",
                    "values": {
                        "1": "0",
                        "2": "1440"
                    }
                },
                "pwr3": {
                    "name": "pwr3"
                }
            },
            "vendor_name": "BroadLink"
        }
    }
    ```

##### 4. 获取模板ready标志 
 - *message type: `READY`*
  - *message payload:`空对象{}`*

##### 5. 获取模板保存的配置信息 
  - *message type: `SAVE_ALL_SETTINGS`*  
    **由[postMessage保存模板接口](#8-模板设置保存动作发起)操作触发，触发后调用[云端产品模板数据保存接口](#4-保存产品模板)，实现产品模板数据保存**
  - *message payload:*
    ```json
    {
        files:{
            "profile.json":"...",
            "profileStrings/zh.json":"...",
            "settings.json":"..."
        }
    }
    ```

#### postMessage下发消息至模板接口

##### 1. 设置模板全局schema  
  - *message type: `GLOBAL_JSON`*  
  - *message payload:(数据为json editor获取到的json schema)*
    ```json
    {
        themeColor: "#1748ba",
        updateStrategy: "success"
    }
    ```

##### 2. 设置模板相关组件schema  
  - *message type: `COMPONENT_JSON`*  
  - *message payload:(其中json字段数据为json editor获取到的json schema)*
    ```json
    {
        json: {
            addToTimer: true,
            icon: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgi....",
            location: "home",
            name: "pwr3"
        },//json schema
        key: "pwr3"
    }
    ```

##### 3. 模板参数启用与禁用  
  - *message type: `TOGGLE_INTF`*  
  - *message payload:*
    ```json
    {
        key:'pwr',
        enable:true
    }
    ```

##### 4. 模板'实时预览'状态切换
  - *message type: `TOGGLE_PREVIEW_FLAG`*  
  - *message payload: `true`(true表示预览模式)* 


##### 5. 模板初始化数据设置  
  - *message type: `INIT_SETTINGS`*  
  - *message payload:其中files参数所需的数据为[云端获取模板信息详情接口](#3-获取产品信息详情)返回数据中的data字段对应的数据*
    ```json
    {
        profile:{...},
        strings:{...},
        settings:{...},
        previewUrl:''
    }
    ```

##### 6. 模板增加参数  
  - *message type: `ADD_INTF`*  
  - *message payload:*  
    
    `布尔型`  
    ```json
    {
        act: 3,
        addToTimer: true,
        icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d...",
        items: [{text: "低", value: 0},{text: "高", value: 1}],
        key: "speed",
        location: "home",
        name: "速度",
        type: 4
    } 
    ```

     `枚举型`  
    ```json
    {
        act: 3,
        addToTimer: true,
        items: [
            {
                text: "低",
                icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov…iTTUyMC41IDc4LjF6Ii8+DQogICAgPC9nPg0KPC9zdmc+DQo=",
                value: 1
            },
            {
                text: "中",
                icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov…iTTUyMC41IDc4LjF6Ii8+DQogICAgPC9nPg0KPC9zdmc+DQo=",
                value: 2
            },
            {
                text: "高",
                icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov…iTTUyMC41IDc4LjF6Ii8+DQogICAgPC9nPg0KPC9zdmc+DQo=",
                value: 3
            }
        ],
        key: "wind",
        location: "home",
        name: "风速",
        style: "text&icon",
        type: 1
    }
    ```

     `连续型`  
    ```json
    {
        act: 3,
        addToTimer: true,
        icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZX...",
        key: "temp",
        location: "home",
        max: 32,
        min: 16,
        name: "温度",
        step: 1,
        style: "slider",
        type: 2,
        unit: "℃"
    }
    ```

##### 7. 模板页面位置切换
  - *message type: `CHANGE_LOCATION`*  
  - *message payload:其中location字段值为`setting,home,timer`其中一个*  

    ```json
    {
        location:"setting"
    }
    ```

##### 8. 模板设置保存动作发起
  - *message type: `REQUEST_SAVE_ALL_SETTINGS`*  
    *模板保存功能由该接口发起，通知模板将内存数据写盘并将数据通过[获取模板保存的配置信息接口](#5-获取模板保存的配置信息)获取*
  - *message payload:`无` *  

