const path = require('path')
const util = require('util')
const exec =  util.promisify(require('child_process').exec)
const zip = util.promisify(require('cross-zip').zip)

exports.runBuild =async function runBuild(cwd) {
    console.time("npm run build")
    const  { stdout, stderr }  = await exec('npm run build',{cwd})
    console.timeEnd('npm run build')
    const inPath = path.join(cwd, 'build')
    const outPath = path.join(cwd, 'build.zip')
    await zip(inPath,outPath)
    // console.log('stdout:', stdout);
    // console.error('stderr:', stderr);
    return outPath
}