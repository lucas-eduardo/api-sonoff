type Startup = 'on' | 'off' | 'stay'

interface WifiSignalResponse {
  data: {
    signalStrength: number
  }
}

interface AutomaticInterrupterResponse {
  data: {
    switch: 'on' | 'off'
  }
}

interface InfoDeviceResponse {
  data: {
    deviceid: string
    switch: 'on' | 'off'
    startup: Startup
    ssid: string
  }
}

export {
  Startup,
  WifiSignalResponse,
  AutomaticInterrupterResponse,
  InfoDeviceResponse,
}
