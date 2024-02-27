/// <reference path="./hmUi.d.ts" />


interface BaseWidgetOptions {
  show_level: hmUI.show_level;
}

interface BaseImageOptions extends BaseWidgetOptions {
  /**
 * The x-axis coordinate of the component.
 */
  x: number;
  /**
   * The y-axis coordinate of the component.
   */
  y: number;
  /**
 * The width of the component. It will be calculated automatically according to the type if not specified.
 */
  w?: number
  /**
   * The height of the component. It will be calculated automatically according to the type if not specified.
   */
  h?: number
}

interface ImageOptions extends BaseImageOptions {
  /**
   * The path of the image. Reference folder-structure structure.
   */
  src: string;
  /**
   * Horizontal offset of the image relative to the widget coordinates.
   */
  pos_x?: number;
  /**
   * Vertical offset of the image relative to the widget coordinates.
   */
  pos_y?: number;
  /**
   * The rotation angle of the picture (the 12-point direction is 0 degrees).
   */
  angle?: number;
  /**
   * The rotation center of the picture along the x-axis.
   */
  center_x?: number;
  /**
   * The rotation center of the picture along the y-axis.
   */
  center_y?: number;
}

interface TextImageOptions extends BaseImageOptions {
  /**
   * Image font array. To be sorted from 0-9.
   */
  font_array: any[] // Replace 'any' with the specific array type that contains font images
  /**
   * The type of data. See the data_type.
   */
  type?: number
  /**
   * It is used to specify the text content to be displayed. The 'type' attribute will be disabled when this field is specified. The content only supports 0-9.
   */
  text?: string
  /**
   * Simplified Chinese Units.
   */
  unit_sc?: string
  /**
   * English Units.
   */
  unit_en?: string
  /**
   * Traditional Chinese Unit.
   */
  unit_tc?: string
  /**
   * Chinese Simplified (English Units).
   */
  imperial_unit_sc?: string
  /**
   * English imperial units.
   */
  imperial_unit_en?: string
  /**
   * Traditional Chinese (English Units).
   */
  imperial_unit_tc?: string
  /**
   * Negative sign picture.
   */
  negative_image?: string
  /**
   * Decimal-point-pictures can be used as separators.
   */
  dont_path?: string
  /**
   * The font of space.
   */
  h_space?: number
  /**
   * Horizontal axis alignment (see ALIGN for values).
   */
  align_h?: hmUI.align // Replace 'ALIGN' with the specific type for horizontal alignment
}

interface ImageLevelOptions extends BaseImageOptions {
  /**
   * Array of images.
   */
  image_array: string[]
  /**
   * Size of the array.
   */
  image_length: number
  /**
   * Picture drawn [0-image_length]
   */
  level?: number
}


interface ImageDateOptions extends BaseWidgetOptions  {
  year_startX: number;
  year_startY: number;
  year_unit_sc: string; // Unit
  year_unit_tc: string;
  year_unit_en: string;
  year_align: hmUI.align;
  year_space: number; // Spacing of text.
  year_zero: number; // Whether to make up zeroes.
  /**
   * xx_follow is whether to follow or not.
   * If month is set to 1, there is no need to specify x y for month.
   * It will follow the month day after the year is drawn.
   */
  year_follow: number; // Whether to follow.
  year_en_array: string[];
  year_sc_array: string[];
  year_tc_array: string[];
  /**
   * This field is invalid for the year and defaults to false.
   * When true, the incoming images are 12 for the month and 31 for the day.
   */
  year_is_character: boolean;

  month_startX: number;
  month_startY: number;
  /** Separator image */
  month_unit_sc: string;
  /** Separator image */
  month_unit_tc: string;
  /** Separator image */
  month_unit_en: string;
  month_align: hmUI.align;
  month_space: number;
  /**
   * Pads the number with zeroes (month_zero > 0)
   */
  month_zero: number;
  month_follow: number;
  month_en_array: string[];
  month_sc_array: string[];
  month_tc_array: string[];
  /**
   * Once xx_is_character is set to true month must upload 12 sheets day upload 31 sheets, otherwise there will be an error.
   */
  month_is_character: boolean;

  day_startX: number;
  day_startY: number;
  day_unit_sc: string;
  day_unit_tc: string;
  day_unit_en: string;
  day_align: hmUI.align;
  day_space: number;
  day_zero: number;
  day_follow: number;
  day_en_array: string[];
  day_sc_array: string[];
  day_tc_array: string[];
  day_is_character: boolean;
}

/**
 * Image week options.
 *
 * Note: w,h cannot be set, use the actual width and height of the image in the weekArray.
 */
interface ImageWeekOptions extends BaseWidgetOptions {
  x: number;
  y: number;
  week_en: string[];
  week_tc: string[];
  week_sc: string[];
}

interface ImageStatusOptions extends BaseWidgetOptions {
  x: number;
  y: number;
  type: hmUI.system_status;
  src: string;
}

interface ImageTimeOptions extends BaseWidgetOptions {
  hour_zero: number; // Whether to make up zero.
  hour_startX: number;
  hour_startY: number;
  hour_array: string[];
  hour_space: number; // The interval between each array.
  // Units
  hour_unit_sc: string;
  hour_unit_tc: string;
  hour_unit_en: string;
  hour_align: hmUI.align;
  minute_array: string[];
  minute_follow: number; // Whether to follow.
  second_follow: number; // Whether to follow.
  // omitted as above
  am_x: number;
  am_y: number;
  am_sc_path: string;
  am_en_path: string;
  // pm as above. Prefix changed from am to pm.
}

interface WidgetSetPropertyParam {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  text?: string;
  color?: number;
  align_h?: hmUI.align;
}

declare class Widget {
  setProperty(propertyId: hmUI.prop, val: WidgetSetPropertyParam): void;
  getProperty(key: hmUI.prop): any;
}

declare namespace hmUI {

  function createWidget(widgetType: widget.IMG, options: ImageOptions): Widget;
  function createWidget(widgetType: widget.TEXT_IMG, options: TextImageOptions): Widget;
  function createWidget(widgetType: widget.IMG_DATE, options: ImageDateOptions): Widget;
  function createWidget(widgetType: widget.IMG_LEVEL, options: ImageLevelOptions): Widget;
  function createWidget(widgetType: widget.IMG_STATUS, options: ImageStatusOptions): Widget;
  function createWidget(widgetType: widget.IMG_TIME, options: ImageTimeOptions): Widget;
  function createWidget(widgetType: widget.IMG_WEEK, options: ImageWeekOptions): Widget;

}
