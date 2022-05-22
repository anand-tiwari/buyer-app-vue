<template>
  <div>
    <form @submit.prevent="addBuyerData">
      <div class="buyer__form">
        <div class="buyer__city">
          <custom-input
            label="Name"
            placeholder="name"
            v-model="formData.name"
          />
        </div>
        <div class="buyer__price">
          <custom-input
            label="Price"
            placeholder="price"
            v-model="formData.price"
          />
        </div>
        <div class="buyer__package">
          <select v-model="formData.packageType">
            <option disabled value="">Please select one</option>
            <option :key="packageType._id" v-for="packageType in packageTypes">
              {{ packageType.name }}
            </option>
          </select>
        </div>
        <div class="search__button">
          <button
            :disabled="v$.formData.$invalid"
            :class="{ 'disable-btn': v$.formData.$invalid }"
            class="search__button--btn btn-primary"
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CustomInput from "@/components/CustomInput";

import useVuelidate from "@vuelidate/core";
import { required, minLength, minValue } from "@vuelidate/validators";
import mutationTypes from "@/store/modules/mutation-types";

export default {
  name: "BuyerItemForm",
  components: { CustomInput },
  data() {
    return {
      formData: {
        _id: "",
        name: "",
        packageType: "Device Location",
        price: 0,
      },
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      formData: {
        name: {
          required,
          min: minLength(2),
        },
        price: {
          required,
          minValue: minValue(1),
        },
        packageType: {
          required,
        },
      },
    };
  },
  computed: {
    ...mapGetters("buyer", ["packageTypes"]),
  },
  created() {
    this.fetchPackageType();
  },
  methods: {
    ...mapActions("buyer", {
      addBuyer: mutationTypes.ADD_BUYER,
      fetchPackageType: mutationTypes.FETCH_PACKAGE_TYPES,
    }),
    addBuyerData() {
      this.addBuyer({ data: this.formData });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_color.scss";
.buyer {
  &__form {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    grid-gap: 1rem;
    padding: 2rem 1rem;
    cursor: pointer;
  }
  &__package {
    select {
      width: 100%;
      height: 100%;
      font-size: 2rem;
      background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
        no-repeat;
      background-position: calc(100% - 0.75rem) center;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      padding-right: 2rem;
      border: none;
      border-bottom: 0.1rem solid $grey-darken;
    }
    select:focus {
      outline: none;
    }
  }
}

.search__button {
  background-color: $white;
  height: 5rem;
  overflow: hidden;
  flex: 0 0 100%;
  &--btn {
    align-items: center;
    color: $black-lighter;
    cursor: pointer;
    display: flex;
    font-weight: 400;
    height: 100%;
    letter-spacing: 0.2px;
    text-align: left;
    text-rendering: optimizeLegibility;
    width: 100%;
    justify-content: center;
    font-size: large;
    border: 0.1rem solid $grey;
    border-radius: 0.8rem;
  }
}

.disable-btn {
  cursor: not-allowed;
  background-color: $grey-dark;
}
</style>
