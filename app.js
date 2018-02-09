App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    var res = wx.getSystemInfoSync()
    this.globalData.windowWidth = res.windowWidth
    this.globalData.windowHeight = res.windowHeight
    console.log(res.windowWidth,res.SDKVersion)
  },
  globalData: {
    userInfo: null,
    appid:76,
    img:'https://www.korjo.cn/xcx/loverBarrage/',
    music:'https://www.korjo.cn/xcx/loverBarrage/music/',
    korjo:'https://www.korjo.cn',
    windowWidth:'',
    windowHeight:'',
    justMet:[
        {txt:'很开心认识你'},
        {txt:'我好像在哪遇见过你'},
        {txt:'可以和你做个朋友吗'},
        {txt:'遇见你是最美丽的意外'},
        {txt:'可以给我你的联系方式吗'},
        {txt:'你长得很像我的一个朋友'},
    ],
    crush:[
        {txt:'世间安得双全法'},
        {txt:'春风十里,不如你'},
        {txt:'能不能再靠近一点点'},
        {txt:'你是我不能说的秘密'},
        {txt:'有你的城市下雨也很美'},
        {txt:'我喜欢你，是我独家的记忆'},
    ],
    sayLove:[
        {txt:'我喜欢你'},
        {txt:'今晚月色很美'},
        {txt:'坐我女朋友好吗'},
        {txt:'让我留在你身边'},
        {txt:'爱上你是我情非得已'},
        {txt:'我想牵你的手一起走下去'},
    ],
    propose:[
        {txt:'嫁给我吧'},
        {txt:'今天嫁给我好吗'},
        {txt:'我陪你看细水长流'},
        {txt:'以我之姓，冠你之名'},
        {txt:'执子之手，与子偕老'},
        {txt:'我会照顾你一辈子'},
    ],
    festival:[
        {txt:'情人节快乐'},
        {txt:'结婚周年快乐'},
        {txt:'爱你就像生命'},
        {txt:'陪伴就是最长情的告白'},
        {txt:'最浪漫的是和你变老'},
        {txt:'睁开眼就是你，真好'},
    ],
    apologize:[
        {txt:'亲爱的，对不起'},
        {txt:'原谅我好吗'},
        {txt:'不是故意惹你生气的'},
        {txt:'为媳妇送上购物车'},
        {txt:'我把私房钱全上交'},
        {txt:'亲爱的，不要不理我'},
    ],

  }
})