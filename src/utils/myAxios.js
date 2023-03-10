import axios from 'axios';
import { constant } from '../constraints';
export async function postObject({objectName, body, token}) {
  return await axios
    .post(config.url + objectName, body, {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
    .then(response => {
      return response.data;
    });
}

export async function dataGet({ body}) {
  // console.log("body",body);
  return await axios
          .post(global.mainUrl, body,
    { headers: { 'Content-Type': 'multipart/form-data' } }
)
    .then(res => {
      return res.data
    })  
    .catch(err => {
      return err
  });
}
