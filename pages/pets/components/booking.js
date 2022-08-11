// pages/pets/components/booking.js
Component({
  /**
   * Component properties
   */
  properties: {
    text: String
  },

  /**
   * Component initial data
   */
  data: {

  },
  attached() {

  },
  /**
   * Component methods
   */
  methods: {
    passData() {
      // only if you need to pass something back to the parent
      console.log("From booking component: passdata is called")
      this.triggerEvent('passdata', {showMal: false})
    },
    bindDateChange(e) {
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
    backToShow(){
    }
  }
})
