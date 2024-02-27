import '../shared/logger'

const logger = Logger.getLogger('tobmi-color')

App({
  globalData: {},
  onCreate(options) {
    logger.log('app on create invoke')
  },

  onDestroy(options) {
    logger.log('app on destroy invoke')
  }
})
