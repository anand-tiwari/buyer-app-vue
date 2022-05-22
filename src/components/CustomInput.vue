<template>
  <div class="field">
    <input
      type="text"
      :id="label"
      @input="inputEvent"
      :placeholder="placeholder"
      :value="modelValue"
      class="input-effect"
    />
    <label :for="label">{{ label }}</label>
    <span class="focus-border"></span>
  </div>
</template>
<script>
export default {
  name: "CustomInput",
  props: ["placeholder", "label", "modelValue"],
  methods: {
    inputEvent(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/_color.scss";
.field {
  display: flex;
  flex-flow: column-reverse;
  //margin-bottom: 1em;
  position: relative;
  height: 100%;
}
label,
input {
  transition: all 0.2s;
  touch-action: manipulation;
}

input {
  font-size: 1.5rem;
  border: 0;
  border-bottom: 0.1rem solid $grey-darken;
  font-family: inherit;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0;
  cursor: text;
  width: 100%;
}

input:focus {
  outline: 0;
  border-bottom: 0.1rem solid $grey-dark;
}

label {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

input:placeholder-shown + label {
  cursor: text;
  max-width: 66.66%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;
  transform: translate(0, 2.125rem) scale(1.5);
}
/**
* By default, the placeholder should be transparent. Also, it should
* inherit the transition.
*/
::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}
/**
* Show the placeholder when the input is focused.
*/
input:focus::-webkit-input-placeholder {
  opacity: 1;
}
/**
* When the element is focused, remove the label transform.
* Also, do this when the placeholder is _not_ shown, i.e. when
* there's something in the input at all.
*/
input:not(:placeholder-shown) + label,
input:focus + label {
  transform: translate(0, 0) scale(1);
  cursor: pointer;
}

.input-effect ~ .focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.2rem;
  background-color: $blue;
  transition: 0.4s;
}
.input-effect:focus ~ .focus-border {
  width: 100%;
  transition: 0.4s;
}
</style>
