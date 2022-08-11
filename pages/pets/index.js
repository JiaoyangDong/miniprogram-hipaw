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
    ],
    items: [
      {
        type: 'filter',
        label: 'Filter',
        value: 'filter',
        checked: true,
        children: [
          {
            type: 'radio',
            label: 'Pet type',
            value: 'pettype',
            children: [
              {
                label: 'All',
                value: 'allpets',
                checked: true, // 默认选中
              },
              {
                label: 'Dogs',
                value: 'dogs',
              },
              {
                label: 'Cats',
                value: 'cats',
              },
              {
                label: 'Other',
                value: 'other',
              },
            ],
          },
          {
            type: 'radio',
            label: 'Sex',
            value: 'sex',
            children: [
              {
                label: 'Any',
                value: 'anysex',
                checked: true, // 默认选中
              },
              {
                label: 'Female',
                value: 'female',
              },
              {
                label: 'Male',
                value: 'male',
              },
            ],
          },
          {
            type: 'checkbox',
            label: 'District',
            value: 'district',
            children: [
              {
                label: 'All',
                value: 'all',
                checked: true, // 默认选中
              },
              {
                label: 'Huangpu',
                value: 'huangpu',
              },
              {
                label: 'Xuhui',
                value: 'xuhui',
              },
              {
                label: 'Changning',
                value: 'changning',
              },
              {
                label: "Jing'an",
                value: 'jingan',
              },
              {
                label: 'Putuo',
                value: 'putuo',
              },
              {
                label: 'Hongkou',
                value: 'hongkou',
              },
              {
                label: 'Yangpu',
                value: 'yangpu',
              },
              {
                label: 'Baoshan',
                value: 'baoshan',
              },
              {
                label: 'Minhang',
                value: 'minhang',
              },
              {
                label: 'Jiading',
                value: 'jiading',
              },
              {
                label: 'Pudong',
                value: 'pudong',
              },
              {
                label: 'Songjiang',
                value: 'songjiang',
              },
              {
                label: 'Jinshan',
                value: 'jinshan',
              },
              {
                label: 'Qingpu',
                value: 'qingpu',
              },
              {
                label: 'Fengxian',
                value: 'fengxian',
              },
              {
                label: 'Chongming',
                value: 'chongming',
              },
            ],
          }
        ],
        groups: ['001', '002', '003'],
      },
    ]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    this.getRepos()
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
    if (app.globalData.header) {
      // proceed to fetch api
      this.getData()
    } else {
      // wait until loginFinished, then fetch API
      wx.event.on('loginFinished', this, this.getData)
    }
  }, 
  getData(){
    // this.resizeAllGridItems();
    // this.addEventListener("resize", resizeAllGridItems);
    // let allItems = document.getElementsByClassName("pet-card");
    // for(x=0;x<allItems.length;x++){
    //   imagesLoaded( allItems[x], resizeInstance);
    // }
    const page = this
    console.log('From index.js onshow: header', app.globalData.header)
    wx.request({
      url: `${app.globalData.baseURL}/pets`,
      method: "GET",
      header: app.globalData.header,
      success(res) {
        console.log("From index.js onshow: res.data",res.data)
        page.setData({
          pets: res.data
        })
      }
    })
  },
    onChange(e) {
    const { checkedItems, items, checkedValues } = e.detail
    const params = {}
    console.log("e!!!!")
    console.log(e)
    // console.log(checkedItems, items, checkedValues)

    checkedItems.forEach((n) => {
      if (n.checked) {
        if (n.value === 'updated') {
          const selected = n.children
            .filter((n) => n.checked)
            .map((n) => n.value)
            .join(' ')
          params.sort = n.value
          params.order = selected
        } else if (n.value === 'stars') {
          params.sort = n.value
          params.order = n.sort === 1 ? 'asc' : 'desc'
        } else if (n.value === 'forks') {
          params.sort = n.value
        } else if (n.value === 'filter') {
          n.children
            .filter((n) => n.selected)
            .forEach((n) => {
              if (n.value === 'language') {
                const selected = n.children
                  .filter((n) => n.checked)
                  .map((n) => n.value)
                  .join(' ')
                params.language = selected
              } else if (n.value === 'query') {
                const selected = n.children
                  .filter((n) => n.checked)
                  .map((n) => n.value)
                  .join(' ')
                params.query = selected
              }
            })
        }
      }
    })

    console.log('params', params)

    this.getRepos(params)
  },
  getRepos(params = {}) {
    console.log("params!!", params)
    const language = params.language || 'javascript'
    const query = params.query || 'react'
    const q = `${query}+language:${language}`
    const data = Object.assign(
      {
        q,
        order: 'desc',
      },
      params
    )

    wx.showLoading()
    wx.request({
      url: `https://api.github.com/search/repositories`,
      data,
      success: (res) => {
        console.log(res)

        wx.hideLoading()

        this.setData({
          repos: res.data.items.map((n) =>
            Object.assign({}, n, {
              date: n.created_at.substr(0, 7),
            })
          ),
        })
      },
    })
  },
  onOpen(e) {
    this.setData({ opened: true })
  },
  onClose(e) {
    this.setData({ opened: false })
  },
  noop() {},

  /**
   * Lifexycle function--Called when page hide
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
    console.log('From index.js - goToPet: e', e)
    const id = e.currentTarget.dataset.id
    console.log("From index.js - goToPet: petid: ",id)
    wx.navigateTo({
        url: `/pages/pets/show?id=${e.currentTarget.dataset.id}`,
      })
  },
  showMenu(e) {
    console.log(e);
  }

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