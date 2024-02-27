
declare namespace hmUI {
  /**
   * System status options.
   */
  enum system_status {
    /**
     * Bluetooth Disconnect.
     */
    DISCONNECT = 0,

    /**
     * Do not disturb.
     */
    DISTURB = 1,
    /**
     * Lock screen on.
     */
    LOCK = 2,

    /**
     * Alarm clock on.
     */
    CLOCK = 3,
  }

   /**
    * Wideget type enum
    */
   enum widget {
    /**
     * The image widget is used to display images and supports image rotation.
     */
    IMG = 1,
    GROUP = 65536,
    TEXT = 2,
    ARC = 3,
    FILL_RECT = 4,
    STROKE_RECT = 5,
    /**
     * Support displaying text as images, you need to pass in the image font array font_array.
     */
    TEXT_IMG = 6,
    /**
     * Arc progress widget draws arc progress, supports start angle, line width, end angle, color, progress scale.
     */
    ARC_PROGRESS = 7,
    LINE_PROGRESS = 8,
    /**
     * Display the images sequentially according to the given order.
     */
    IMG_PROGRESS = 9,
    /**
     * Given an array of pictures, display the corresponding pictures according to the progress (the level property).
     */
    IMG_LEVEL = 10,
    /**
     * Pointer component based on IMG image component.
     */
    IMG_POINTER = 11,
    /**
     * year_is_character year set this field is invalid.
     * xx_follow is whether to follow or not. If month is set to 1, there is no need to specify x y for month. It will follow the month day after the year is drawn.
     * Once xx_is_character is set to true month must upload 12 sheets day upload 31 sheets, otherwise there will be an error.
     */
    IMG_DATE = 13,
    IMG_WEEK = 14,
    IMG_TIME = 12,
    /**
     * Play the pre-given image at the set frame rate to create an animation effect.
     */
    IMG_ANIM = 15,
    IMG_STATUS = 16,
    IMG_CLICK = 17,
    TEXT_TIME = 18,
    TIME_NUM = 19,
    CYCLE_LIST = 20,
    CIRCLE = 21,
    STATE_BUTTON = 22,
    RADIO_GROUP = 65537,
    CHECKBOX_GROUP = 65538,
    BUTTON = 23,
    SLIDE_SWITCH = 24,
    DIALOG = 25,
    SCROLL_LIST = 26,
    CYCLE_IMAGE_TEXT_LIST = 27,
    TIME_POINTER = 28,
    WATCHFACE_EDIT_MASK = 29,
    WATCHFACE_EDIT_FG_MASK = 30,
    WATCHFACE_EDIT_GROUP = 65539,
    /**
     * Editable backgrounds
     * When editable background + editable widget, widget omits 100%mask
     * If only editable background, just remove the top two layers
     * Just write your own ids and don't repeat them.
     */
    WATCHFACE_EDIT_BG = 31,
    HISTOGRAM = 32,
    DATE_POINTER = 33,
    TEXT_FONT = 34,
    WIDGET_DELEGATE = 35,
    GRADKIENT_POLYLINE = 36,
    PICK_TIME = 512,
    PICK_DATE = 513,
    /**
     * Editable pointers
     * 100% Cover cannot be omitted if there is no editable background.
     * ID Do not repeat.
     *
     * pointerEdit.getProperty(hmUI.prop.CURRENT_CONFIG,true) //The second parameter is whether to export the second hand property.
     *
     * This function returns the configuration of the user-selected pointer style attribute and assigns it directly to TIME_POINTER.
     */
    WATCHFACE_EDIT_POINTER = 65540,
    ARC_PROGRESS_FILL = 37,
    QRCODE = 38,
    BARCODE = 39
  }

  /**
   *
   */
  enum show_level {
    ONLY_NORMAL = 1,
    ONAL_AOD = 2,
    ONLY_AOD = 2,
    ONLY_EDIT = 4,
    ALL = 7,
  }

  /**
   *
   */
  enum data_type {
    /**
     * Electricity
     */
    BATTERY = 0,
    /**
     * Current Step Count
     */
    STEP = 1,
    /**
     * Target number of steps
     */
    STEP_TARGET = 2,
    /**
     * Current Calories
     */
    CAL = 3,
    /**
     * Target Calories
     */
    CAL_TARGET = 4,
    /**
     * Current heart rate
     */
    HEART = 5,
    /**
     * Today PAI
     */
    PAI_DAILY = 6,
    /**
     * Total PAI
     */
    PAI_WEEKLY = 7,
    /**
     * Distance
     */
    DISTANCE = 8,
    /**
     * Current stand
     */
    STAND = 9,
    /**
     * Target stand
     */
    STAND_TARGET = 10,
    /**
     * Current temperature
     */
    WEATHER_CURRENT = 11,
    /**
     * Current low temperature
     */
    WEATHER_LOW = 12,
    /**
     * Current high temperature
     */
    WEATHER_HIGH = 13,
    /**
     * Ultraviolet light
     */
    UVI = 14,
    /**
     * Air Quality
     */
    AQI = 15,
    /**
     * Humidity
     */
    HUMIDITY = 16,
    /**
     * Current Activities
     */
    ACTIVITY = 17,
    /**
     * Target Activities
     */
    ACTIVITY_TARGET = 18,
    /**
     * Fat Burning
     */
    FAT_BURNING = 19,
    /**
     * Fat Burning Goals
     */
    FAT_BURNING_TARGET = 20,
    /**
     * Sunrise and sunset will be displayed according to the time
     */
    SUN_CURRENT = 21,
    /**
     * Sunrise
     */
    SUN_RISE = 22,
    /**
     * Sunset
     */
    SUN_SET = 23,
    /**
     * Wind Power
     */
    WIND = 24,
    /**
     * Pressure
     */
    STRESS = 25,
    /**
     * Blood oxygen
     */
    SPO2 = 26,
    /**
     * Pneumatic pressure
     */
    ALTIMETER = 27,
    /**
     * Moon phase. Only progress is supported
     */
    MOON = 28,
    /**
     * Climbing a building
     */
    FLOOR = 29,
    /**
     * Alarm Clock
     */
    ALARM_CLOCK = 30,
    /**
     * Countdown
     */
    COUNT_DOWN = 31,
    /**
     * Stopwatch
     */
    STOP_WATCH = 32,
    /**
     * Sleep
     */
    SLEEP = 33
  }

  /**
   * Align options
   */
  enum align {
    /**
     * Horizontal axis - left aligned.
     */
    LEFT = 1,
    /**
     * Horizontal axis - right aligned.
     */
    RIGHT = 2,
    /**
     * Horizontal axis - centered.
     */
    CENTER_H = 16,
    /**
     * Vertical axis - topmost
     */
    TOP = 4,
    /**
     * Vertical Axis - Bottom
     */
    BOTTOM = 8,
    /**
     * Vertical axis - centered
     */
    CENTER_V = 32
  }

  /**
   * Animation status options.
   */
  enum anim_status {
    /**
     * Start animation only pause and stop are allowed to be called after starting the animation.
     */
    START = 0,
    /**
     * Pause animation can only be called after starting the animation and resuming it.
     */
    PAUSE = 1,
    /**
     * Resume animation can only be called after pausing the animation.
     */
    RESUME = 2,
    /**
     * Stop animation can only be called after starting the animation and resuming it.
     */
    STOP = 3,
  }

  /**
   *
   */
  enum prop {
    X = 1,
    Y = 2,
    W = 3,
    H = 4,
    POS_X = 5,
    POS_Y = 6,
    ANGLE = 7,
    CENTER_X = 8,
    CENTER_Y = 9,
    SRC = 10,
    TEXT = 11,
    COLOR = 12,
    START_ANGLE = 13,
    END_ANGLE = 14,
    LINE_WIDTH = 15,
    LINE_START_X = 16,
    LINE_START_Y = 17,
    LINE_END_X = 18,
    LINE_END_Y = 19,
    LINE_PROGRESS = 20,
    SRC_BG = 21,
    SRC_PROGRESS = 22,
    SRC_INDICATOR = 23,
    ALIGN_H = 24,
    ALIGN_V = 25,
    IMAGE_ARRAY = 26,
    IMAGE_LENGTH = 27,
    LEVEL = 28,
    TYPE = 29,
    TEXT_SIZE = 30,
    FONT = 31,
    ID = 32,
    DATASET = 33,
    ANIM_STATUS = 34,
    ANIM_IS_RUNNING = 35,
    ANIM_IS_PAUSE = 36,
    ANIM_IS_STOP = 37,
    ANIM = 38,
    RADIUS = 39,
    ALPHA = 40,
    VISIBLE = 41,
    INIT = 42,
    CHECKED = 43,
    SHOW = 44,
    UNCHECKED = 45,
    CURRENT_SELECT = 46,
    TEXT_STYLE = 47,
    CHAR_SPACE = 48,
    LINE_SPACE = 49,
    END_X = 50,
    CURRENT_TYPE = 51,
    UPDATE_DATA = 52,
    SELECT_INDEX = 53,
    CURRENT_CONFIG = 54,
    ITEM_MORE = 55,
    ITEM_REFRESH = 56,
    LIST_TOP = 57
  }
}
