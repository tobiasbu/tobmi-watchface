
class BaseSensor {
  readonly name: string;
  addEventListener(type: hmSensor.event, callback: (event: hmSensor.event) => void): void;
  removeEventListener(type: hmSensor.event, callback: (event: hmSensor.event) => void): void;
  start(): void;
  stop(): void;
}

/**
 * Battery sensor
 * @see https://docs.zepp.com/docs/watchface/api/hmSensor/sensorId/BATTERY/
 */
interface BatterySensor extends BaseSensor {
  /**
   * Current power (0% - 100%)
   */
  current: number;
}

/**
 * Time sensor
 * @see https://docs.zepp.com/docs/watchface/api/hmSensor/sensorId/TIME/
 */
interface TimeSensor extends BaseSensor {
  /**
   * Timestamp, milliseconds from January 1, 1970 to present.
   */
  utc:	number;
  year: number;
  month:number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  /**
   * 1 - 7
   */
  week: number;
  /**
   * Traditional Chinese Calendar Year.
   */
  lunar_year: number;
  /**
   * Traditional Chinese Calendar Month.
   */
  lunar_month: number;
  /**
   * Traditional Chinese Calendar Day.
   */
  lunar_day: number;
  /**
   * Traditional Chinese Festival.
   */
  lunar_festival: string;
  /**
   * Traditional Chinese Solar Terms.
   */
  lunar_solar_term: string;
  /**
   * Gregorian Holidays.
   */
  solar_festival: string;
}


declare namespace hmSensor {

  enum id {
    TIME,
    BATTERY,
    STEP,
    CALORIE,
    HEART,
    PAI,
    DISTANCE,
    STAND,
    WEATHER,
    FAT_BURRING,
    SPO2,
    BODY_TEMP,
    STRESS,
    VIBRATE,
    WEAR,
    WORLD_CLOCK,
    SLEEP,
    MUSIC,

    /* --- Undocumented --- */
    ACTIVITY,
    SUN,
    WIND,
    PRESSURE,
  }

  enum event {
    UPDATE,
    CHANGE,
  }

  function createSensor(id: id.BATTERY): BatterySensor;
  function createSensor(id: id.TIME): TimeSensor;
}
