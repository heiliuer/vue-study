## vue-vuex

> [参考文档](https://github.com/vuejs/vuex)
> [参考文档](http://vuex.vuejs.org/zh-cn/)

#### 此版块未完成


1. 盗图

    ![](references/vuex.png)

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