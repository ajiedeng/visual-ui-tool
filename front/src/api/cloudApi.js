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
                id: 422,
                title: '模板2',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '照明',
                supports: ['开光', '定时', '延时', '童锁', '电流','开光', '定时', '延时', '童锁'],
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
            },{
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
                supports: ['开光', '定时', '延时', '童锁', '电流','延时', '童锁', '电流','延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
            },
            {
                id: 'xxx',
                title: '模板1',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '电工',
                supports: ['开光', '定时', '延时', '童锁', '电流','延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
            },
            {
                id: 'ggg',
                title: '模板1',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '电工',
                supports: ['开光', '定时', '延时', '童锁', '电流','开光', '定时', '延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
            },
            {
                id: 'rrr',
                title: '模板1',   //string    模本的名称
                editable: true,//boolean  是否支持编辑
                extendable: true,//boolean  是否支持新增自定义参数
                category: '电工',
                supports: ['开光', '定时', '延时', '童锁', '电流','开光', '定时', '延时', '童锁', '电流','开光', '定时', '延时', '童锁', '电流','开光', '定时', '延时', '童锁', '电流','开光', '定时', '延时', '童锁', '电流'],
                snapshot: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1924313363,3424253386&fm=173&s=F004DA149C203F0FF29950C20300A090&w=600&h=339&img.JPG',
            }
        ]
    }
}

const cloudURL = 'http://10.10.30.207:3009';

const callCloud = ({method,interfaceName})=>{
    return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4){
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304){
            console.log(xhr.getAllResponseHeaders());
            const name = xhr.getResponseHeader('Content-Disposition');
          const filename = name.substring(20, name.length);
          const blob = new Blob([xhr.response]);
          let link = document.createElement('a');
          let url = URL.createObjectURL(blob);
          link.style.display = 'none';
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
            if(typeof xhr.responseText === 'string'){
                resolve(JSON.parse(xhr))
            }else{
                resolve(xhr)
            }
            
            } else {
            console.log("Request was unsuccessful: " + xhr.status);
            reject(xhr.status)
            }
        }
    }
    xhr.open(method,cloudURL+interfaceName);
    xhr.send();
    });
    
}

const fetchCloud = ({method,interfaceName,data})=>{
      // Default options are marked with *
      const fetchRequest = {
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        method: method||'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
      };
      if(data && method === 'POST'){
        fetchRequest.body =  JSON.stringify(data);
        fetchRequest.headers = {
        //   'user-agent': 'Mozilla/4.0 MDN Example',
          'content-type': 'application/json'
        }
      }
      console.error('----fetchRequest---',fetchRequest);
      if(method==='GET'){
        return fetch(cloudURL+interfaceName).then(res=>{
            if(res.status===404 || res.status===500){
              throw new Error(res)
            }else{
                return res.json()
            }
        }).catch(e=>{
            console.error(`error happend+${e.status}+' '+${e.statusText}`);
        }) // parses response to JSON
      }
  return fetch(cloudURL+interfaceName, fetchRequest).then(res=>{
      if(res.status===404 || res.status===500){
        throw new Error(res)
      }else{
          return res.json()
      }
  }).catch(e=>{
      console.error(`error happend+${e.status}+' '+${e.statusText}`);
  }) // parses response to JSON
}

export async function getAllTemplates() {
    // const template =  await callCloud({method:'GET',interfaceName:'/templates'})

    const template =  await fetchCloud({method:'GET',interfaceName:'/templates'})
    if(template&&template.data){
        return {data:{list:template.data}}
    }else{
        console.log('--mock--data---');
        return TEMPLATES
    }
    // return TEMPLATES
}

export async function addProduct(templateId, {model, name}) {
    // const copy = JSON.parse(JSON.stringify(TEMPLATES));
    // const temp = copy.data.list.find(t => t.id === templateId);
    // const array = temp.products || [];
    // array.push({
    //     model, name
    // })
    // temp.products = array
    // TEMPLATES = copy
    // return TEMPLATES
    await fetchCloud({method:'POST',interfaceName:'/products/add',data:{templateId,model,name}});
    return getAllTemplates()
}

export async function getProductDetail(model, templateId) {
    const productDetail = await fetchCloud({method:'POST',interfaceName:'/products/detail',data:{templateId,model}});
    console.log('----productDetail---',productDetail);
    if(productDetail){
        return productDetail
    }else{
        return {
            error: null,
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
                mutex: {}
            }
        }
    
    }
    
}


export async function saveTemplateFile({templateId,model,files}){
    return await fetchCloud({method:'POST',interfaceName:'/products/save',data:{templateId,model,files}});
}


export async function downLoadTemplateZip({templateId,model}){
    return await callCloud({method:'GET',interfaceName:'/products/download?templateId='+templateId+'&model='+model});
}