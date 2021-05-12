let TEMPLATES = {
    error: null,
    data: {
        list: [
            {
                id: 123,
                title: '模板1',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '电工',
                supports: ['开光', '定时', '延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',

                products: [
                    {
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
                id: 3343,
                title: '模板2',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '照明',
                supports: ['开光', '定时', '延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',

                products: [
                    {
                        model: 'JS-28',
                        name: '手机上',
                    }, {
                        model: 'JS-29',
                        name: '手机上',
                    }, {
                        model: 'JS-30',
                        name: '手机上',
                    }, {
                        model: 'JS-31',
                        name: '手机上',
                    }, {
                        model: 'JS-32',
                        name: '手机上',
                    }, {
                        model: 'JS-33',
                        name: '手机上',
                    }, {
                        model: 'JS-34',
                        name: '上电后',
                    }, {
                        model: 'JS-35',
                        name: '手机上',
                    }, {
                        model: 'JS-36',
                        name: '登榜灯泡',
                    }, {
                        model: 'JS-37',
                        name: '灯带',
                    }, {
                        model: 'JS-38',
                        name: '排插',
                    }
                ]
            }, {
                id: '12209',
                title: '模板2',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '安防',
                supports: ['开光', '定时', '延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
            }, {
                id: 'sdffs',
                title: '模板1',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '电工',
                supports: ['开光', '定时', '延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
            }
        ]
    }
}

exports.getAllTemplates =async function () {
    return TEMPLATES
}