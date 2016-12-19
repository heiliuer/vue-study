## vue2.0 & vue-router webpack

> [参考文档](http://router.vuejs.org/zh-cn/essentials/getting-started.html)

1. 安装依赖

    `npm install`
    
    `npm install webpack -g`
    
    `npm install webpack-dev-server -g`
    
2. 启动webpack-dev-server

    `webpack-dev-server`
    
3. 启动文件编写监测自动编译配置

    `webpack --watch`
    
>   `webpack-dev-server` 之后执行 `webpack` , 由于dev-server的缓存问题，文件没生效
>   最好执行`webpack-dev-server --watch`, 修改html时，不重新打包，在js代码处回车，触发重新打包。