const makeSchemaData = (key,schema) =>({
    key,schema
})

export const getGlobalSettingSchema = (settings)=>{

    return {
        title: "全局属性",
        type: "object",
        required: [
            "updateStrategy",
            "themeColor",
        ],
        properties: {
            themeColor: {
                "type": "string",
                "title": "主题色",
                "format": "color",
                "default": settings.themeColor
            },
            updateStrategy: {
                "type": "string",
                "title": "更新策略",
                "description": "immediate：立刻更新;success：控制成功后更新;loop：只依靠轮询",
                "default": settings.updateStrategy,
                "enum": ['immediate', 'success', 'loop']
            }
        }
    }
}

const commonSchema= ({name,addToTimer,icon,location})=>{
    return {
        title: "功能",
        type: "object",
        required: [
            "name",
            "location",
            "addToTimer"
        ],
        properties: {
            name: {
                "type": "string",
                "title": "功能名称",
                "maxLength": 10,
                "default": name
            },
            addToTimer: {
                "type": "boolean",
                "title": "定时/场景",
                "description": "是否添加到定时/场景界面",
                "default": addToTimer
            },
            icon:{
                "type": "string",
                "title": "图标",
                "media": {
                    "binaryEncoding": "base64",
                    "type": "img/svg"
                },
                "default":icon
            },
            location: {
                "type": "Integer",
                "title": "显示位置",
                "default": location,
                "enumSource": [{
                    // A watched field source
                    "source": [
                        {
                            "value": 'home',
                            "title": "首页"
                        },
                        {
                            "value": 'setting',
                            "title": "功能设置"
                        }
                    ],
                    "title": "{{item.title}}",
                    "value": "{{item.value}}"
                }]
            }
        }
    }
}

export const booleanSchema = (key,defaultVal) => makeSchemaData(key,commonSchema(defaultVal))

export const enumSchema = (key,defaultSetting) =>{
    const schema = commonSchema(defaultSetting)
    schema.required.push('style','items')
    Object.assign(schema.properties,{
        style: {
            "type": "string",
            "title": "调节样式",
            "enumSource": [{
                // A watched field source
                "source": [
                    {
                        "value": 'text',
                        "title": "文字"
                    },
                    {
                        "value": 'text&icon',
                        "title": "icon+文字"
                    }
                ],
                "title": "{{item.title}}",
                "value": "{{item.value}}"
            }],
            "default": defaultSetting.style
        },
        items: {
            "type": "array",
            "format": "table",
            "title": "枚举功能",
            "uniqueItems": true,
            "items": {
                "type": "object",
                "title": "枚举项",
                required: [
                    "value",
                    "text"
                ],
                "properties": {
                    "value": {
                        "type": "integer",
                        "title": "枚举值",
                    },
                    "text": {
                        "type": "string",
                        "title": "名称",
                    },
                    icon: {
                        "type": "string",
                        "title": "图标",
                        "media": {
                            "binaryEncoding": "base64",
                            "type": "img/svg"
                        },
                    }
                }
            },
            "default": defaultSetting.items
        }
    })
    return makeSchemaData(key,schema)
}