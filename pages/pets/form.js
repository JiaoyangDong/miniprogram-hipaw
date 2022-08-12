  const app = getApp()
Page({
  data: {
    districts: ['Huangpu', 'Xuhui', 'Changning', 'Jingan', 'Putuo', 'Hongkou', 'Yangpu', 'Baoshan', 'Minhang', 'Jiading', 'Pudong', 'Songjiang', 'Jinshan', 'Qingpu', 'Fengxian', 'Chongming'],
    sexes: ['male', 'female'],
    fur_types: ['long', 'short', 'hairless'],
    speciess: ['dog', 'cat', 'other'],
    district: '',
    sex: '',
    fur_type: '',
    species: '',
    src: [],
    formData: {},
    resetForm: true
  },
  onLoad(options) {
  },
  onReady() {
  },
  onShow: function () {
    console.log("form onshow")
    const page = this
    if (page.data.resetForm) this.resetForm();
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
            speciesIndex: data.speciess.findIndex(el => (el === res.data.species)),
            formData: res.data,
            editedId: id
          })
          wx.removeStorageSync('editedId')
        }

      })
    }
  },
  setInputData(e) {
    console.log(e)
    let { formData } = this.data
    formData[e.currentTarget.dataset.field] = e.detail.value
    this.setData({formData})
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
    } else if (field === 'fur_type') {
      formData.fur_type = this.data.fur_types[e.detail.value]
      this.setData({ formData, furTypeIndex: e.detail.value})
    } else {
      formData.species = this.data.speciess[e.detail.value]
      this.setData({ formData, speciesIndex: e.detail.value})
    }
  },
  listenerBtnChooseImage: function () {
    const page = this
    page.setData({resetForm: false})
    // Upload an image
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log('img successfully uploaded', res)
        page.setData({
          src: res.tempFilePaths
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
    let pet = this.data.formData
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
          page.setData({resetForm: true})
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
            // call the upload
            const id = res.data.pet.id
            page.setData({resetForm: true})
            page.upload(id)
              wx.switchTab({
                url: '/pages/pets/index'
            })
          }
        },
        fail(error) {
          console.log({error})
        }
      })
    }
  },
  upload(id) {
    const page = this
    wx.uploadFile({
      url: `${app.globalData.baseURL}/pets/${id}/upload`,
      filePath: page.data.src[0],
      header: app.globalData.header,
      name: 'image',
      success (res){
        page.setData({resetForm: true})
        console.log(res)
      }
    })
  }
})