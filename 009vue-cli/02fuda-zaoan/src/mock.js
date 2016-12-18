/**
 * Created by Heiliuer on 2016/12/17 0017.
 */
import Mock from "mockjs"
import utils from "./utils/common.utils"


function getResultMock(data) {
  return utils.extend(true, {"status": 0, "msg": "", "data": {}}, data)
}

Mock._mock = Mock.mock

Mock.mock = function () {
  var args = Array.prototype.slice.call(arguments)
  if (args.length > 1 && typeof  args[1] == "function") {
    var orgFunc = args[1]
    args[1] = function (options) {
      let result = orgFunc.apply(this, arguments);
      console.debug("mock request: \n", "options\n", options, "result\n", result, "\n");
      return result;
    }
  }
  return Mock._mock.apply(Mock, args);
}

var enable_log = false

function log() {
  if (enable_log) {
    console.log(arguments)
  }
}

export default function () {

  Mock.mock(/api\/datas.*/, function (options) {
    log(options)
    var queries = options.url.split("?")[1].split("&")
    var queriesObj = {}
    queries.forEach(function (query) {
      var datas = query.split("=")
      queriesObj[datas[0]] = datas[1]
    })

    var month = queriesObj["month"]
    month = parseInt(month)
    // console.log(queriesObj)

    return Mock.mock(getResultMock({
      "data": {
        "records|10-20": [{
          "id": /[a-z][A-Z][0-9]{9}/,
          "createTime": /1481923[0-9]{6}/,
          "signTime": /1481923[0-9]{6}/,
          "success|6-10": true,
          "autoSigned|6-10": true,
          "month": month,
          "day|+1": 1,
          "signDate": "2016-@month()-@day",
          "logJson":"{\"Success\":true}"
        }]
      }
    }))
  })

  Mock.mock(/api\/login.*/, function (options) {
    log(options)
    return Mock.mock(getResultMock({
      "data": {},
      "status": 0
    }))
  })

  Mock.mock(/api\/sign.*/, function (options) {
    log(options)
    return Mock.mock(getResultMock({
      "data": {},
      "status|0-1": 0
    }))
  })

  Mock.mock(/api\/getConfigs.*/, function (options) {
    log(options)
    return Mock.mock(getResultMock({
      "data": {"autoSign|1-1":true},
      "status|0-1": 0
    }))
  })


  //name value
  Mock.mock(/api\/setConfig.*/, function (options) {
    log(options)
    return Mock.mock(getResultMock({
      "data": {},
      "status|0-1": 0
    }))
  })
}
