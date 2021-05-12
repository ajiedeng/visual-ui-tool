const fs = require('fs-extra')
const {templatesDir} = require('./paths')
const path = require('path')
const {runBuild} = require("./build");

const separate = '@'
const getTemplateDir = templateId=>path.join(templatesDir, templateId)
const getDependentsDirRootPath = templateId => path.join(getTemplateDir(templateId), 'dependents')
const getDefaultDependentsDirPath = templateId => path.resolve(getDependentsDirRootPath(templateId), 'default')
const getModelAndNameFromDirName = dirName => {
    const strs = dirName.split(separate)
    return {
        model: strs[0],
        name: strs[1],
    }
}

async function getProductsByTemplateId(templateId, map/*返回一个map而不是数组*/) {
    const templatePath = path.resolve(templatesDir, templateId)
    const exist = await fs.pathExists(templatePath)
    const isDir = exist && (await fs.stat(templatePath)).isDirectory()

    if (!isDir) {
        throw `所选择的模板不存在,模板ID为：${templateId}`
    }
    const productDirs = (await fs.readdir(getDependentsDirRootPath(templateId))).filter(f => f !== 'default')

    if (map) {
        let result = new Map()
        productDirs.forEach(dirName => {
            const product = getModelAndNameFromDirName(dirName)
            result.set(product.model, product.name)
        })
        return result
    } else {
        return productDirs.map(p => getModelAndNameFromDirName(p))
    }
}

const getDependentsPath = async ({templateId,model,name}) =>{
    return path.join(getDependentsDirRootPath(templateId), model + separate + name)
}

const getExistsDependentsPath = async ({templateId,model})=>{
    const products = await getProductsByTemplateId(templateId, true)
    if (!products.has(model)) {
        throw `型号为[${model}]的产品不存在`
    }
    const name = products.get(model)
    return getDependentsPath({templateId,model,name})
}


async function addProduct({model, name, templateId}) {
    const products = await getProductsByTemplateId(templateId, true)
    if (products.has(model)) {
        throw `型号为[${model}]的产品已经存在`
    }
    //根据default 拷贝一份
    await fs.copy(getDefaultDependentsDirPath(templateId), getDependentsPath({model, name, templateId}), {errorOnExist: true})
    console.log(model, name, templateId, '-产品创建成功')
}

async function getProductDetail({model, templateId}) {
    const depsPath =await getExistsDependentsPath({model, templateId})

    let files = {
        profile: 'profile.json',
        settings: 'settings.json',
        strings: 'profileStrings/zh.json'
    }
    let result = {}
    let promises = Object.keys(files).map(key => fs.readJson(path.resolve(depsPath, files[key])).then(json => result[key] = json))
    await Promise.all(promises)
    return result
}

async function save({templateId, model, files}) {

    const productDir =await getExistsDependentsPath({model, templateId})
    for (let file of Object.entries(files)) {
        let [fileName, content] = file
        let filePath = path.join(productDir, fileName)
        let exists = await fs.pathExists(filePath)
        if (exists) {
            await fs.outputFile(filePath, content)
        } else {
            console.log(`文件${filePath}不存在，已忽略`)
        }

    }
}

exports.download = async function download({templateId, model}){
    const templateDir = getTemplateDir(templateId)
    const productDir =await getExistsDependentsPath({model, templateId})
    await fs.copy(productDir, path.join(templateDir,'src/dependents'), {errorOnExist: false})
    return await runBuild(templateDir)
}



exports.save = save
exports.addProduct = addProduct
exports.getProductsByTemplateId = getProductsByTemplateId
exports.getProductDetail = getProductDetail