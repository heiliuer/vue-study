/**
 * Created by Administrator on 2016/5/3.
 */
var rf = require("fs")
var iconv = require('iconv-lite');
var data = rf.readFileSync("hoss.txt", "utf-8")
var datas=data.split("\r\n")
var json=[];

for(var d in datas){
    var d=datas[d]
   // console.log(d,d.indexOf("#")==0, d.indexOf("- "))
    if(d.indexOf("##")==0){
        if(hos){
            json.push(hos)
        }
        var hos={location:d.replace("##","").replace("##",""),hoss:[]}
    }else if( d.indexOf("- ")==0&&hos){
        hos.hoss.push({name:d.replace("- ","")})
    }
   
}
    JSON.st
    // 把中文转换成字节数组
    var arr = iconv.encode("var HOSS="+JSON.stringify(json)+";", 'utf-8');

    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    rf.writeFile("hoss.js", arr, function(err){
        if(err)
            console.log("fail " + err);
        else
            console.log("ok");
    });

console.log(json)

