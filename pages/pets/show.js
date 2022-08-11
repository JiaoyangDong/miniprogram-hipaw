// pages/pets/show.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    date: "",
    showBookingModal: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log('From show.jz - onload: options ', options)
    let id = options.id
    let page = this
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        console.log("From show.js - onload: res",res)
        if (res.statusCode === 200) {
          const pet = res.data;
          const date = new Date()
          page.setData({
            pet: pet,
            date: date.toISOString().split('T')[0]
          });
          console.log("test date: ", this.date)
        } else {
          console.log("From show.js: status code is", res.statusCode)
        }
      }
    })
  },

  showBookingWindow(e) {
    console.log("From show.js - booking: e ", e)
    this.setData({
      showBookingModal: true
    })

  },
  removeBookingWindow(){
    console.log("From show.js: removeBookingWindow")
    this.setData({
      showBookingModal: false
    })
  },

  edit(e) {
    wx.switchTab({
      header: app.globalData.header,
      url: `/pages/pets/form`,
    })
  },

  delete(e) {
    let id = this.data.pet.id
    wx.showModal({
      title: 'Are you sure?',
      content: 'Delete this pet???',
      success(res) {
        if (res.confirm) {
          wx.request({
            header: app.globalData.header,
            url: `http://localhost:3000/api/v1/pets/${id}`,
            method: 'DELETE',
            success(res){
              wx.switchTab({
                url: '/pages/pets/index',
              })
            }
          })

        } else {
        }
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