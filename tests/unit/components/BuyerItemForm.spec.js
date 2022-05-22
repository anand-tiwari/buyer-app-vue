import BuyerItemForm from "@/components/BuyerItemForm.vue";
import mutationTypes from "@/store/modules/mutation-types";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

const buyer = {
  state: { packageTypes: [] },
  mutations: {},
  actions: {
    [mutationTypes.ADD_BUYER]: jest.fn(),
    [mutationTypes.FETCH_PACKAGE_TYPES]: jest.fn(),
  },
  getters: { packageTypes: (state) => state.packageTypes },
  namespaced: true,
};

const store = createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: { buyer },
});

describe("BuyerItemForm", () => {
  let wrapper, vm;

  const addBuyerSpy = jest.spyOn(buyer.actions, mutationTypes.ADD_BUYER);
  beforeAll(async () => {
    wrapper = mount(BuyerItemForm, {
      global: { plugins: [store] },
      shallow: true,
    });

    vm = wrapper.vm;
  });

  test("Initialized", () => {
    expect(wrapper).toBeTruthy();
  });

  test("addBuyerData", () => {
    vm.addBuyerData();
    expect(addBuyerSpy).toBeCalled();
  });
});
