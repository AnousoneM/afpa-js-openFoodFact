// on lance la fonction au chargement de la page
window.addEventListener('load', function () {
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserMultiFormatReader()
  codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
      const sourceSelect = document.getElementById('sourceSelect')
      selectedDeviceId = videoInputDevices[0].deviceId

      document.getElementById('startButton').addEventListener('click', () => {

        // on masque et on affiche les sections
        document.getElementById('row-video').classList.remove('d-none')
        document.getElementById('section-search').classList.add('d-none')

        // on masque et on affiche les boutons
        document.getElementById('cancelButton').classList.remove('d-none')
        document.getElementById('startButton').classList.add('d-none')

        // on ajoute des fonction sur le bouton annuler : cancelButton

        document.getElementById('cancelButton').addEventListener('click', () => {
          // on arrête la vidéo de la cam
          codeReader.reset()
          // on masque et on affiche les sections
          document.getElementById('row-video').classList.add('d-none')
          document.getElementById('section-search').classList.remove('d-none')
          // on masque et on affiche les boutons
          document.getElementById('cancelButton').classList.add('d-none')
          document.getElementById('startButton').classList.remove('d-none')

        })

        codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
          if (result) {
            // redirection dès que le code bar a été lu
            document.location.href = 'product.html?codebar=' + result
          }
          if (err && !(err instanceof ZXing.NotFoundException)) {
            document.getElementById('codebar').value = err
          }
        })


      })
    })
    .catch((err) => {
      console.error(err)
    })
})