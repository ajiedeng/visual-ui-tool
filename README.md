# visual-ui-tool

可视化平台 
# 接口
### 服务器端
1. 模板、产品与品类列表接口  
三者之间关系：  
一个品类有多个模板  
一个模板可以派生（实例化）多个产品
  
2. 根据产品ID获取产品profile  
3. 添加产品（根据模板ID与品类ID）  
4. 提交国际化信息

### 模板（PostMessage）接口
1. 发送全局配置（Schema）& 接受配置JSON
2. 发送组件配置（Schema）& 接受配置JSON
3. 添加互斥
4. 功能的更改（增加或者删除）
3. 保存（持久化）配置信息（可能需要模块与云端交互？？）


# 对于标准profile的扩展
```javascript
入参类型
由数组构成，第一个元素表示参数格式：
1 表示枚举型
2 表示连续型
3 表示简单类型

枚举型格式
[1, V1,V2,V3]
连续型格式
[2, 最小值，最大值，步长，倍数], 倍数可以是1,10,100,1000。
简单类型
[3]
布尔类型【扩展】
[4]
云类型，如定时、延时、历史统计等复杂的功能【扩展】
[5]


注：连续型数据上报云端，云端会处理倍数，从云端获取的历史记录中，其值为真实值。

动作类型act
Bit0 置1 get
Bit1 置1set
两个bit都是1 读写都支持

使能类型enable【扩展】  
0 不启用
1 启用
未定义默认为  1

是否为必选required【扩展】
0 非必选
1 必选
未定义默认为  0


```




# 依赖框架  
https://github.com/json-editor/json-editor  
https://react-redux.js.org/  
https://redux-starter-kit.js.org/   
https://github.com/redux-utilities/redux-actions  
https://immerjs.github.io/immer/docs/introduction  
https://github.com/timarney/react-app-rewired  [Tweak the create-react-app webpack config(s) without using 'eject' and without creating a fork of the react-scripts.]    
https://github.com/formatjs/react-intl


# 参考资料  
https://github.com/CntChen/cntchen.github.io/issues/15  
https://github.com/CntChen/cntchen.github.io/issues/17  
https://codesandbox.io/s/rtk-github-issues-example-03-final-ihttc?from-embed  
https://codesandbox.io/s/rtk-convert-todos-example-uqqy3?from-embed  

