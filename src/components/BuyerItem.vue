<template>
  <div class="table__grid" :class="{ editable: isEdited }">
    <div class="table-tr">
      <div>{{ buyerData.name }}</div>
    </div>
    <div class="table-tr">
      <div v-if="!isEdited">{{ buyerData.price }}</div>
      <custom-input v-if="isEdited" v-model="buyerData.price" />
    </div>
    <div class="table-tr">
      <div v-if="!isEdited">{{ buyerData.packageType }}</div>
      <select v-else v-model="buyerData.packageType">
        <option disabled value="">Please select packageType</option>
        <option :key="packageType._id" v-for="packageType in packageTypes">
          {{ packageType.name }}
        </option>
      </select>
    </div>
    <div class="table-tr action">
      <div v-if="!isEdited" class="action__update">
        <button @click="isEdited = !isEdited">
          <span><font-awesome-icon icon="edit" /></span>
        </button>
        <button @click="deleteBuyerData()">
          <span><font-awesome-icon icon="trash" /></span>
        </button>
      </div>
      <div class="action__update" v-else>
        <button
          @click="updateBuyerData()"
          :class="{ 'disable-btn': v$.buyerData.$invalid }"
          :disabled="v$.buyerData.$invalid"
        >
          <span><font-awesome-icon icon="save" /></span>
        </button>
        <button @click="clearChange()">
          <span><font-awesome-icon icon="cancel" /></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import CustomInput from "./CustomInput.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";
import mutationTypes from "@/store/modules/mutation-types";

export default {
  name: "BuyerItem",
  components: { CustomInput },
  props: {
    buyer: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      isEdited: false,
      buyerData: { ...this.buyer },
      v$: useVuelidate(),
    };
  },
  computed: {
    ...mapGetters("buyer", ["packageTypes"]),
  },
  validations() {
    return {
      buyerData: {
        name: {
          required,
          min: minLength(2),
        },
        price: {
          required,
        },
        packageType: {
          required,
        },
      },
    };
  },
  methods: {
    ...mapActions("buyer", {
      updateBuyer: mutationTypes.UPDATE_BUYER,
      deleteBuyer: mutationTypes.DELETE_BUYER,
    }),
    clearChange() {
      this.isEdited = false;
      this.buyerData = { ...this.buyer };
    },
    updateBuyerData() {
      this.isEdited = false;
      this.updateBuyer({ data: this.buyerData });
    },
    deleteBuyerData() {
      this.isEdited = false;
      this.deleteBuyer({ data: { _id: this.buyerData._id } });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_color.scss";
.table__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.table-tr {
  padding: 0.7rem 0.5rem;
  overflow-wrap: anywhere;
  border-right: 0.1rem solid $black-light;
  text-align: center;
}
select {
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  background: url("data:image/svg+xml,<svg height='10px' width='10px' viewBox='0 0 16 16' fill='%23000000' xmlns='http://www.w3.org/2000/svg'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")
    no-repeat;
  background-position: calc(100% - 0.75rem) center;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  padding-right: 2rem;
  border: none;
  border-bottom: 0.1rem solid $grey-dark;
}
select:focus {
  outline: none;
}

.action {
  cursor: pointer;
  &__update {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  span {
    font-size: 1.5rem;
  }
  button {
    border: none;
    margin-right: 1rem;
    padding: 0.4rem;
    cursor: pointer;
    background-color: transparent;
  }
}

.editable {
  .field {
    border: 1px solid $white-dark;
  }
}

.disable-btn {
  cursor: not-allowed;
  background-color: $grey-dark;
  color: $white-dark;
}
</style>
