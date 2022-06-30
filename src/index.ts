import axios from 'axios'

type Startup = 'on' | 'off' | 'stay';

interface WifiSignalResponse {
  data: {
    signalStrength: number;
  };
};

interface AutomaticInterrupterResponse {
  data: {
    switch: 'on' | 'off';
  };
};

interface InfoDevice {
  data: {
    deviceid: string;
    switch: 'on' | 'off';
    startup: Startup;
    ssid: string;
  };
};

function initializeSonoff(__host: string, __port: number, __deviceId: string) {
  const apiAxios = axios.create({
    baseURL: `http://${__host}:${__port}/zeroconf`,
  });

  apiAxios.interceptors.request.use((req) => {
    const { data } = req;

    const newData = Object.assign(data || {}, {
      deviceId: __deviceId,
      data: data?.data ? data.data : {},
    });

    return { ...req, data: newData };
  });

  const startup = async (startup: Startup) => {
    await apiAxios.post('/startup', {
      data: {
        startup,
      },
    });

    return startup;
  };

  const wifiConfiguration = async (network: string, password: string) => {
    await apiAxios.post<WifiSignalResponse>('/signal_strength', {
      data: {
        ssid: network,
        password,
      },
    });
  };

  const wifiSignal = async () => {
    const {
      data: { data },
    } = await apiAxios.post<WifiSignalResponse>('/signal_strength');

    return { signalStrength: data.signalStrength };
  };

  const interrupter = async (status: boolean) => {
    const statusSwitch = status ? 'on' : 'off';

    await apiAxios.post('/switch', { data: { switch: statusSwitch } });
  };

  const automaticInterrupter = async () => {
    const {
      data: { data },
    } = await apiAxios.post<AutomaticInterrupterResponse>('/info');

    const statusInversion = {
      on: {
        status: false,
      },
      off: {
        status: true,
      },
    };

    const status = statusInversion[data.switch].status;

    await interrupter(status);

    return status;
  };

  const infoDevice = async () => {
    const {
      data: { data },
    } = await apiAxios.post<InfoDevice>('/info');

    const interrupter = {
      on: true,
      off: false,
    };

    return {
      deviceId: data.deviceid,
      interrupter: interrupter[data.switch],
      startup: data.startup,
      network: data.ssid,
    };
  };

  return {
    startup,
    wifiConfiguration,
    wifiSignal,
    interrupter,
    automaticInterrupter,
    infoDevice,
  };
}

export { initializeSonoff }