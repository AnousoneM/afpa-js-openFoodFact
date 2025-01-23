// on lance la fonction au chargement de la page
window.addEventListener('load', function () {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserMultiFormatReader()
    codeReader.listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceSelect = document.getElementById('sourceSelect')
        selectedDeviceId = videoInputDevices[0].deviceId

        document.getElementById('startButton').addEventListener('click', () => {
          codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
            if (result) {
              console.log(result)
              document.getElementById('codebar').value = result.text
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
              console.error(err)
              document.getElementById('codebar').value = err
            }
          })
          console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
        })
      })
      .catch((err) => {
        console.error(err)
      })
  })