// pages/page/page.js
const $ = require('../../utils/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  img:getApp().globalData.img,
  },
  come(){
    wx.redirectTo({
  url: '/pages/set/set'
})
  },
  goFaq(){
      wx.navigateTo({
        url: '/pages/faq/faq',
      })
    },
  showQrcode(e) {
    const url = 'http://www.korjo.cn/xcx/geographyImg/qrcode.jpg'
    wx.previewImage({
      urls: [url] // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.New)
    if (getApp().globalData.New == -1) {
      $.alter('','当前版本过低，部分功能无法实现，请升级微信.')
    }
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