import axios from 'axios'

function api(__host: string, __port: number, __deviceId: string) {
  const instance = axios.create({
    baseURL: `http://${__host}:${__port}/zeroconf`,
  })

  instance.interceptors.request.use(req => {
    const { data } = req

    const newData = Object.assign(data || {}, {
      deviceId: __deviceId,
      data: data?.data ? data.data : {},
    })

    return { ...req, data: newData }
  })

  return instance
}

export default api
