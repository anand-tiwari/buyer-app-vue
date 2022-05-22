<template>
  <div class="table">
    <div class="table__container">
      <div class="table__header table__grid">
        <template
          :key="tableField.field"
          v-for="tableField in candidateHeaderFilter"
        >
          <div v-if="tableField.isFilter" class="header__column clickable">
            <div class="table-td-text">
              <span>{{ tableField.label }}</span>
              <span><font-awesome-icon icon="sort" /></span>
            </div>
            <div class="table__td__separator"></div>
          </div>
          <div v-else class="header__column" :key="tableField.field">
            <div>{{ tableField.label }}</div>
          </div>
        </template>
      </div>
      <div className="table__body">
        <template :key="buyer._id" v-for="(buyer, index) in buyers">
          <div class="table__row__group">
            <div :class="{ even: index % 2 === 0, odd: index % 2 === 1 }">
              <buyer-item :buyer="buyer" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import BuyerItem from "./BuyerItem.vue";
import mutationTypes from "@/store/modules/mutation-types";
export default {
  name: "BuyerItemList",
  components: { BuyerItem },
  data() {
    return {
      candidateHeaderFilter: [
        {
          field: "name",
          isFilter: false,
          label: "Name",
        },
        {
          field: "price",
          isFilter: false,
          label: "Price",
        },
        {
          field: "packageType",
          isFilter: false,
          label: "Package Type",
        },
        {
          field: "",
          isFilter: false,
          label: "Action",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      buyers: "buyer/buyers",
    }),
  },
  created() {
    this.getBuyer();
  },
  methods: {
    ...mapActions("buyer", { fetchBuyer: mutationTypes.FETCH_BUYER }),
    getBuyer() {
      this.fetchBuyer();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_color.scss";
.table {
  cursor: pointer;
}
.table__header {
  box-shadow: 0 0.2rem 1.5rem 0 rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 400;
}

.table__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.top {
  box-shadow: inset 0 0.3rem 0 0 rgba(0, 0, 0, 0.6);
}

.buttom {
  box-shadow: inset 0 -0.3rem 0 0 rgba(0, 0, 0, 0.6);
}

.header__column {
  padding: 1.4rem 0.5rem;
  transition: box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
}

.table__body {
  font-weight: 300;
  min-height: 35rem;
}

.odd {
  background: rgba(0, 0, 0, 0.03);
}

.table__row__group {
  border-bottom: solid 0.1rem $black-light;
}

.table-tr {
  padding: 0.7rem 0.5rem;
}

.table-tr,
.header__column {
  overflow-wrap: anywhere;
  border-right: 0.1rem solid $black-light;
  text-align: center;
}

.table-td-text {
  display: flex;
  justify-content: space-between;
}

.clickable {
  cursor: pointer;
}
</style>
