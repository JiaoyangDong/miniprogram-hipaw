// pages/landing/landing.js
const DEFAULT_PAGE = 0;
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    loadingHidden: false,
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    
    // wx.showLoading({
    //   title: 'page loading..',
    // });
  },
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

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    // wx.showToast({
    //   title: 'page load sucess!',
    //   icon: 'success',
    //   duration: 2000
    // })
    // wx.hideToast();
    this.setData({
      loadingHidden: true,
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    // let page = this
    if (app.globalData.header) {
      // proceed to fetch api
      this.getData()
    } else {
      // wait until loginFinished, then fetch API
      wx.event.on('loginFinished', this, this.getData)
    }
    
  },

  getData() {
    const page = this;
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: 'GET',
      header: app.globalData.header,
      success(res) {
        console.log({res})
        const pets = res.data
        page.setData({
          pets: pets.slice(0,5)
          // pets: pets
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

  },

  goToPet(e) {
    wx.navigateTo({
        url: `/pages/pets/show?id=${e.currentTarget.dataset.id}`,
      })
  }
})