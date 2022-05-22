import BuyerItem from "@/components/BuyerItem.vue";
import mutationTypes from "@/store/modules/mutation-types";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

const buyer = {
  state: { packageTypes: [] },
  mutations: {},
  actions: {
    [mutationTypes.UPDATE_BUYER]: jest.fn(),
    [mutationTypes.DELETE_BUYER]: jest.fn(),
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

describe("BuyerItem", () => {
  let wrapper, vm;

  const updateBuyerSpy = jest.spyOn(buyer.actions, mutationTypes.UPDATE_BUYER);
  const deleteBuyerSpy = jest.spyOn(buyer.actions, mutationTypes.DELETE_BUYER);

  beforeAll(async () => {
    wrapper = mount(BuyerItem, {
      global: { plugins: [store] },
      propsData: {
        buyer: { id: "123", name: "buyer 1" },
      },
      shallow: true,
    });

    vm = wrapper.vm;
  });

  test("Initialized", () => {
    expect(wrapper).toBeTruthy();
  });

  test("updateBuyerData", () => {
    vm.isEdited = true;
    vm.updateBuyerData();
    expect(updateBuyerSpy).toBeCalled();
    expect(vm.isEdited).toBeFalsy();
  });

  test("deleteBuyerData", () => {
    vm.isEdited = true;

    vm.deleteBuyerData();
    expect(deleteBuyerSpy).toBeCalled();
    expect(vm.isEdited).toBeFalsy();
  });

  test("clearChange", () => {
    vm.isEdited = true;
    const buyer = { id: "123", name: "buyer 1" };
    vm.buyerData = { id: "123", name: "buyer 4" };
    vm.clearChange();
    expect(vm.isEdited).toBeFalsy();
    expect(vm.buyerData).toEqual({ ...buyer });
  });
});
