function request(url, data, method, callback) {
  wx.request({
    url: url,
    data: data,
    method: method,
    header: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    dataType: 'json',
    success: function (res) {
      callback && callback(res.data)
    },
    fail: function (res) {
      console.error('request fail:' + url)
      console.error(res)
    },
    complete: function () {

    }
  })
}

function each(arr, fn) {
  if (arr instanceof Array) {
    for (let i = 0, len = arr.length; i < len; i++) {
      fn(i, arr[i])
    }
  } else {
    for (let i in arr) {
      fn(i, arr[i])
    }
  }
}
String.prototype.find = function (str) {
  if (this.indexOf(str) > -1) {
    return true
  }
  return false
}

function alert(s) {
  // 提示弹层
  wx.showModal({
    title: '提示',
    content: s,
    showCancel: false,
    success: function (res) {

    }
  })
}

function loading() {
  if (wx.showLoading) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  } else {
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 100000
    })
  }
}

function hideLoading() {
  if (wx.showLoading) {
    wx.hideLoading()
  } else {
    wx.hideToast()
  }
}

function trim(s) {
  // 去除首尾空格
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

function getText(str) {
  // html提取纯文本
  return str.replace(/<\/?p.*?>|<img.*?>|<br.*?\/>|&nbsp;|<\/?span.*?>|<\/?a.*?>|<\/?em.*?>|<\/?strong.*?>/gi, '')
}

function unique(array) {
  // 数组去重
  const res = [];
  const json = {};
  for (let i = 0; i < array.length; i++) {
    if (!json[array[i]]) {
      res.push(array[i]);
      json[array[i]] = 1;
    }
  }
  return res;
}

function log(s) {
  console.log(s)
}

function extend(target, options) {
  for (let name in options) {
    target[name] = options[name];
  }
  return target;
}
function goPage(e) {
  const data = e.currentTarget.dataset

  wx.navigateTo({
    url: `/pages/${data.page}/${data.page}`
  })
}
function url2abs(str) {
  // img链接转换为绝对路径
  return str.replace(/<img.*?\ssrc="\//gi, '<img src="http://korjo.fans-me.com/').replace(/&#39;/ig, "'")
}
function saveBarrageData(e,index,tab,pareant,childStyle,cb){
  var that = this
  var barrage_data = that.data.barrage_data;
  var view = e.currentTarget.dataset.view
  console.log(pareant)
  each(pareant,(i,v)=>{
    v.choiced = ""
  })
  tab[view].check = true
    pareant[index].choiced = childStyle
  cb&&cb()

}
function loopPlayBack(){
  const backgroundAudioManager = wx.getBackgroundAudioManager()
  backgroundAudioManager.title = '此时此刻'
  backgroundAudioManager.epname = '此时此刻'
  backgroundAudioManager.singer = '汪峰'
  backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
  backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
}
function record(){
  
}
//上传资源获得其链接 资源类型:image audio movie
function adminUpload(tempUrl, typeOfUpload, callbackWhenSuccess, callbackWhenFail) {
    ////console.log(typeOfUpload+": "+tempUrl);
      wx.uploadFile({
          url: `https://www.korjo.cn/KorjoApi/AdminUpload`,
          filePath: tempUrl,
          name: 'file',
          formData: {
              path: "korjo",
              type: typeOfUpload
          },
          complete: function(res) {
              callbackWhenSuccess(res);
              // console.log('dd',res)
          }
      })
}
function alter(title,content,cb){
  wx.showModal({
    title: title,
    content: content,
    success(res){
      cb&&cb(0)
    }
    
  })
}


module.exports = {
  server: 'https://www.korjo.cn/',
  data: getApp().globalData,
  get: function (url, data, callback) {
    let server = this.server
    if (url.indexOf('https://') > -1) {
      server = ''
    }
    request(server + url, data, 'GET', callback)
  },
  post: function (url, data, callback) {
    let server = this.server
    if (url.indexOf('https://') > -1) {
      server = ''
    }
    request(server + url, data, 'POST', callback)
  },
  each,
  trim,
  alert,
  getText,
  unique,
  loading,
  hideLoading,
  log,
  extend,
  goPage,
  url2abs,
  saveBarrageData,
  loopPlayBack,
  record,
  adminUpload,
  alter
}