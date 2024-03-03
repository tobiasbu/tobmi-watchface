import { imgArray } from '../../shared/utils'

const attributeNumArr = imgArray("attrib-num/#.png", 0, 10);

export default function watchFace(config) {
  const deviceInfo = hmSetting.getDeviceInfo();

  /** @type {BatterySensor} */
  let batterySensor = null;
  /** @type {Widget} */
  let batteryPctgImg = null;

  /**
   * Create a attribute widget with image and level
   * @param {{ icon: string; type: hmUI.data_type; id: number }} options
   */
  function attribute(options) {
    const yy = 155 + (36 * options.id);
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 8,
      y: yy,
      src: options.icon
    });

    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      type: options.type,
      x: 8 + 44,
      y: yy + 6,
      font_array: attributeNumArr,
      invalid_image: "attrib-num/invalid.png",
      dot_image: "attrib-num/dot.png",
      negative_image: "attrib-num/negative.png",
    });
  }

  WatchFace({
    initView() {
      if (config.device.BRAND !== "xiaomi") {
        hmUI.createWidget(hmUI.widget.IMG, {
          x: 0,
          y: 0,
          src: 'miband7_mask.png'
        })
      }

      batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY)

      //////////////////////////////////////////
      // Battery
      //////////////////////////////////////////

      // Battery Icon
      const batteryIconList = imgArray("battery/icon_##.png", 0, 14);
      hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
        x: 64,
        y: 8,
        image_array: batteryIconList,
        image_length: batteryIconList.length,
        type: hmUI.data_type.BATTERY,
      })

      // Battery text
      hmUI.createWidget(hmUI.widget.TEXT_IMG, {
        x: 88,
        y: 12,
        w: 33,
        h: 15,
        type: hmUI.data_type.BATTERY,
        font_array: imgArray("battery/text_#.png"),
      });

      // Text percentage
      const batChars = String(batterySensor.current).length;
      batteryPctgImg = hmUI.createWidget(hmUI.widget.IMG, {
        x: 88 + (11*batChars) + 1,
        y: 12,
        w: 12,
        h: 15,
        src: "battery/text_percentage.png",
      });

      function updateBattery() {
        if (batterySensor) {
          if (!!batteryPctgImg && batteryPctgImg.setProperty) {
            const batChars = String(batterySensor.current).length;
            batteryPctgImg.setProperty(hmUI.prop.MORE, {
              x: 88 + (11*batChars) + 1,
              y: 12,
            });
          }
        }
      }

      batterySensor.addEventListener(hmSensor.event.CHANGE, updateBattery);

      //////////////////////////////////////////
      // System Icons
      //////////////////////////////////////////

      hmUI.createWidget(hmUI.widget.IMG_STATUS, {
        x: 45.5,
        y: 36,
        type: hmUI.system_status.DISCONNECT,
        src: 'sys-icons/bluetooth.png'
      });


      hmUI.createWidget(hmUI.widget.IMG_STATUS, {
        x: 45.5+28,
        y: 36,
        type: hmUI.system_status.DISTURB,
        src: 'sys-icons/disturb.png'
      });

      hmUI.createWidget(hmUI.widget.IMG_STATUS, {
        x: 45.5+28+28,
        y: 36,
        type: hmUI.system_status.CLOCK,
        src: 'sys-icons/alarm.png'
      });

      hmUI.createWidget(hmUI.widget.IMG_STATUS, {
        x: 45.5+28+28+28,
        y: 36,
        type: hmUI.system_status.LOCK,
        src: 'sys-icons/lock.png'
      });

      //////////////////////////////////////////
      // Week day --- dd/MM
      //////////////////////////////////////////

      const weekDayImgArr = imgArray("weekday/##.png", 1, 8);
      hmUI.createWidget(hmUI.widget.IMG_WEEK, {
        x: 8,
        y: 66,
        week_en: weekDayImgArr,
        week_sc: weekDayImgArr,
        week_tc: weekDayImgArr,
        show_level: hmUI.show_level.ONLY_NORMAL,
      });

      const imgDateArr = imgArray("dd-mm/#.png", 0, 10);
      hmUI.createWidget(hmUI.widget.IMG_DATE, {
        month_startX: deviceInfo.width - 8 - (16*5),
        month_startY: 66,
        month_zero: 1,
        month_align: hmUI.align.RIGHT,
        month_sc_array: imgDateArr,
        month_tc_array: imgDateArr,
        month_en_array: imgDateArr,
        month_unit_en: "dd-mm/sep.png",
        month_unit_sc: "dd-mm/sep.png",
        month_unit_tc: "dd-mm/sep.png",

        day_follow: true,
        day_zero: 1,
        day_sc_array: imgDateArr,
        day_tc_array: imgDateArr,
        day_en_array: imgDateArr,
      });

      //////////////////////////////////////////
      // Time - HH:mm
      //////////////////////////////////////////

      const imgTimeArr = imgArray("hh-mm/#.png", 0, 10);
      hmUI.createWidget(hmUI.widget.IMG_TIME, {
        hour_startX: 8,
        hour_startY: 94,
        hour_array: imgTimeArr,
        hour_unit_en: "hh-mm/sep.png",
        hour_unit_sc: "hh-mm/sep.png",
        hour_unit_tc: "hh-mm/sep.png",
        minute_follow: 1,
        minute_array: imgTimeArr,
      });

      //////////////////////////////////////////
      // Attributes
      //////////////////////////////////////////

      // PAI
      attribute({
        id: 0,
        icon: "icons/pai.png",
        type: hmUI.data_type.PAI_WEEKLY
      });

      // Heart-beat
      attribute({
        id: 1,
        icon: "icons/heart.png",
        type: hmUI.data_type.HEART
      });

      // Heart-beat
      attribute({
        id: 2,
        icon: "icons/calories.png",
        type: hmUI.data_type.CAL
      });

      // Calories
      attribute({
        id: 3,
        icon: "icons/distance.png",
        type: hmUI.data_type.DISTANCE
      });

      // Steps
      attribute({
        id: 4,
        icon: "icons/steps.png",
        type: hmUI.data_type.STEP
      });
    },

    onInit() {
      console.log('onInit')
    },

    build() {
      console.log('build')
      this.initView();
    },

    onDestroy() {
      console.log('onDestroy')
    },
  })
}

