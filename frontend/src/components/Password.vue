<template>
  <div class="form-container">
    <div class="step-info">Etapa <span class="step-number">{{ indexStep }}</span> de {{ totalSteps }}</div>
    <h2 class="form-title">Senha de acesso</h2>

    <div class="form-group">
      <label>Sua senha</label>
      <div class="password-field">
        <input :type="passwordFieldType" v-model="modelValue.data.password" placeholder="Senha de Acesso" />
        <i :class="['fa', passwordFieldType === 'password' ? 'fa-eye' : 'fa-eye-slash']"
          @click="togglePasswordVisibility"></i>
      </div>
    </div>
  </div>

</template>
<script setup>
import { computed } from 'vue'
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


const { passwordFieldType, togglePasswordVisibility } = useFormData(modelValue);
</script>
