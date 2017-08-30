import config from "../config"

var tingApiBaseUrl = config.proxyTingapi ? "/v1/restserver/ting" : "http://tingapi.ting.baidu.com/v1/restserver/ting"
var suggestBaseUrl = config.proxyTingapi ? "/info/suggestion" : "http://sug.music.baidu.com/info/suggestion"

var apiMethod = {
    search: 'baidu.ting.search.catalogSug',
    detail: 'baidu.ting.song.play',
    lrc: 'baidu.ting.song.lry',
    recommand: 'baidu.ting.song.getRecommandSongList',
    download: 'baidu.ting.song.downWeb',
    list: 'baidu.ting.billboard.billList'
}

var hackImg = url => 'http://www.beihaiw.com/pic.php?url=' + url

function getRequest(url) {
    return data => new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            data: data,
            success: (data) => {
                resolve(data);
            },
            error: err => {
                if(err.status==200){
                    resolve(err.responseText);
                }
                reject(err)
            }
        })
    });
}
var requestTingApi = getRequest(tingApiBaseUrl)
var requestSuggest = getRequest(suggestBaseUrl)

var searchSuggest = (keyword) => requestSuggest({
    format: 'json',
    word: keyword,
    version: 2,
    from: 0,
    callback: "sug",
    third_type: 0,
    client_type: 0
})


var search = (keyword) => requestTingApi({
    method: apiMethod['search'],
    query: keyword
})

var limit = 12;

// type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
var getOnline = (type, paged) => {

    return requestTingApi({
        method: apiMethod['list'],
        type: type,
        offset: limit * (paged - 1),
        size: limit
    }).then(data => {
        data = data || {}
        if (data.billboard) {
            data.billboard.pic_s210 = hackImg(data.billboard.pic_s210)
            data.billboard.pic_s260 = hackImg(data.billboard.pic_s260)
            data.billboard.pic_s444 = hackImg(data.billboard.pic_s444)
            data.billboard.pic_s640 = hackImg(data.billboard.pic_s640)
        }
        if (data.song_list) {
            data.song_list.forEach(item => {
                item.pic_big = hackImg(item.pic_big);
                item.pic_small = hackImg(item.pic_small);
            })
        }
        return data;
    })
}

var getDetail = id => requestTingApi({
    method: apiMethod['detail'],
    songid: id
})

export default {
    getOnline,
    getDetail,
    search,
    requestTingApi,
    apiMethod,
    searchSuggest,
    config: {
        limit
    }
}