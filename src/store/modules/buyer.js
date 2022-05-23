import {
  getBuyers,
  addBuyer,
  updateBuyer,
  deleteBuyer,
  fetchPackageType,
} from "@/api";
import MutationTypes from "./mutation-types";

const state = {
  buyer: [],
  packageTypes: [],
};

const mutations = {
  [MutationTypes.SET_BUYER](state, buyer) {
    state.buyer = buyer;
  },
  [MutationTypes.ADD_BUYER](state, buyer) {
    state.buyer = [...state.buyer, buyer];
  },
  [MutationTypes.UPDATE_BUYER](state, buyer) {
    state.buyer = state.buyer.map((buyerObj) =>
      buyerObj._id === buyer._id ? buyer : buyerObj
    );
  },
  [MutationTypes.DELETE_BUYER](state, buyer) {
    state.buyer = state.buyer.filter((buyerObj) => buyerObj._id !== buyer._id);
  },
  [MutationTypes.SET_PACKAGE_TYPES](state, packageTypes) {
    state.packageTypes = packageTypes;
  },
};

const actions = {
  async [MutationTypes.FETCH_BUYER]({ commit }) {
    const response = await getBuyers();
    commit(MutationTypes.SET_BUYER, response.data.buyers);
  },
  async [MutationTypes.ADD_BUYER]({ commit }, data) {
    const response = await addBuyer(data);
    commit(MutationTypes.ADD_BUYER, response.data.buyer);
  },
  async [MutationTypes.UPDATE_BUYER]({ commit }, data) {
    const response = await updateBuyer(data);
    commit(MutationTypes.UPDATE_BUYER, response.data.buyer);
  },
  async [MutationTypes.DELETE_BUYER]({ commit }, data) {
    const response = await deleteBuyer(data);
    commit(MutationTypes.DELETE_BUYER, response.data.buyer);
  },
  async [MutationTypes.FETCH_PACKAGE_TYPES]({ commit }) {
    const response = await fetchPackageType();
    commit(MutationTypes.SET_PACKAGE_TYPES, response.data.packageType);
  },
};

const getters = {
  buyers: (state) => state.buyer,
  packageTypes: (state) => state.packageTypes,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
