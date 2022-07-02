# Sonoff

Promise based Sonoff API for node.js

## Table of Contents

  - [Features](#features)
  - [Installing](#installing)
  - [Example](#example)
  - [Request method aliases](#request-method-aliases)
  - [License](#license)

## Features

- Startup
- Wifi Configuration
- Wifi Signal
- Interrupter
- Automatic Interrupter
- Info Device


## Installing

Using npm:

```bash
$ npm install sonoff
```

## Example

```js
import sonoff from 'sonoff'

const {
  startup,
  wifiConfiguration,
  wifiSignal,
  interrupter,
  automaticInterrupter,
  infoDevice
} = sonoff('http://10.0.0.170', 8082, '1003564a2a')

startup('stay')
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

wifiConfiguration('home-5G', '123456')
  .then(() => {
    console.log('ok')
  })
  .catch(error => {
    console.log(error)
  })

wifiSignal()
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

interrupter(true)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

automaticInterrupter()
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })

infoDevice()
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
```

## Request method aliases

##### sonoff(host, port, deviceId).startup(startup)
##### sonoff(host, port, deviceId).wifiConfiguration(network, password)
##### sonoff(host, port, deviceId).wifiSignal()
##### sonoff(host, port, deviceId).interrupter(status)
##### sonoff(host, port, deviceId).automaticInterrupter()
##### sonoff(host, port, deviceId).infoDevice()

## License

[MIT](LICENSE)
