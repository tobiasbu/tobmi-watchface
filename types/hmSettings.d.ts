
interface DeviceInfo {
  width: number
  height: number
  screenShape: number
  deviceName: string
  keyNumber: number
  deviceSource: number
}

interface UserData {
  age: number
  height: number
  weight: number
  gender: number
  nickName: string
  region: string
}

interface DiskInfo {
  total: number
  free: number
  app: number
  watchface: number
  music: number
  system: number
}

declare namespace hmSetting {
  function setScreenAutoBright(isAutoBright: boolean): number;
  function getScreenAutoBright(): boolean;
  function setBrightness(brightness: number): number;
  function getBrightness(): number;
  function setBrightScreen(brightTime: number): number;
  function setBrightScreenCancel(): number;
  function setScreenOff(): number;
  function getUserData(): UserData;
  function getMileageUnit(): number;
  function getLanguage(): number;
  function getDateFormat(): number;
  function getTimeFormat(): number;
  function getDiskInfo(): DiskInfo;
  function getDeviceInfo(): DeviceInfo;
  function getWeightTarget(): number;
  function getSleepTarget(): number;
  function getWeightUnit(): number;
  function getScreenType(): number;

  enum screen_type {
    APP,
    WATCHFACE,
    SETTINGS,
    AOD,
  }
}
