/**
 * Created by Heiliuer on 2016/12/17 0017.
 */
/**
 * Created by Heiliuer on 2016/8/14 0014.
 */
function extend() {
  var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false,
    toString = Object.prototype.toString,
    hasOwn = Object.prototype.hasOwnProperty,
    push = Array.prototype.push,
    slice = Array.prototype.slice,
    trim = String.prototype.trim,
    indexOf = Array.prototype.indexOf,
    class2type = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regexp",
      "[object Object]": "object"
    },
    jQuery = {
      isFunction: function (obj) {
        return jQuery.type(obj) === "function"
      },
      isArray: Array.isArray ||
      function (obj) {
        return jQuery.type(obj) === "array"
      },
      isWindow: function (obj) {
        return obj != null && obj == obj.window
      },
      isNumeric: function (obj) {
        return !isNaN(parseFloat(obj)) && isFinite(obj)
      },
      type: function (obj) {
        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
      },
      isPlainObject: function (obj) {
        if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
          return false
        }
        try {
          if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
            return false
          }
        } catch (e) {
          return false
        }
        var key;
        for (key in obj) {
        }
        return key === undefined || hasOwn.call(obj, key)
      }
    };
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }
  if (typeof target !== "object" && !jQuery.isFunction(target)) {
    target = {}
  }
  if (length === i) {
    target = this;
    --i;
  }
  for (i; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) {
          continue
        }
        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && jQuery.isArray(src) ? src : []
          } else {
            clone = src && jQuery.isPlainObject(src) ? src : {};
          }
          // WARNING: RECURSION
          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

function getDateByTime(time) {
  let date = new Date().setTime(time);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
  }
}

function getApiPrefix() {
  return process.env.NODE_ENV == "development" ? "/" : "http://"
}


Date.prototype.formatDate = function (fmt) { // author: meizz
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds()
    // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4
      - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
        ? (o[k])
        : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

function formatDate(time, format) {
  if (!format) {
    format = "yyyy-MM-dd hh:mm"
  }
  let date = new Date()
  date.setTime(time)
  return date.formatDate(format)

}

window.formatTimestampWithoutYear = function (time) {
  if (time != 0 && !time) {
    return "";
  }
  var timePeriod = (new Date().getTime() - time) / 1000;
  if (timePeriod <= 60) {
    return "刚刚";
  } else if (timePeriod < 3600) {
    return parseInt(timePeriod / 60) + "分钟前";
  } else if (timePeriod < 3600 * 6) {
    return parseInt(timePeriod / 3600) + "小时前";
  }
  var timeDate = new Date(time);
  var isThisYear = timeDate.getFullYear() == new Date().getFullYear();
  return timeDate.formatDate((isThisYear ? "" : "yyyy-") + "MM-dd hh:mm");
}

window.formatTimestamp = function (time) {
  return time ? new Date(time).formatDate("yyyy-MM-dd hh:mm") : "";
}
window.formatTimestampWithoutHM = function (time) {
  var timeDate = new Date(time);
  var isThisYear = timeDate.getFullYear() == new Date().getFullYear();
  return time ? timeDate
      .formatDate((isThisYear ? "" : "yyyy-") + "MM-dd") : "";
}

//function extend
export default {
  extend,
  getDateByTime,
  getApiPrefix,
  formatDate
}
