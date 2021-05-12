const {paths} = require('react-app-rewired')
const path = require('path')

const iotPlatform = 'dna'

module.exports = function override(config, env) {
    const isEnvDevelopment = env === 'development'
    const isPreview = process.env.REACT_APP_PREVIEW === 'true'
    const sdkPath = path.resolve(paths.appSrc, 'jssdk')

    // if(isPreview){
    //     //输出到preview目录
    //     if(config.output.path){
    //         config.output.path = path.join(config.output.path,'..','preview')
    //     }
    // }
    const additionOpts = {
        'broadlink-jssdk': sdkPath,
        adapter: isEnvDevelopment||isPreview ?
            path.resolve(paths.appSrc, '.mock', iotPlatform) :
            path.resolve(sdkPath, iotPlatform)
    }
    Object.assign(config.resolve.alias, additionOpts)
    require('react-app-rewire-postcss')(config, {
        plugins: loader => [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            }),
            require('postcss-aspect-ratio-mini')({}),
            require('postcss-px-to-viewport')({
                viewportWidth: 750, // (Number) The width of the viewport.
                viewportHeight: 1334, // (Number) The height of the viewport.
                unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
                viewportUnit: 'vw', // (String) Expected units.
                selectorBlackList: ['.ignore', '.hairlines'], // (Array) The selectors to ignore and leave as px.
                minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
                mediaQuery: false // (Boolean) Allow px to be converted in media queries.
            }),
            require('postcss-write-svg')({
                utf8: false
            }),
            require('postcss-viewport-units')({}),
            require('cssnano')({
                preset: "advanced",
                autoprefixer: false,
                "postcss-zindex": false
            })
        ]
    });
    return config
}