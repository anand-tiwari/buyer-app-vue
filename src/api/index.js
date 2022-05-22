import axios from "axios";
import config from "@/config";

export const getBuyers = () => {
  return axios.get(config.api.base_path + config.api.buyer);
};

export const addBuyer = (data) => {
  return axios.post(config.api.base_path + config.api.buyer, data);
};

export const updateBuyer = (data) => {
  return axios.patch(config.api.base_path + config.api.buyer, data);
};

export const deleteBuyer = (data) => {
  return axios.delete(config.api.base_path + config.api.buyer, data);
};

export const fetchPackageType = () => {
  return axios.get(config.api.base_path + config.api.packageType);
};
