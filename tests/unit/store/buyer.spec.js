import buyerModule from "@/store/modules/buyer";
import axios from "axios";
import config from "@/config";
import MutationTypes from "@/store/modules/mutation-types";

describe("ACTIONS store/buyer.js", () => {
  const mockGet = jest.spyOn(axios, "get");

  mockGet.mockImplementation((url) => {
    switch (url) {
      case config.api.base_path + config.api.buyer:
        return Promise.resolve({
          data: { buyers: [{ id: 1, name: "buyer1" }] },
        });
      case config.api.base_path + config.api.packageType:
        return Promise.resolve({
          data: { packageType: [{ id: 1, name: "packageType 1" }] },
        });
    }
  });

  const mockPost = jest.spyOn(axios, "post");

  mockPost.mockImplementation((url) => {
    switch (url) {
      case config.api.base_path + config.api.buyer:
        return Promise.resolve({ data: { buyer: { id: 1, name: "buyer1" } } });
    }
  });

  const mockPatch = jest.spyOn(axios, "patch");

  mockPatch.mockImplementation((url) => {
    switch (url) {
      case config.api.base_path + config.api.buyer:
        return Promise.resolve({
          data: { buyer: { id: 1, name: "buyer1 updated" } },
        });
    }
  });

  const mockDelete = jest.spyOn(axios, "delete");

  mockDelete.mockImplementation((url) => {
    switch (url) {
      case config.api.base_path + config.api.buyer:
        return Promise.resolve({
          data: { buyer: { id: 1, name: "buyer1 deleted" } },
        });
    }
  });

  let mutationPayload;
  const mockCommit = (state, payload) => {
    mutationPayload = payload;
  };

  test(`action ${MutationTypes.FETCH_BUYER}`, async () => {
    await buyerModule.actions[MutationTypes.FETCH_BUYER]({
      commit: mockCommit,
    });
    expect(mutationPayload).toEqual([{ id: 1, name: "buyer1" }]);
  });

  test(`action ${MutationTypes.ADD_BUYER}`, async () => {
    const data = { id: 2, name: "test buyer 2" };
    await buyerModule.actions[MutationTypes.ADD_BUYER](
      { commit: mockCommit },
      data
    );
    expect(mutationPayload).toEqual({ id: 1, name: "buyer1" });
  });

  test(`action ${MutationTypes.UPDATE_BUYER}`, async () => {
    const data = { id: 2, name: "test buyer 2" };
    await buyerModule.actions[MutationTypes.UPDATE_BUYER](
      { commit: mockCommit },
      data
    );
    expect(mutationPayload).toEqual({ id: 1, name: "buyer1 updated" });
  });

  test(`action ${MutationTypes.DELETE_BUYER}`, async () => {
    const data = { id: 2, name: "test buyer 2" };
    await buyerModule.actions[MutationTypes.DELETE_BUYER](
      { commit: mockCommit },
      data
    );
    expect(mutationPayload).toEqual({ id: 1, name: "buyer1 deleted" });
  });

  test(`action ${MutationTypes.FETCH_PACKAGE_TYPES}`, async () => {
    await buyerModule.actions[MutationTypes.FETCH_PACKAGE_TYPES]({
      commit: mockCommit,
    });
    expect(mutationPayload).toEqual([{ id: 1, name: "packageType 1" }]);
  });
});

describe("MUTATIONS store/buyer.js", () => {
  const state = {
    buyer: [],
    packageTypes: [],
  };
  test("mutation setBuyer", () => {
    const data = [{ id: 1, name: "test buyer 1" }];
    buyerModule.mutations[MutationTypes.SET_BUYER](state, data);
    expect(state.buyer).toStrictEqual(data);
  });
  test("mutation addBuyer", () => {
    // reset buyes state
    const data = [{ id: 1, name: "test buyer 1" }];
    buyerModule.mutations[MutationTypes.SET_BUYER](state, data);
    expect(state.buyer).toStrictEqual(data);

    // add new buyer
    const newBuyer = { id: 2, name: "test buyer 2" };
    buyerModule.mutations[MutationTypes.ADD_BUYER](state, newBuyer);
    expect(state.buyer).toStrictEqual([...data, newBuyer]);
  });

  test("mutation updateBuyer", () => {
    // reset buyes state
    const data = [{ id: 1, name: "test buyer 1" }];
    buyerModule.mutations[MutationTypes.SET_BUYER](state, data);
    expect(state.buyer).toStrictEqual(data);

    // update  buyer
    const newBuyer = { id: 1, name: "test buyer 2" };
    buyerModule.mutations[MutationTypes.UPDATE_BUYER](state, newBuyer);
    expect(state.buyer).toStrictEqual([newBuyer]);
  });

  test("mutation deleteBuyer", () => {
    // reset buyes state
    const data = [{ id: 1, name: "test buyer 1" }];
    buyerModule.mutations[MutationTypes.SET_BUYER](state, data);
    expect(state.buyer).toStrictEqual(data);

    // update  buyer
    const newBuyer = { id: 1, name: "test buyer 2" };
    buyerModule.mutations[MutationTypes.DELETE_BUYER](state, newBuyer);
    expect(state.buyer).toStrictEqual([]);
  });

  test("mutation setPackageTypes", () => {
    // reset buyes state
    const data = [{ id: 1, name: "test buyer 1" }];
    buyerModule.mutations[MutationTypes.SET_PACKAGE_TYPES](state, data);
    expect(state.packageTypes).toStrictEqual(data);
  });
});

describe("GETTERS store/buyer.js", () => {
  const state = {
    buyer: [],
    packageTypes: [],
  };
  expect(buyerModule.getters.buyers(state)).toStrictEqual(state.buyer);
  expect(buyerModule.getters.packageTypes(state)).toStrictEqual(
    state.packageTypes
  );
});
