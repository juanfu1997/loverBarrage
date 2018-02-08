// pages/set/set.js
const op = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
const $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:getApp().globalData.img,
    tab:[
         {image:"/images/content.png",txt:"内容",class:'tab_choiced',check:false},
         {image:"/images/font.png",txt:"字体",class:'tab_choice',check:true},
         {image:"/images/size.png",txt:"大小",class:'tab_choice',check:true},
         {image:"/images/color.png",txt:"颜色",class:'tab_choice',check:true},
         {image:"/images/picture.png",txt:"图片",class:'tab_choice',check:true},
         {image:"/images/record.png",txt:"录音",class:'tab_choice',check:true},
         {image:"/images/bgmusic.png",txt:"音乐",class:'tab_choice',check:true},
         {image:"/images/effect.png",txt:"效果",class:'tab_choice',check:true},
         {image:"/images/direction.png",txt:"方向",class:'tab_choice',check:true}
    ],
    // tab_type:'tab_choice',
    screen:{
      HdIndex:0,
      BdIndex:0
    },
    music_list:{musicNum:20,choiced:0},
    windowWidth:getApp().globalData.windowWidth,
    windowHeight:getApp().globalData.windowHeight,
    barrage_data: { textarea: "", font: "SimHei", size: "200rpx", color: "#e4ff00", picture_1: "", picture_2: "", effect: "none", direction:"vertical",bgmusic:getApp().globalData.music+'0.mp3',record:''},
    preset_list:[
      { txt: "欢迎回家", choiced:""},
         { txt: "团友们 请集合", choiced: ""},
         { txt: "生日快乐", choiced: ""},
         { txt: "我爱你", choiced: ""},
         { txt: "嫁给我吧", choiced: ""},
         ],
    font_style:[
      { style: "黑体", family: "SimHei", choiced: "color:#f29c9f;"},
      { style: "书宋", family: "HYA1GJ", choiced: ""},
      { style: "仿宋", family: "FangSong", choiced: ""},
      { style: "楷书", family: "KaiTi", choiced: ""},
         ],
    size_style:[
      { style: "最大", size: "200rpx", size_view: "80rpx", choiced: "color:#f29c9f;"},
      { style: "较大", size: "150rpx", size_view: "70rpx", choiced: ""},
      { style: "大", size: "100rpx ", size_view: "60rpx",choiced: ""},
      { style: "中", size: "60rpx ", size_view: "50rpx",choiced: "" },
      { style: "小", size: "30rpx ", size_view: "30rpx", choiced: ""},
         ],
    color_style:[
      { style: "1", color: "#e4ff00", choiced: "color:#7dbd29;"},
      { style: "2", color: "#bdde35", choiced: ""},
      { style: "3", color: "#5cffdd", choiced: ""},
      { style: "4", color: "#49d6ff", choiced: ""},
      { style: "5", color: "#457cf9", choiced: ""},
      { style: "6", color: "#ac93ff", choiced: ""},
      { style: "7", color: "#eea9ff", choiced: ""},
      { style: "8", color: "#ff449c", choiced: ""},
      { style: "9", color: "#fe2433", choiced: ""},
      { style: "10", color: "#ff520e", choiced: ""},
      { style: "11", color: "#ffae00", choiced: ""},
      { style: "12", color: "#f8cc00", choiced: ""},
      { style: "13", color: "#ffb7d6", choiced: ""},
      { style: "14", color: "#b0f6fc", choiced: ""},
      { style: "15", color: "#ffffff", choiced: ""},
         ],
    picture_style:[
      { style: "最大", size: "80rpx", picture: "", choiced: "color:#7dbd29;"},
      { style: "较大", size: "60rpx", picture: "", choiced: ""},
         ],
    effect_style:[
      { style: "闪烁", effect: "flash", choiced: ""},
      { style: "翻转", effect: "flipInY", choiced: ""},
      { style: "摇摆", effect: "swing ", choiced: ""},
      { style: "抖动", effect: "shake ", choiced: ""},
      { style: "放大抖动", effect: "tada ", choiced: ""},
         ],
    direction_style:[
      { style: "vertical", direction: "vertical_icon", icon: "/images/verticaled.png", choiced: "color:#7dbd29;"},
      { style: "transverse", direction: "transverse_icon", icon: "/images/transverse.png", choiced: ""},
    ],
    type:[
      {type:'初识'},
      {type:'暗恋'},
      {type:'告白'},
      {type:'求婚'},
      {type:'节日'},
      {type:'道歉'},
    ],
    justMet:getApp().globalData.justMet,
    type_list:[
      {type:'初识',image:'justMet.jpg',show:false,json:getApp().globalData.justMet},
      {type:'暗恋',image:'crush.jpg',show:false,json:getApp().globalData.crush},
      {type:'告白',image:'sayLove.jpg',show:false,json:getApp().globalData.sayLove},
      {type:'求婚',image:'propose.jpg',show:false,json:getApp().globalData.propose},
      {type:'节日',image:'festival.jpg',show:false,json:getApp().globalData.festival},
      {type:'道歉',image:'apologize.jpg',show:false,json:getApp().globalData.apologize},
    ],
    type_image:'envelope.png',
    type_demo:[],
    showType:true,
    textarea:true,
    play:true,
    closeBgmusic:'music.png',
    showTab:true,

  
  },
  closeBgmusic(){
    var that = this
    var barrage_data = that.data.barrage_data
    var closeBgmusic = that.data.closeBgmusic
    if(closeBgmusic == 'music.png'){
      closeBgmusic = 'close_music.png'
      barrage_data.bgmusic = ''
    }else{
      closeBgmusic = 'music.png'
      barrage_data.bgmusic = 'https:www.korjo.cn/xcx/loverBarrage/music/0.mp3'

    }
    that.setData({
      closeBgmusic,
      barrage_data,
    })
  },
  playRecord(){
    var that = this
    var barrage_data = that.data.barrage_data
    var music_list = that.data.music_list
    barrage_data.record = that.data.video
    $.alter('*提示*','录音和音频同事只能选择一个',function(){
      music_list.choiced = -1
      barrage_data.bgmusic = ''
      barrage_data.record = that.data.video
      that.setData({
        barrage_data,
        music_list,
      })
      that.playVideo('录音','录音','',that.data.video,)
    })
    
  },
  playMusic(e){
    var that = this
    var index = e.target.dataset.index
    // var music_choiced = that.data.music_choiced
    var barrage_data = that.data.barrage_data
    var music_list = that.data.music_list
    var src = getApp().globalData.music + e.target.dataset.index+'.mp3'
    // music_list.choiced = true
    barrage_data.record = ''
    barrage_data.bgmusic = src
    music_list.choiced = index

    that.setData({
      barrage_data,
      music_list,
      // music_choiced:index,
    })
    // console.log(e)
    that.playVideo('音乐','音乐','',src)
  },
  playVideo(title,singer,coverImgUrl,src){
    var that = this
    // that.backgroundAudioManager.src = that.data.video
    // const backgroundAudioManager = wx.getBackgroundAudioManager()
    // wx.downloadFile({
    //   url: 'https://www.korjo.cn/xcx/loverBarrage/music/0.mp3', //仅为示例，并非真实的资源
    //   success: function(res) {
    //     // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //     if (res.statusCode === 200) {
          that.backgroundAudioManager.title = title
          that.backgroundAudioManager.singer = singer
          that.backgroundAudioManager.coverImgUrl = coverImgUrl
          // that.backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
          that.backgroundAudioManager.src = src
          console.log('背景音乐',src)
            // wx.playVoice({
            //   filePath: res.tempFilePath
            // })
    //     }
        
    //   },
    //   fail(res){
    //       console.log('背景音乐',src)
    //     console.log(res)
    //   }
    // })
    

    // that.recorderManager.onStop((res) => {
    //   // const { frameBuffer } = res
    //   console.log('res',res,)
    //   console.log('frameBuffer.byteLength',res.tempFilePath)
    // })

     // wx.playVoice({
     //    filePath:src,
     //    complete(res){
     //      console.log(11111,res)
     //    }
     // })
  },
  closeRecord(){
    var that = this
    that.recorderManager.stop()
    that.recorderManager.onStop((res) => {
      // const { frameBuffer } = res
      wx.saveFile({
        tempFilePath: res.tempFilePath,
        success: function(res) {
          var savedFilePath = res.savedFilePath
          console.log('22',savedFilePath)
          $.adminUpload(savedFilePath,'audio',function(res){
            console.log('www',savedFilePath,res,)
              that.setData({
                play:false,
                video:getApp().globalData.korjo+res.data,
              })
            })
        }
      })
      console.log('res',res.tempFilePath)
      
      console.log('frameBuffer.byteLength',res.tempFilePath)

      
    })
    console.log('jiesu')
    

  },
  addRecord(){
    var that = this
    that.recorderManager.start(op)
  },
  edit(e){
    var that = this
    var textarea = that.data.textarea
    var value = e.currentTarget.dataset.value
    // console.log(e)
    that.setData({
      textarea:false
    })
  },
  choiced(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var effect_style = that.data.effect_style;
    var font_style = that.data.font_style;
    var size_style = that.data.size_style;
    var color_style = that.data.color_style;
    var picture_style = that.data.picture_style;
    var direction_style = that.data.direction_style;
    var preset_list = that.data.preset_list
    var tab = that.data.tab;
    var barrage_data = that.data.barrage_data;
    var view = e.currentTarget.dataset.view
    var value = that.data.value
    var textarea = that.data.textarea
    var parsent
    var childStyle
    switch(view)
    {
    case '0':
      var value = e.currentTarget.dataset.value
      that.setFontSize(value)
      parsent = preset_list
    // console.log('parsent',parsent,id)
      childStyle = 'color:#f29c9f'
      value = barrage_data.textarea = preset_list[id].txt
      textarea = true
      break;  
    case '1':
      parsent = font_style
    console.log('parsent',parsent)
      childStyle = 'color:#f29c9f'
      barrage_data.font = font_style[id].font
      break;
    case '2':
      parsent = size_style
      childStyle = 'color:#f29c9f'
      barrage_data.size = size_style[id].size
      break;
    case '3':
      parsent = color_style
      childStyle = true
      barrage_data.color = color_style[id].color;

      break;
    case '4':
      parsent = pictrue_style
      childStyle = 'color:#f29c9f'
      barrage_data.picture = color_style[id].picture;
      break;
    // case '5':
    //   parsent = effect_style
    //   childStyle = 'color:#7dbd29'
    //   break;
    // case '6':
    //   parsent = effect_style
    //   childStyle = 'color:#7dbd29'
    //   break;
    case '7':
      parsent = effect_style
      childStyle = 'color:#f29c9f'
      barrage_data.effect = effect_style[id].effect;
      break;
    case '8':
      parsent = direction_style
      childStyle = ''
      barrage_data.direction = direction_style[id].style;
      switch(id)
        {
        case 0:
          direction_style[0].icon = "/images/verticaled.png";
          direction_style[1].icon = "/images/transverse.png";      
          break;
        case 1:
          direction_style[0].icon = "/images/vertical.png";
          direction_style[1].icon = "/images/transversed.png";
          break;
        default:
          console.log('选择屏幕方向出错')
        }
      break;
    default:
      // n 与 case 1 和 case 2 不同时执行的代码
    }
    // for(var i = 0;i<effect_style.length;i++){
    //   effect_style[i].choiced = "";
    // }
    // tab[5].check = true;
    // effect_style[id].choiced = "color:#7dbd29;";
    console.log(view)
    $.saveBarrageData(e,id,tab,parsent,childStyle)
    that.setData({
      font_style:font_style,
      effect_style:effect_style,
      color_style:color_style,
      size_style:size_style,
      picture_style:picture_style,
      direction_style:direction_style,
      tab:tab,
      barrage_data: barrage_data,
      type_image:'',
      value,
      textarea,
    })
  },
  addPicture(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    var picture_style = that.data.picture_style;
    var barrage_data = that.data.barrage_data;
    wx.chooseImage({
      count: 1,
      sizeType:['original'],// 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      
      picture_style[id].picture = tempFilePaths;
      switch(id)
        {
        case 0:
          barrage_data.picture_1 = tempFilePaths;
          break;
        case 1:
          barrage_data.picture_2 = tempFilePaths;
          break;
        default:
          console.log('图片路径出错')
        }

      that.setData({
        picture_style:picture_style
      })
      // wx.previewImage({
      //   current: '', // 当前显示图片的http链接
      //   urls: [tempFilePaths] // 需要预览的图片http链接列表
      // })
  }
    })
  },
  getValue(e){
    var that = this
    var value = e.currentTarget.dataset.value
    var textarea = that.data.textarea
    that.setData({
      value,
    })
    console.log(e)
  },
  preView(e){
    var that = this
    var value = e.detail.value
    that.setFontSize(value)
  },
  setFontSize(_value){
    var that = this
    
    // value = value.replace(/\\n/,'')
    
    var windowWidth = that.data.windowWidth
    var windowHeight = that.data.windowHeight
    var font_size = that.data.font_size
    var textareaWidth = windowWidth*0.52
    var textareaHeight = parseInt(windowHeight*0.05)
    var textarea = that.data.textarea
    var barrage_data = that.data.barrage_data 
    barrage_data.textarea = _value
    if(_value.length<=8){
      font_size = 11.5
    }
    else if(_value.length>8){
      // font_size = parseInt(textareaWidh/value.length*4)
      font_size = Math.floor(textareaWidth/_value.length/2)-1

    }
    // var midIndex = parseInt(value.length/2)
    // var left = value.substr(0,midIndex)
    // var right = value.substr(midIndex)
    // value = left+'\n'+right
    // font_size = Number(font_size)
    console.log('font_size',font_size,barrage_data)
    that.setData({
      textareaWidth,
      textareaHeight,
      font_size,
      value:_value,
      barrage_data,
      textarea:true,
      type_image:'',
    })
  },
  setType(e){
    var that = this
    var type = e.currentTarget.dataset.type
    var type_demo = that.data.type_demo
    var type_list = that.data.type_list
    var showType = that.data.showType
    var type_image = that.data.type_image
    var preset_list = that.data.preset_list
    preset_list = type_demo=[]
    type_demo = type_list[type].json
    type_image = type_list[type].image
    $.each(type_demo,(i,v) => {
      preset_list.push({txt:v.txt,choiced:""})
    })
    preset_list = JSON.stringify(preset_list)
    preset_list = JSON.parse(preset_list)
    console.log('preset_list',preset_list,type,type_demo,type_list)
    that.setData({
      type_demo,
      showType:false,
      type_image,
      preset_list
    })
    console.log(type,type_demo)
  },
  type_choiced(e){
    var that = this
    var index = e.target.dataset.index
    var type_demo = that.data.type_demo
    var value = that.data.value

    // var justMet = that.data.justMet
    // type = justMet
    value = type_demo[index].txt
    that.setFontSize(value)
    that.setData({
      value
    })
    // if(){}
    console.log(e)
  },
  btn_reset(){
    wx.redirectTo({
      url: '/pages/set/set'
    })
  },
  btn_senior(){
    var that = this
    var showTab = that.data.showTab
    that.setData({
      showTab:!showTab
    })
  },
  btn_save(){
    var that = this;
    var tab = that.data.tab;
    var flag = true;
    var barrage_data = that.data.barrage_data;
    var picture_style = that.data.picture_style;
      console.log('barrage_data1',barrage_data.textarea)

    for(var i = 0;i<tab.length;i++){
      if(tab[i].check==false){
        flag = false;
        wx.showModal({
        title: '提示',
        content: '请设置弹幕的'+tab[i].txt,
        success: function(res) {
          if (res.confirm) {

          } else if (res.cancel) {

          }
        }
      })
        break;  //数据传输速度块，弹窗显示最后一个，加上break强制退出循环
      }
      
    }
    if(flag){
      wx.setStorageSync("barrage_data",barrage_data);
      console.log('barrage_data',barrage_data)
      wx.setStorageSync("picture_style",picture_style);

      wx.navigateTo({
        url: '/pages/barrage/barrage'
      })
    }else{

    }  
  },
  
  
  txt_choiced(e){
    var that = this;
    var preset_list = that.data.preset_list;
    var id = e.currentTarget.dataset.id;
    var txt = preset_list[id].txt;
    var tab = that.data.tab;
    var barrage_data = that.data.barrage_data;


    for(var i = 0;i<preset_list.length;i++){
      preset_list[i].choiced = "";
    }
    tab[0].check = true;
    tab[0].choiced = ""; 
    preset_list[id].choiced = "color:#7dbd29;";
    barrage_data.textarea = txt;
    that.setData({
      preset_list:preset_list,
      tab:tab,
      barrage_data:barrage_data
    })
  },
  entry(e){
    var that = this;
    var value = e.detail.value;
    // var after_num = value.length - 4;
    var tab = that.data.tab;
    var preset_list = that.data.preset_list;
    var barrage_data = that.data.barrage_data;
    barrage_data.textarea = "";
    if(value.length>4){
      value = value.replace(/\n/g,"") ;

      var front = value.substr(0, 4);
      var after = value.substr(4,4)
      value = front + '\n' + after;

    }
    

    if(value.length>0){
      tab[0].check = true;
      tab[0].choiced = "border:8rpx solid #7dbd29;";
      for(var i = 0;i<preset_list.length;i++){
      preset_list[i].choiced = "";
      barrage_data.textarea = value;
      }

    }
    else{
      tab[0].choiced = "";
      tab[0].check = false;
    }
    // barrage_data.textarea = value;
    that.setData({
        barrage_data:barrage_data,
        tab:tab,
        preset_list:preset_list
      })
  },
  
  //三目运算控制变量显示不同选项内容
  screentop(e){
    var that = this;

    var _datasetId = e.currentTarget.dataset.id;
    var screenobject={};
    var tab = that.data.tab;
    screenobject.HdIndex = _datasetId;
    screenobject.BdIndex = _datasetId;
    for(var i =0; i<tab.length;i++){
      tab[i].class='tab_choice';
    }
    tab[_datasetId].class='tab_choiced';
    that.setData({
      tab:tab,
      screen:screenobject
    })

  },
  // tab(e){
  //   var that = this;
  //   var id=e.currentTarget.dataset.id;
  //   var tab = that.data.tab;
  //   for(var i =0; i<tab.length;i++){
  //     tab[i].class='tab_choice';
  //   }
  //   tab[id].class='tab_choiced';
  //   that.setData({
  //     tab:tab
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var type_demo = that.data.type_demo
    var type_list = that.data.type_list

    const recorderManager = wx.getRecorderManager()
    that.recorderManager = recorderManager
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    that.backgroundAudioManager = backgroundAudioManager
    recorderManager.onStart((res) => {
      console.log('recorder start')
    })
    recorderManager.onError((res) => {
      console.log('onError start',res)
    })
    

    // recorderManager.start(op)

    // that.setType()
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})