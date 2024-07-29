<template>
  <div class="form-container">
    <div class="step-info">Etapa <span class="step-number">{{ indexStep }}</span> de {{ totalSteps }}</div>
    <h2 class="form-title">Revise suas informações</h2>
    <div class="form-group">
      <label>{{ modelValue.data.personType === 'Pessoa Física' ? 'Nome' : 'Razão Social' }}</label>
      <input class="form-input" type="text" v-model="modelValue.data.name" />
    </div>
    <div class="form-group">
      <label>{{ modelValue.data.personType === 'Pessoa Física' ? 'CPF' : 'CNPJ' }}</label>
      <input class="form-input" v-if="modelValue.data.personType === 'Pessoa Física'" type="text"
        v-model="modelValue.data.cpf" @input="applyCpfMask" @blur="validateCpf" maxlength="14" />
      <input class="form-input" v-if="modelValue.data.personType === 'Pessoa Jurídica'" type="text" maxlength="18"
        v-model="modelValue.data.cnpj" @input="applyCnpjMask" @blur="validateCnpj" />
      <div v-if="modelValue.validate.cpfError && modelValue.data.personType === 'Pessoa Física'" class="error">{{
      modelValue.validate.cpfError }}</div>
      <div v-if="modelValue.validate.cnpjError && modelValue.data.personType === 'Pessoa Jurídica'" class="error">{{
      modelValue.validate.cnpjError }}</div>
    </div>
    <div class="form-group">
      <label>
        {{ modelValue.data.personType === 'Pessoa Física' ? 'Data de nascimento' : 'Data de abertura' }}
      </label>
      <input class="form-input" type="date" v-model="modelValue.data.birthDate" />
    </div>
    <div class="form-group">
      <label>Telefone</label>
      <input class="form-input" maxlength="15" type="tel" v-model="modelValue.data.phone" v-mask="'(##) #####-####'" />
    </div>
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

const { cpfError, cnpjError, validateCpf, applyCpfMask, validateCnpj, isValidCpf, applyCnpjMask, isValidCnpj, passwordFieldType, togglePasswordVisibility } = useFormData(modelValue);


</script>
<style scoped>
.read-the-docs {
  color: #888;
}
</style>
