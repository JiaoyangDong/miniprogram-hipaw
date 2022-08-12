// pages/pets/show.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    date: "",
    time: "",
    showBookingModal: false,
    booking: {},
    // isAdopter: false,
    // isCreater: false,
    // isBooker: false
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  },

  onShow(){
    let page = this
    console.log('From show.js - onshow: options ', this.options)
    let id = this.options.id
    wx.request({
      header: app.globalData.header,
      url: `${app.globalData.baseURL}/pets/${id}`,
      success(res) {
        console.log("From show.js - onshow: res",res)
        if (res.statusCode === 200) {
          console.log("From show.js - onshow: booking", res.data.my_booking);
          // console.log("From show.js - onshow: booking's user_id",res.data.my_booking.user_id);
          console.log("From show.js - onshow: pet's user_id", res.data.pet.user_id)
         
          const pet = res.data.pet;
          console.log("From show.js - onshow: create date", pet.created_at)
          const booking = res.data.my_booking;
          
          const date = new Date()
          page.setData({
            pet: pet,
            isCreater: app.globalData.user.id === pet.user_id,
            // isAdopter: app.globalData.user.id !== pet.user_id,
            isBooker: booking, 
            booking: booking,
            date: date.toISOString().split('T')[0],
            time: `${date.getHours()}:${date.getMinutes()}`
          });
          // console.log("From show.js - onshow: meeting date", res.data.my_booking.date_and_time)
          console.log("From show.js - after onload: page.data ", page.data)
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
  submitBooking(e){
    console.log("From show.js - submitBooking: e", e)
    // console.log(this.data.date)
    // console.log(this.data.time)
    const dateAndTime = Date(`${this.data.date} ${this.data.time}`)
    // console.log(dateAndTime)
    let page = this
    wx.request({
      url: `${app.globalData.baseURL}/pets/${this.data.pet.id}/bookings`,
      header: app.globalData.header,
      method: "POST",
      data: {
        date_and_time: dateAndTime
      },
      success(res){
        console.log("From show.js - submit booking: res",res)
        if (res.statusCode === 201) {
          console.log("From show.js - booking submit successfully!")
          console.log("From show.js : res.data", res.data)
          const booking = res.data.booking;
          // wx.navigateTo({
          //   url: `/pages/booking/show?id=${booking.id}`,
          // })
          console.log(page)
          // page.onLoad()
          wx.redirectTo({
            url: `/pages/pets/show?id=${page.options.id}`,
          })
          // console.log("test date: ", page.data.date)
        } else {
          console.log("From show.js: status code is", res.statusCode)
          console.log("From show.js: error message", res.data.errors)
          // const bookingId = res.data.booking.id
          wx.showModal({
            title: 'Error!',
            content: res.data.errors.join(', '),
            cancelText: "OK",
            confirmText: 'Details',
            success(res) {
              console.log(res)
              if (res.confirm) {
                wx.redirectTo({
                  url: `../booking/show?id=${bookingId}`,
                })
              }
            }
          })
        }
      }
    })
  },

  bindDateChange(e) {
    console.log('From show.js - bindDateChange: e', e)
    console.log('From show.js - bindDateChange: picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
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
      content: 'Are you sure to delete this pet?',
      success(res) {
        if (res.confirm) {
          wx.request({
            header: app.globalData.header,
            url: `${app.globalData.baseURL}/pets/${id}`,
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
  // onShow() {

  // },

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

  },

  startEdit: function(){

  }
})