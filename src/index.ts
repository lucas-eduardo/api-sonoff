import adapterAxios from './adapterAxios'
import {
  AutomaticInterrupterResponse,
  InfoDeviceResponse,
  Startup,
  WifiSignalResponse,
} from './interfaces'

function initializeSonoff(__host: string, __port: number, __deviceId: string) {
  const api = adapterAxios(__host, __port, __deviceId)

  const startup = async (startup: Startup) => {
    await api.post('/startup', {
      data: {
        startup,
      },
    })

    return startup
  }

  const wifiConfiguration = async (network: string, password: string) => {
    await api.post('/signal_strength', {
      data: {
        ssid: network,
        password,
      },
    })
  }

  const wifiSignal = async () => {
    const {
      data: { data },
    } = await api.post<WifiSignalResponse>('/signal_strength')

    return { signalStrength: data.signalStrength }
  }

  const interrupter = async (status: boolean) => {
    const statusSwitch = status ? 'on' : 'off'

    await api.post('/switch', { data: { switch: statusSwitch } })
  }

  const automaticInterrupter = async () => {
    const {
      data: { data },
    } = await api.post<AutomaticInterrupterResponse>('/info')

    const statusInversion = {
      on: {
        status: false,
      },
      off: {
        status: true,
      },
    }

    const status = statusInversion[data.switch].status

    await interrupter(status)

    return status
  }

  const infoDevice = async () => {
    const {
      data: { data },
    } = await api.post<InfoDeviceResponse>('/info')

    const interrupter = {
      on: true,
      off: false,
    }

    return {
      deviceId: data.deviceid,
      interrupter: interrupter[data.switch],
      startup: data.startup,
      network: data.ssid,
    }
  }

  return {
    startup,
    wifiConfiguration,
    wifiSignal,
    interrupter,
    automaticInterrupter,
    infoDevice,
  }
}

export default initializeSonoff
