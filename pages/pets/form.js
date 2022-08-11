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
  onShow: function () {
    console.log("form onshow")
    this.resetForm()
    let page = this
    let id = wx.getStorageSync('editedId')
    if (id) {
      console.log('id found -> update')
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${id}`,
        success(res) {
          page.setData({
            formData: res.data,
            editedId: id
          })
          wx.removeStorageSync('editedId')
        }
      })
    }
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
    // const pets = wx.getStorageSync('pets')
    const page = this
    
    if (this.data.editedId !== undefined && this.data.editedId !== null) {
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${page.data.editedId}`,
        method: 'PUT',
        data: {pet: pet},
        success(res) {
          console.log('update success?', res)
          wx.switchTab({
            url: '/pages/pets/index',
          })
        }
      })
    } else {

      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets`,
        method: 'POST',
        data: { pet: pet },
        success(res) {
          console.log('update success?', res)
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
  }
})