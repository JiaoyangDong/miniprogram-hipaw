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
  onLoad(options) {
    console.log("show onLoad", options)
    const id = options.id
    const page = this
    wx.request({
      url: `${app.globalData.baseURL}/${id}`,
      success(res) {
        console.log({res})
        page.setData({
          pet: res.data
        })
      }
    })
  },
  // edit(e) {
  //   wx.setStorageSync('editedId', this.data.pet.id)
  //   wx.switchTab({
  //     url: `/pages/pets/form`,
  //   })
  // },

  // delete(e) {
  //   const id = this.data.pet.id
  //   wx.showModal({
  //     title: 'Are you sure?',
  //     content: "Delete this pet?",
  //     success(res) {
  //       if (res.confirm) {
  //         wx.request({
  //           url: `${app.globalData.baseURL}/${id}`,
  //           method: 'DELETE',
  //           success(res) {
  //             wx.switchTab({
  //               url: '/pages/pets/index',
  //             })
  //           }
  //         })
          
  //       } else {
  //         // do nothing
  //       }
  //     }
  //   })
  // },

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