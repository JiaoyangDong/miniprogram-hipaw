  const app = getApp()
Page({
  data: {
    districts: ['Huangpu', 'Xuhui', 'Changning', 'Jingan', 'Putuo', 'Hongkou', 'Yangpu', 'Baoshan', 'Minhang', 'Jiading', 'Pudong', 'Songjiang', 'Jinshan', 'Qingpu', 'Fengxian', 'Chongming'],
    sexes: ['male', 'female'],
    fur_types: ['long', 'short', 'hairless'],
    district: '',
    sex: '',
    fur_type: '',
    src: '',
    formData: {},
    
  },
  onLoad(options) {
  },
  onReady() {
  },
  onShow: function () {
    console.log("form onshow")
    const page = this
    this.resetForm()
    const id = wx.getStorageSync('editedId')
    if (id) {
      console.log('id found -> update')
      wx.request({
        header: app.globalData.header,
        url: `${app.globalData.baseURL}/pets/${id}`,
        success(res) {
          let data = page.data
          page.setData({
            districtIndex: data.districts.findIndex(el => (el === res.data.district)),
            sexIndex: data.sexes.findIndex(el => (el === res.data.sex)),
            furTypeIndex: data.fur_types.findIndex(el => (el === res.data.fur_type)),
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
  bindPickerChange: function (e) {
    console.log(e)
    let { formData } = this.data
    const { field } = e.currentTarget.dataset
    if (field == 'district') {
      formData.district = this.data.districts[e.detail.value]
      this.setData({ formData, districtIndex: e.detail.value })
    } else if (field === 'sex') {
      formData.sex = this.data.sexes[e.detail.value]
      this.setData({formData, sexIndex: e.detail.value})
    } else {
      formData.fur_type = this.data.fur_types[e.detail.value]
      this.setData({ formData, furTypeIndex: e.detail.value})
    }
  },
  listenerBtnChooseImage: function () {
    var page = this
    // Upload an image
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        console.log('img successfully uploaded')
        page.setData({
          src: res.tempFilePaths
        })
        // Get image info
        wx.getImageInfo({
          src: res.tempFilePaths[0],
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
            console.log(res.path)
          }
        })
       }
     })
   },
  onHide() {
  },

  onUnload() {
  },

  onPullDownRefresh() {
  },

  onReachBottom() {
  },

  onShareAppMessage() {
  }, 

  save(e) {
    console.log('from save button --->',e)
    const page = this
    let pet = {...e.detail.value, ...this.data.formData}
    console.log(pet)
    this.setData({pet})
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
  },

})