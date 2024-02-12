const logger = Logger.getLogger('tobmi')

WatchFace({

  initView() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, {
      x: 0,
      y: 0,
      w: 194,
      h: 368,
      color: "0xFF3439",
      radius: 25,
      show_level: hmUI.show_level.ONLY_NORMAL,
    });
    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 0,
      w: 194,
      h: 20,
      color: "0xFFFFFFFF",
      text: "hello world"
    })

    itemBgImg = hmUI.createWidget(hmUI.widget.IMG, {
      x: 0,
      y: 0,
      w: 194,
      h: 368,
      src: 'images/moon.png',
      show_level: hmUI.show_level.ONLY_NORMAL,
    })
  },

  onInit() {
    logger.log('onInit')
  },
  
  build() {
    logger.log('build')
    this.initView();
  },

  onDestroy() {
    logger.log('onDestroy')
  },
})
