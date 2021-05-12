export interface Profile {
  desc: {
    cat: string;
    model: string;
    pid: string;
    vendor: string
  }
  issubdev: number;
  protocol: any[];
  srvs: string[];
  subscribable: number;
  suids:[{
    intfs:Intfs
  }],
  [prop:string]:any
}

export interface ProfileStrings{
  cat_name:string;
  dev_name:string;
  vendor_name:string
  intfs: {
    [prop:string]:IntfString
  }
  [prop:string]:any
}
export interface IntfString{
  name:string;
  unit?:string;
  values:{
    [prop:string]:string
  }
}

export interface Intf {
  act:1|2|3;
  idx:number;
  ifttt:number;
  in:[IntfType,...number[]];
  enable?:boolean;
  required?:0|1
}

interface Intfs {
  [prop:string]:[Intf]
}

/*
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
* */

export const ENUM_TYPE = 1 as const, SERIES_TYPE = 2 as const, SIMPLE_TYPE = 3 as const, BOOLEAN_TYPE = 4 as const, COULD_TPYE = 5 as const

export type IntfType = typeof ENUM_TYPE|typeof SERIES_TYPE|typeof SIMPLE_TYPE|typeof BOOLEAN_TYPE|typeof COULD_TPYE

export const getIntfsFromProfile = (profile:Profile):Intfs => {
  return profile.suids[0].intfs
}

export const getItemFromProfile = (profile:Profile, key:string):Intf => {
  return getIntfsFromProfile(profile)[key][0] || {}
}

export const getIntfName = (strings:ProfileStrings, key:string) :string => {
  const name = strings.intfs[key] && strings.intfs[key].name
  return name || key
}

export const getEnumValues = (profile:Profile, key:string):number[] => {
  const items = getItemFromProfile(profile, key)['in'] || []
  const [type, ...values] = items
  return values
}

export const getEnumValueName = (strings:ProfileStrings, key:string, value:string|number):string => {
  const values = (strings.intfs[key] && strings.intfs[key].values) || {}
  return values[value + ''] || key + '-' + value
}

export const getItemFromStrings = (strings:ProfileStrings, key:string):IntfString => {
  return strings.intfs[key]
}

export const getIntfType = (profile:Profile, key:string):IntfType => {
  return getItemFromProfile(profile, key).in[0]
}