const {
    override,
    addDecoratorsLegacy,
    fixBabelImports,
    addLessLoader,
} = require("customize-cra");

//修改@primary-color
//const modifyVars = require('./theme/blue');

module.exports = override(
    // enable legacy decorators babel plugin
    addDecoratorsLegacy(),
    fixBabelImports(
        'import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }
    ),
    addLessLoader(
        {
            javascriptEnabled: true,
            //modifyVars,
        }
    ),
)