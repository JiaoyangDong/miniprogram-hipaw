// pages/pets/show.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log('inside pets/show, options: ', options)
    const id = options.id
    const page = this
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        console.log({res})
  
        page.setData({pet: res.data});
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    // if (app.globalData.header) {
      // proceed to fetch api
      // this.getData()
    // } else {
      // wait until loginFinished, then fetch API
    //   wx.event.on('loginFinished', this, this.getData)
    // }
    
  },

  getData() {
    wx.request({})
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})