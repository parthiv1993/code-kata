import axios from "axios";

export const getRequest = (url: string): Promise<any> => {
  return axios.get(url);
};

export default {
  getRequest,
};
