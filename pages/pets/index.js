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
        type: 'radio',
        label: 'All pets',
        value: 'updated',
        checked: true,
        children: [
          {
            label: 'All pets',
            value: 'desc',
            checked: false, // 默认选中
          },
          {
            label: 'Dogs',
            value: 'idk',
          },
          {
            label: 'Cats',
            value: 'idk2',
          },
          {
            label: 'Other',
            value: 'idk3',
          },
        ],
        groups: ['001'],
      },
      {
        type: 'checkbox',
        label: 'Location',
        value: 'updated',
        checked: false,
        children: [
          {
            label: 'The whole city',
            value: 'wholecity',
            checked: false, // 默认选中
          },
          {
            label: 'Dogs',
            value: 'asc',
          },
          {
            label: 'Cats',
            value: 'asc',
          },
          {
            label: 'Other',
            value: 'asc',
          },
        ],
        groups: ['002'],
      },
      {
        type: 'sort',
        label: 'Stars',
        value: 'stars',
        groups: ['003'],
      },
      {
        type: 'filter',
        label: 'Location',
        value: 'filter',
        checked: true,
        children: [
          {
            type: 'checkbox',
            label: 'District',
            value: 'district',
            children: [
              {
                label: 'Angular',
                value: 'angular',
              },
              {
                label: 'Vue',
                value: 'vue',
              },
              {
                label: 'React',
                value: 'react',
                checked: true, // 默认选中
              },
              {
                label: 'Avalon',
                value: 'avalon',
              },
            ],
          },
          {
            type: 'checkbox',
            label: '配送方式',
            value: 'away',
            children: [
              {
                label: '京东配送',
                value: '1',
              },
              {
                label: '货到付款',
                value: '2',
              },
              {
                label: '仅看有货',
                value: '3',
              },
              {
                label: '促销',
                value: '4',
              },
              {
                label: '全球购',
                value: '5',
              },
              {
                label: 'PLUS专享价',
                value: '6',
              },
              {
                label: '新品',
                value: '7',
              },
              {
                label: '配送全球',
                value: '8',
              },
            ],
          },
          {
            type: 'radio',
            label: '性别',
            value: 'gander',
            children: [
              {
                label: '男',
                value: '0',
              },
              {
                label: '女',
                value: '1',
              },
              {
                label: '通用',
                value: '2',
              },
            ],
          },
          {
            type: 'checkbox',
            label: '闭合方式',
            value: 'closed_mode',
            children: [
              {
                label: '卡扣',
                value: '0',
              },
              {
                label: '拉链',
                value: '1',
              },
              {
                label: '其他',
                value: '2',
              },
            ],
          },
          {
            type: 'checkbox',
            label: '轮子种类',
            value: 'wheel_type',
            children: [
              {
                label: '万向轮',
                value: '0',
              },
              {
                label: '单向轮',
                value: '1',
              },
              {
                label: '飞机轮',
                value: '2',
              },
              {
                label: '其他',
                value: '3',
              },
            ],
          },
          {
            type: 'checkbox',
            label: '箱包硬度',
            value: 'wheel_type',
            children: [
              {
                label: '硬箱',
                value: '0',
              },
              {
                label: '软硬结合',
                value: '1',
              },
              {
                label: '软箱',
                value: '2',
              },
              {
                label: '其他',
                value: '3',
              },
            ],
          },
          {
            type: 'checkbox',
            label: '适用场景',
            value: 'wheel_type',
            children: [
              {
                label: '旅行',
                value: '0',
              },
              {
                label: '婚庆',
                value: '1',
              },
              {
                label: '出差',
                value: '2',
              },
              {
                label: '其他',
                value: '3',
              },
            ],
          },
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
  onShow(e) {
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
    onChange(e) {
    const { checkedItems, items, checkedValues } = e.detail
    const params = {}

    console.log(checkedItems, items, checkedValues)

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
    console.log('goToPet', e)
    const id = e.currentTarget.dataset.id
    console.log(id)
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