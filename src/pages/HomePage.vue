<template>
  <div class="buyer">
    <h2 class="buyer__form">Buyer Data Entry Form</h2>
    <buyer-item-form />
    <h2 class="buyer__list">Buyer subscription List</h2>
    <buyer-item-list />
  </div>
</template>

<script>
// @ is an alias to /src
import BuyerItemForm from "@/components/BuyerItemForm.vue";
import BuyerItemList from "@/components/BuyerItemList.vue";

export default {
  name: "HomePage",
  components: {
    BuyerItemForm,
    BuyerItemList,
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_color.scss";
.buyer {
  &__form,
  &__list {
    font-size: 2rem;
    font-weight: 700;
    padding: 1rem 0;
    margin: 1rem 0;
    color: $black;
  }
}
</style>
