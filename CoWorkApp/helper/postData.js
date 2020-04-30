export function postData (url, params, fileURL) {
    let data = new FormData()
    if (fileURL) {
      data.append('image', {uri: fileURL, name: 'image.jpg', type: 'image/jpg'})
    }
    _.each(params, (value, key) => {
      if (value instanceof Date) {
        data.append(key, value.toISOString())
      } else {
        data.append(key, String(value))
      }
    })
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=6ff46e0b6b5148d984f148b6542e5a5d',
        'Content-Language': React.NativeModules.RNI18n.locale,
        'Authorization': 'Token ABCDEF123457890',
      },
      body: data,
    }
    return fetch(API_URL + url, config)
      .then(checkStatusAndGetJSONResponse)
}