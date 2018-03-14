const $ = require('../../utils/common.js')

Page({
  data:{
    img:getApp().globalData.img,
    windowWidth:getApp().globalData.windowWidth,
    windowHeight:getApp().globalData.windowHeight,
    restoreArray:[],
    back:[],
    back_num:1,
    pen : 3, //画笔粗细默认值.
    color : '#cc0033', //画笔颜色默认值
    box1:{},
    box2:{},
    box3:{},
    box4:{},
    box5:{},
    meauImg:[{img:'url(https://www.korjo.cn/Upload/HSY/Image/20180312045312236.jpg)'},
    ],
    itool:[
            {value:'lineStroke',txt:'笔号',css:'border-radius:50%;',show:true,img:''},
            {value:'lineColor',txt:'颜色',css:'border-radius:50%;',show:true},
            {value:'eraser',txt:'',css:'border-radius:50%;',show:true},
            {value:'withdraw',txt:'',css:'border-radius:50%;',show:true},

    ],
    meau:'',
    IsMeau:false,
    Isrestore:false,
    Color:[   
            {color:'red'},
            {color:'blue'},
            {color:'yellow'},
            {color:'pink'},
            {color:'black'},
    ],
  },
  startX: 0, //保存X坐标轴变量
  startY: 0, //保存X坐标轴变量
  isClear : false, //是否启用橡皮擦标记

  saveCanvas(){
    var that = this
    var canvas = that.data.canvas
    // $.alter('')
    wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        destWidth: that.data.windowWidth*3,
        destHeight: that.data.windowHeight*3,
        canvasId: 'myCanvas',
        success: function(res) {
          wx.downloadFile({
            url: res.tempFilePath, //仅为示例，并非真实的资源
            success: function(res) {
              if (res.statusCode === 200) {
                  $.adminUpload(res.tempFilePath,'image',function(res){
                    that.setData({
                      canvas:getApp().globalData.korjo + res.data
                    })
                      console.log('saveimg',res,that.data.canvas,)
                      $.loading('保存图片中···')
                      wx.navigateTo({
                        url: `/pages/set/set?canvas=${that.data.canvas}`,
                      })
                  })
                  
                  // back.push(res.tempFilePath)
                  // that.setData({
                  //     back,
                  //   })
              }
            }
          })

        } 
      })

  },
  choiceColor(e){
    var that = this
    var index = e.target.dataset.index
    var color = e.target.dataset.color
    this.isClear = false
    that.setData({
      color,
    })
    that.showMeau(index)
  },
  color(e){
    var that = this
    var meau = e.target.dataset.meau
    var color = that.data.color
    // color = 'blue'
    that.showMeau(meau)
    
  },
  slider(e){
    var that = this
    var meau = e.target.dataset.meau
    var pen = that.data.pen
    var value = e.detail.value
    that.showMeau(meau)

    that.setData({
      pen:value
    }) 
  },
  showMeau(index){
    var that = this
    var IsMeau = that.data.IsMeau
    var itool = that.data.itool
    var IsMeau = that.data.IsMeau
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration:1000,
      timingFunction:'ease',
      delay: 0
    })
    that.animation = animation
    if(IsMeau){
      animation.width('100rpx').step()
      $.each(itool,(i,v) => {
        v.show = true
        v.img = ''
        v.css = 'border-radius:50%;'
      }
        )
    }else{
      animation.width('100%').step()
      $.each(itool,(i,v) => {
        v.show = false
        v.css = 'border-radius:0%;'
      })
      // console.log(index)
      itool[index].show = true
      itool[index].css = 'border-radius:0%;'
      itool[index].img = ''
      console.log(itool)
    }
    
    that.setData({
      IsMeau:!IsMeau,
      itool,
    })
    that.setData({
      box1:animation.export(),
    })
  },
  hidden_meau(index){
    var that = this
    var itool = that.data.itool
    var IsMeau = that.data.IsMeau

    if(IsMeau){
      $.each(itool,(i,v) => {
        v.show = false
        }
      )
      itool[index].show = true

    }else{
      $.each(itool,(i,v) => {
        v.show = true
      }
        )
      }
    // itool[index].show = false

    that.setData({
      itool,
    })
  },
  itool(e){
    var that = this
    var meau = e.target.dataset.meau
    console.log(e,meau)
    that.showMeau(meau)
    // that.hidden_meau(meau)
    
  },
  //记录上次图像
  saveLast(e){
      var that = this
    //   var restoreArray = that.data.restoreArray
    //   restoreArray = []
    // //得到触摸点的坐标
      this.startX = e.changedTouches[0].x
      this.startY = e.changedTouches[0].y
      this.context = wx.createContext()
      var back = that.data.back
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        destWidth: that.data.windowWidth*3,
        destHeight: that.data.windowHeight*3,
        canvasId: 'myCanvas',
        success: function(res) {
          wx.downloadFile({
            url: res.tempFilePath, //仅为示例，并非真实的资源
            success: function(res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                  back.push(res.tempFilePath)
                  that.setData({
                      back,
                    })
              }
            }
          })
          // if(!back){
            // wx.saveImageToPhotosAlbum({
            //   filePath:res.tempFilePath,
            //     success(res) {
            //         back.push('img:'+res.tempFilePath)
            //         // back = res.tempFilePath
            //         console.log('1',res,that.data.back)
            //         that.setData({
            //           back,
            //         })
          

            //     }
            // })
          // }else{}
          console.log('2',res.tempFilePath,that.data.back)

        } 
      })
    //   // this.context.save();
    //   wx.canvasGetImageData({
    //   canvasId: 'myCanvas',
    //   x: 0,
    //   y: 0,
    //   width: that.data.windowHeight,
    //   height: that.data.windowHeight,
    //   success(res) {
    //     that.data.back = res.data
    //     // that.setData({
    //     //   restoreArray:res.data
    //     // })
    //     console.log(res,that.data.back) // 100
    //   }
    // })
  },
  restore(array){
    var that = this
    var back = that.data.back
    var back_num = that.data.back_num
    var num = back.length-back_num
    var Isrestore = that.data.Isrestore
      const ctx = wx.createCanvasContext('myCanvas')
      console.log('num',num)

    if(!Isrestore){
      ctx.drawImage(back[num],0, 0, that.data.windowWidth, that.data.windowHeight)
      ctx.draw()
      back_num++
      Isrestore = false
    }else{
      back_num = 1
      ctx.drawImage(back[back.length-back_num],0, 0, that.data.windowWidth, that.data.windowHeight)
      ctx.draw()
      Isrestore = true

    }
    that.setData({
      back_num,
      Isrestore,
    })
    console.log('restore',that.data.back[num])
    // const ctx = wx.createCanvasContext('myCanvas')
  //   wx.chooseImage({
  // success: function(res){
  //   console.log(res)
  //   ctx.drawImage(that.data.back[3], 0, 0, that.data.windowWidth, tthat.data.windowWidth)
  //   ctx.draw()
  // }
  // })

    // const data = new Uint8ClampedArray([255, 0, 0, 1])
    // let rgbaData = [];
    // for (let i = 0; i < 255; i++) {
    //   rgbaData.push(i, 0, 0, 255);
    //   rgbaData.push(i, 0, 0, 255);
    //   rgbaData.push(i, 0, 0, 255);
    //   rgbaData.push(i, 0, 0, 255);
    //   rgbaData.push(i, 0, 0, 255);
    // }
    // var buffer = new ArrayBuffer(255 * 4 * 10);
    // const imageData = new Uint8ClampedArray(buffer);
    // for (let i in rgbaData) {
    //   imageData[i] = rgbaData[i];
    // }
    // console.log(imageData,that.data.windowWidth,that.data.windowHeight);
    // wx.canvasPutImageData({
    //   canvasId: 'myCanvas',
    //   x: 0,
    //   y: 0,
    //   width: 10,
    //   height: 255,
    //   data: that.data.back,
    //   success(res) {
    //     console.log(res,that.data.back)
    //     // wx.canvasGetImageData({
    //     //   canvasId: 'myCanvas',
    //     //   x: 0,
    //     //   y: 0,
    //     //   width: 5,
    //     //   height: 255,
    //     //   success(res) {
    //     //     console.log(res.data.join());
    //     //   }
    //     // })
    //   },
    //   fail(res) {
    //     console.log(res);
    //   }
    // })  
  },
  //手指触摸动作开始
  touchStart: function (e) {
      this.saveLast(e)

      if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画
         this.context.setStrokeStyle('#F8F8F8') //设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
         this.context.setLineCap('round') //设置线条端点的样式
         this.context.setLineJoin('round') //设置两线相交处的样式
         this.context.setLineWidth(20) //设置线条宽度
         this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
         this.context.beginPath() //开始一个路径 
         this.context.arc(this.startX,this.startY,5,0,2*Math.PI,true);  //添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
         this.context.fill();  //对当前路径进行填充
         this.context.restore();  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
      }else{
         this.context.setStrokeStyle(this.data.color)
         this.context.setLineWidth(this.data.pen)
         this.context.setLineCap('round') // 让线条圆润 
         this.context.beginPath()
        
      }
  },
  //手指触摸后移动
  touchMove: function (e) {
      
      var startX1 = e.changedTouches[0].x
      var startY1 = e.changedTouches[0].y

      if(this.isClear){ //判断是否启用的橡皮擦功能  ture表示清除  false表示画画

        this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
        this.context.moveTo(this.startX,this.startY);  //把路径移动到画布中的指定点，但不创建线条
        this.context.lineTo(startX1,startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
        this.context.stroke();  //对当前路径进行描边
        this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息
          
        this.startX = startX1;
        this.startY = startY1;
       
      }else{
        this.context.moveTo(this.startX, this.startY)
        this.context.lineTo(startX1, startY1)
        this.context.stroke()

        this.startX = startX1;
        this.startY = startY1;
        
      }
      // console.log(this.startX,this.startY)
      // var a = this.context.clearActions()
      // var b = this.context.getActions()
      // console.log(a,b)
      // this.back.push('{'+this.startX+','+this.startY+'}')
      //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
      wx.drawCanvas({
         canvasId: 'myCanvas',
         reserve: true,
         actions: this.context.getActions() // 获取绘图动作数组
      })
  },
  //手指触摸动作结束
  touchEnd: function () {
      
  },
  //启动橡皮擦方法
  clearCanvas: function(){
      // if(this.isClear){
      //   this.isClear = false;
      // }else{
      //   this.isClear = true;
      // }
      this.isClear = true
      // this.context.clearActions() 
      console.log(this.isClear)
  },
  penSelect: function(e){ //更改画笔大小的方法
    console.log(e.currentTarget);
    this.setData({pen:parseInt(e.currentTarget.dataset.param)});
    this.isClear = false;
  },
  colorSelect: function(e){ //更改画笔颜色的方法
    console.log(e.currentTarget);
    this.setData({color:e.currentTarget.dataset.param});
    this.isClear = false;
  },
  Upload(options){
    if(wx.showLoading || wx.showToast){
       $.hideLoading()
    }
  }
})