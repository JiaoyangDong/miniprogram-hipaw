function fadeXAnimation( _this, param, px, opacity ){
  let animation = wx.createAnimation({
    duration: 800, 
    timingFunction: "ease"
  })
  animation.translateX( px ).opacity( opacity ).step();
  let json = '{"'+ param +'":""}';
  json = JSON.parse( json );
  json[param] = animation.export();
  _this.setData( json );

 }
 module.exports = {
   fadeXAnimation: fadeXAnimation
 }