import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {createFileName} from './functionalConstants';

// const dataCollection = await firestore().collection('Datas').get();
async function getdata() {
  let data;
  let collection;

  // const sub = await firestore()
  //   .collection('Datas')
  //   .orderBy('createdAt', 'desc')
  //   .limit(1)
  //   .onSnapshot(QuerySnapshot => {
  //     console.log('Got Users collection result.', QuerySnapshot.docs.length);
  //     QuerySnapshot.forEach(documentSnapshot => {
  //       console.log('Fetched', documentSnapshot.data().g_reading);
  //       data = documentSnapshot.data();
  //       // return documentSnapshot.data();
  //     });
  //   }, onError);

  // console.log('PPP', data);
  //   .get();
  // if (typeof collection !== 'undefined') {
  //   collection.forEach(documentSnapshot => {
  //     console.log('Fetched', documentSnapshot.data().g_reading);
  //     data = documentSnapshot.data();
  //   });
  // }
  // return data.g_reading;

  // console.log('PPP', data);

  return data ? data.g_reading : 10;
}

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.', QuerySnapshot.docs.length);
  QuerySnapshot.forEach(documentSnapshot => {
    console.log('Fetched', documentSnapshot.data().g_reading);
    // data = documentSnapshot.data();
    return documentSnapshot.data();
  });
}

function onError(error) {
  console.error(error);
}

async function add_data(img, mode, gread) {
  // console.log(gread);
  try {
    await firestore()
      .collection('Datas')
      .add({
        user: 'admin',
        g_reading: gread,
        img_url: await uploadToFirebase(img, mode, gread),
        isUpload: mode,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    return 'Image Uploaded';
  } catch (error) {
    return error;
  }
}

const uploadToFirebase = async (img, mode, gread) => {
  var storageRef = storage().ref(
    `${
      mode ? (gread > 99 ? 'diabetic' : 'notDiabetic') : 'analyse'
    }${createFileName()}`,
  );

  const snapShot = await storageRef.putFile(img);
  // console.log('Image uploaded to the bucket!');
  // console.log(snapShot.metadata);
  const uri = await storage()
    .ref(snapShot.metadata.fullPath)
    .getDownloadURL();

  return uri;
};

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

export {isEye, getdata, add_data, uploadToFirebase};
