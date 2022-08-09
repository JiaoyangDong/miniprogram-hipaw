// pages/pets/form.js
  const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    formData: {}
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
    console.log("onshow")
    this.resetForm()
  },

  resetForm() {
    this.setData({formData: {}})
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

  }, 

  save(e) {
    console.log(e)
    const pet = e.detail.value
    console.log(pet)
    const page = this
    
    
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: 'POST',
      header: app.globalData.header,
      data: { pet: pet },
      success(res) {
        console.log('success', res)
        if (res.statusCode === 422) {
          wx.showModal({
            title: 'Error!',
            content: res.data.errors.join(', '),
            showCancel: false,
            confirmText: 'OK'
          })
        } else {
          wx.switchTab({
            url: '/pages/pets/index',
          })
        }
      },
      fail(error) {
        console.log({error})
      }
    })
  }
})