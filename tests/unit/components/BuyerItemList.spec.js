import BuyerItemList from "@/components/BuyerItemList.vue";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import mutationTypes from "@/store/modules/mutation-types";

const buyer = {
  state: { buyer: [] },
  mutations: {},
  actions: {
    [mutationTypes.FETCH_BUYER]: jest.fn(),
  },
  getters: { buyers: (state) => state.buyer },
  namespaced: true,
};

const store = createStore({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: { buyer },
});

describe("BuyerItemList", () => {
  let wrapper, vm;

  const fetchBuyerSpy = jest.spyOn(buyer.actions, mutationTypes.FETCH_BUYER);
  beforeAll(async () => {
    wrapper = mount(BuyerItemList, {
      global: { plugins: [store] },
      shallow: true,
    });

    vm = wrapper.vm;
  });

  test("Initialized", () => {
    expect(wrapper).toBeTruthy();
  });

  test("getBuyer", () => {
    vm.getBuyer();
    expect(fetchBuyerSpy).toBeCalled();
  });
});
