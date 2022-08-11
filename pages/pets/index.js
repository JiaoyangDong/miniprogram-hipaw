// pages/pets/index.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    pets: [],
    sex: '',
    events: [
      {
        name: "Adoption Day",
        description: "Come to the shelter and meet your new best friend. Snacks and drinks provided!",
        date: "August 2nd",
        time: "15:00",
        location: "HiPaw Rescue",
        backgroundurl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      },
      {
        name: "End-of-Summer Party",
        description: "Come along with your fur baby! Good food and great company all in support of HiPaw. If you don't have a pet, there will be some there for you to meet too!",
        date: "August 28th",
        time: "14:00",
        location: "Charlie's on Wuding Lu",
        backgroundurl: "https://images.unsplash.com/photo-1546484488-2a1430996887?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
      }
    ]
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
    // this.resizeAllGridItems();
    // this.addEventListener("resize", resizeAllGridItems);
    // let allItems = document.getElementsByClassName("pet-card");
    // for(x=0;x<allItems.length;x++){
    //   imagesLoaded( allItems[x], resizeInstance);
    // }
    const page = this
    console.log('header', app.globalData.header)
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        console.log(res.data)
        page.setData({
          pets: res.data
        })
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
    console.log('goToPet', e)
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
        url: `/pages/pets/show?id=${e.currentTarget.dataset.id}`,
      })
  },

  // resizeGridItem(item) {
  //   grid = document.getElementsByClassName("cards-box")[0];
  //   rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  //   rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  //   rowSpan = Math.ceil((item.querySelector('.content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
  //     item.style.gridRowEnd = "span "+rowSpan;
  // },
  
  // resizeAllGridItems() {
  //   allItems = document.getElementsByClassName("pet-card");
  //   for(x=0;x<allItems.length;x++){
  //     resizeGridItem(allItems[x]);
  //   }
  // },
  
  // resizeInstance(instance) {
  //   item = instance.elements[0];
  //   resizeGridItem(item);
  // }
})