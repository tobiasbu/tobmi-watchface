
const WEEK_DAY = {
  1: "MON",
  2: "TUE",
  3: "WED",
  4: "THU",
  5: "FRI",
  6: "SAT",
  7: "SUN"
};

/**
*
* @param {WatchFaceConfig} config
*/
export default function watchFace(config) {

  const deviceInfo = hmSetting.getDeviceInfo()
  config.device.WIDTH = deviceInfo.width;
  config.device.HEIGHT = deviceInfo.height;
  config.device.SHAPE = deviceInfo.screenShape;

  const logger = Logger.getLogger('tobmi')

  const DEBUG = false;
  const DEBUG_BORDERS = true;

  /** @type {HmTimeSensor} */
  let timeSensor;

  function createWidget(type, options) {
    if (DEBUG) {
      hmUI.createWidget(hmUI.widget.FILL_RECT, {
        x: options.x,
        y: options.y,
        w: options.w,
        h: options.h,
        color: options.debug_color,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });
    }

    return hmUI.createWidget(type, options);
  }

  WatchFace({

    debug() {
      if (config.device.RADIUS > 0) {
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: config.device.WIDTH,
          h: config.device.RADIUS,
          color: "0xFFCC00",
          show_level: hmUI.show_level.ONLY_NORMAL,
        });

        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: config.device.HEIGHT - config.device.RADIUS,
          w: config.device.WIDTH,
          h: config.device.RADIUS,
          color: "0xFFCC00",
          show_level: hmUI.show_level.ONLY_NORMAL,
        });
      }
    },

    initView() {
      if (DEBUG) {
        this.debug();
      }

      //////////////////////////////////////////
      // SENSORS
      //////////////////////////////////////////

      if (!timeSensor) {
        timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      }

      //////////////////////////////////////////
      // WIDGETS
      //////////////////////////////////////////

      const halfWidth = Math.round(config.device.WIDTH * 0.5);

      // Create WEEK DAY
      const weekDay = createWidget(hmUI.widget.TEXT, {
        x: 2,
        y: config.device.RADIUS,
        w: halfWidth,
        h: 28,
        align_v: hmUI.align.BOTTOM,
        text_size: 24,
        color: "0xAAAAAA",
        debug_color: "0x1a59bd",
        text: "[WEEK_DAY]",
        show_level: hmUI.show_level.ONLY_NORMAL,
      });

      weekDay.setProperty(hmUI.prop.MORE, {
        text: WEEK_DAY[timeSensor.week]
      });

      // Create DD/MM
      const dayMonth = createWidget(hmUI.widget.TEXT, {
        x: config.device.WIDTH - halfWidth - 2,
        y: config.device.RADIUS,
        w: halfWidth,
        h: 28,
        align_h: hmUI.align.RIGHT,
        align_v: hmUI.align.BOTTOM,
        text_size: 24,
        color: "0xAAAAAA",
        debug_color: "0x179c88",
        text: "DD/MM",
        show_level: hmUI.show_level.ONLY_NORMAL,
      })

      dayMonth.setProperty(hmUI.prop.MORE, {
        text: `${String(timeSensor.day).padStart(2, "0")}/${String(timeSensor.month).padStart(2, "0")}`
      });

      // Create HH:MM widget
      const digitalTime = createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: config.device.RADIUS + 15,
        w: config.device.WIDTH,
        h: 70,
        align_h: hmUI.align.CENTER_H,
        align_v: hmUI.align.CENTER_V,
        text_size: 77,
        color: "0xFFFFFFFF",
        debug_color: "0x4d2a1a",
        text: "HH:MM",
        show_level: hmUI.show_level.ONLY_NORMAL,
      })

      digitalTime.setProperty(hmUI.prop.MORE, {
        text: `${String(timeSensor.hour).padStart(2, "0")}:${String(
            timeSensor.minute
        ).padStart(2, "0")}`,
      });


      //////////////////////////////////////////
      // Debug borders
      //////////////////////////////////////////
      if (DEBUG_BORDERS) {
        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: 0,
          y: 0,
          w: 2,
          h: config.device.HEIGHT,
          color: "0xFF0000",
          show_level: hmUI.show_level.ONLY_NORMAL,
        });

        hmUI.createWidget(hmUI.widget.FILL_RECT, {
          x: config.device.WIDTH-2,
          y: 0,
          w: 2,
          h: config.device.HEIGHT,
          color: "0xFF0000",
          show_level: hmUI.show_level.ONLY_NORMAL,
        });
      }
    },

    onInit() {
      logger.log('onInit')
    },

    build() {
      logger.log('build')
      //this.initView();

      hmUI.createWidget(hmUI.widget.IMG, {
        x: 0,
        y: 0,
        src: 'preview.png'
      })
    },

    onDestroy() {
      logger.log('onDestroy')
    },
  })

}
