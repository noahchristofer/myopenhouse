import { constants } from '../constraints';
import axios from './config/axios';
import { CONSTANTS, Headers } from './config/constants';

export const GetPlaceName = async (myLat, myLon) => {
      try {
        return await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${myLat},${myLon}&key=${constants.GOOGLE_API_KEY}`,
        )
      } catch (error) {}
}

export const login = async data => {
    // This will remove authorization and store id
    const result=await axios.post(CONSTANTS.BASE_URL,data,{headers:Headers.Header2})
    return result;
  };
export const register = async data => {
    // This will remove authorization and store id
    const result=await axios.post(CONSTANTS.BASE_URL,data,{headers:Headers.Header2})
    return result;
  };
export const UpdateUser = async data => {
    // This will remove authorization and store id
    const result=await axios.post(CONSTANTS.BASE_URL,data,{headers:Headers.Header2})
    return result;
  };
export const UpdateSeller = async data => {
    // This will remove authorization and store id
    const result=await axios.post(CONSTANTS.BASE_URL,data,{headers:Headers.Header2})
    return result;
  };