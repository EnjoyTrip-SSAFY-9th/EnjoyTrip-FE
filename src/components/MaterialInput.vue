<script setup>
defineProps({
  user: {
    type: [String, String],
    id: String,
    password: String,
  },
  id: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: [String, Object],
    text: String,
    class: String,
    default: () => ({
      class: "",
    }),
  },
  value: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
  },
  error: {
    type: Boolean,
    default: false,
  },
  success: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  inputClass: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});
function getClasses(size, success, error) {
  let sizeValue, isValidValue;

  sizeValue = size && `form-control-${size}`;

  if (error) {
    isValidValue = "is-invalid";
  } else if (success) {
    isValidValue = "is-valid";
  } else {
    isValidValue = "";
  }

  return `${sizeValue} ${isValidValue}`;
}

const emit = defineEmits(["updateData"]);
function onChange(e, key) {
  // this.value = e.target.value;
  //  value[text] = e.target.value;
  //   console.log(value[text]);
  if (key == "아이디") key = "id";
  if (key == "비밀번호") key = "password";
  if (key == "비밀번호 확인") key = "passwordCheck";
  if (key == "이름") key = "name";
  if (key == "이메일") key = "email";
  emit("updateData", e.target.value, key);
  // @input="onChange($event, value, label.text)"
}
</script>
<template>
  <div class="input-group">
    <label v-if="label" :class="label.class">{{
      typeof label == "string" ? label : label.text
    }}</label>
    <span v-if="icon" class="input-group-text"
      ><i class="fas" :class="`fa-${icon}`" aria-hidden="true"></i
    ></span>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :class="[getClasses(size, success, error), inputClass]"
      :value="user[label.text]"
      :placeholder="placeholder"
      :isRequired="isRequired"
      :disabled="isDisabled"
      @input="onChange($event, label.text)"
    />
  </div>
</template>
