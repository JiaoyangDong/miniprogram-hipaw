// pages/booking/show.js
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
  onLoad(options) {

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
    let page = this
    console.log("From booking/show.js: options", page.options)
    wx.request({
      url: `${app.globalData.baseURL}/bookings/${page.options.id}`,
      method: "GET",
      header: app.globalData.header,
      success(res){
        console.log("From booking/show.js - onload : res",res)
        if (res.statusCode === 200) {
          console.log("From booking/show.js : res.data", res.data)
          page.setData({
            booking: res.data.booking,
            pet: res.data.pet
          })
        // console.log("From booking/show.js - after onload : page.data", page.data)
        } else {
          console.log("From show.js: status code is", res.statusCode)
        }
      }

    })
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