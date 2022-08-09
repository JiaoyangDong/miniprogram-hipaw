// pages/landing/landing.js
const DEFAULT_PAGE = 0;
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */

  startPageX: 0,
  currentView: DEFAULT_PAGE,
  data: {
    toView: `card_${DEFAULT_PAGE}`,
    // list: ['dog#1', 'dog#2', 'cat#1', 'cat#2', 'bunny']
 
  },

  touchStart(e) {
    this.startPageX = e.changedTouches[0].pageX;
  },

  touchEnd(e) {
    const moveX = e.changedTouches[0].pageX - this.startPageX;
    const maxPage = this.data.list.length - 1;
    if (Math.abs(moveX) >= 150){
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },

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
    wx.request({
      url: 'https://hipaw-api.herokuapp.com/api/v1/pets',
      method: 'GET',
      success(res) {
        console.log({res})
        const pets = res.data
        page.setData({
          pets: pets.slice(0,5)
        })
        console.log(page.data.pets)
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

  // goToPets(e) {
  //   console.log('function goToPets e', e)
  //   const pets = this.data.pets[e.currentTarget.dataset.id]
  //   console.log({pets})

  //   wx.navigateTo({
  //     url: `/pages/pets/index?id=${e.currentTarget.dataset.id}`,
  //   })
  // }
})