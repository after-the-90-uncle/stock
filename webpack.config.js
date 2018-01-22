var path = require('path');
var webpack = require('webpack');
var dev=process.env.NODE_ENV==='dev';
var glob = require("glob");

var files = glob.sync("./static/**/*.entry.js");

function entry(name){
    if(dev){
        return ['webpack-dev-server/client?http://localhost:4001',
                'webpack/hot/only-dev-server',
                name];
    }
    return name;
}

function entries(files){
    var ret={};
    files.map((val) => {
        var name=val.slice('./static/'.length, 0 - '.entry.js'.length);
        ret[name]=entry(val)

    });

    return files;
}

function js_ugly(config, ugly){
    if(ugly===true || ugly==='true'){
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({compress:{warnings:false},output:{comments:false}}));
    }
}

//获得所有style 下css
var cssFiles = glob.sync("./static/**/style/*.css");
function getCssObject(cssFiles){
    var cssObject = {};
    cssFiles.forEach((val)=>{
        cssObject[val] = __dirname + '/dist/static/style/'+val;
    });
    return cssObject
}
module.exports = {
    devtool: 'eval',
    resolve:{
        extensions:['.js', '.jsx'],
        alias: Object.assign({},{
            "antd.css":__dirname + "/node_modules/antd/dist/antd.min.css",
        },getCssObject(cssFiles))
    },
    
    entry: [
        "webpack-dev-server/client?http://localhost:4001",
        "webpack/hot/only-dev-server",
        'babel-polyfill',
        'react-hot-loader/patch',
        ...files
    ],
    output: {
        path: __dirname+ '/dist/static',
        filename: '[name].js',
        publicPath: '/static/'
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {

        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /.jsx?$/,
                loaders: [ 'babel?{"presets": ["es2015", "react", "stage-0", "stage-3"], "plugins": [ "transform-runtime", "syntax-async-functions", "transform-function-bind"]}'],
                exclude: /node_modules/
            },
        ],
    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        proxy: {
            "*": "http://localhost:4000"
        },
        port:4001,
        publicPath: '/static/',
        hot: true,
        historyApiFallback: true
    }
};

js_ugly(module.exports,!dev);

