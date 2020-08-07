const isEye = (blob, signal) => {
  return new Promise((resolve, reject) => {
    fetch(
      'https://iseye.cognitiveservices.azure.com/customvision/v3.0/Prediction/1d19c562-d247-4f2c-b3c1-6c7346a50b09/classify/iterations/isEye/image',
      {
        signal,
        method: 'POST',
        headers: {
          //   Accept: 'application/json',
          'Prediction-Key': '1ecb570264f6477f96d9b959f4b14539',
          'Content-Type': 'application/octet-stream',
        },
        body: blob,
      },
    )
      .then(res => res.json())
      .then(data => {
        blob.close();
        resolve(data.predictions[0].tagName);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export {isEye};
