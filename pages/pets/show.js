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
    let id = options.id
    let page = this
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        console.log({res})
        page.setData({
          pet: res.data});
      }
    })
  },

  edit(e) {
    wx.setStorageSync('editedId', this.data.pet.id)
    console.log(this.data.pet)
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