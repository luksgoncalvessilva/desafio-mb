<template>
  <div>
    <div class="form-container">
      <div class="step-info">Etapa <span class="step-number">{{ indexStep }}</span> de {{ totalSteps }}</div>
      <h2 class="form-title">Seja bem vindo(a)</h2>

      <div class="form-group">
        <label>Endereço de e-mail</label>
        <input class="form-input" type="email" v-model="modelValue.data.email" @input="validateEmail" />
        <div v-if="modelValue.validate.emailError" class="error">{{ modelValue.validate.emailError }}</div>
      </div>

      <div class="form-group radio-group">
        <label class="radio-label">
          <input type="radio" name="personType" value="Pessoa Física" class="radio-input"
            v-model="modelValue.data.personType" />
          Pessoa física
        </label>
        <label class="radio-label">
          <input type="radio" name="personType" value="Pessoa Jurídica" class="radio-input"
            v-model="modelValue.data.personType" />
          Pessoa jurídica
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useFormData } from '../composables/formData.js';

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    default: () => ({}),
  },
  indexStep: {
    type: Number,
    default: () => ({}),
  },
  totalSteps: {
    type: Number,
    default: () => ({}),
  },
});

const emits = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emits["update:modelValue"](value),
});

const { validateEmail } = useFormData(modelValue);

</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
