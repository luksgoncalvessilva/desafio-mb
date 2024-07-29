<template>
  <div style="width: 100%;">
    <template v-for="(item, index) in steps">
      <component v-if="(index + 1) == currentStep" :key="index" :is="item.type" :data="item.data"
        :index-step="index + 1" :total-steps="steps.length" v-model="payload" />
    </template>

    <button class="btn btn-outline" @click="prevStep" v-if="currentStep != 1">Anterior</button>
    <button :class="{ w100: currentStep == 1 }" class="btn btn-primary" v-if="currentStep != steps.length"
      @click="nextStep" :disabled="false">Continuar</button>
    <button class="btn btn-primary" v-if="currentStep == steps.length" @click="handleSubmit">Cadastrar</button>
    <br>
    <label class="mt-1">{{ responseMessage }}</label>
  </div>

</template>

<script setup>

import { ref, computed } from 'vue';
import Welcome from './components/Welcome.vue';
import PersonData from './components/PersonData.vue';
import Password from './components/Password.vue';
import ReviewData from './components/ReviewData.vue';
import { useFormData } from './composables/formData.js';

const steps = ref([
  { type: Welcome, data: { message: 'Dados para o componente Welcome' } },
  { type: PersonData, data: { message: 'Dados para o componente PersonData' } },
  { type: Password, data: { message: 'Dados para o componente Password' } },
  { type: ReviewData, data: { message: 'Dados para o componente ReviewData' } },
]);

const payload = ref(blankPayload());
const responseMessage = ref('');

function blankPayload() {
  return {
    data: {
      email: '',
      personType: 'Pessoa Física',
      name: '',
      cpf: '',
      cnpj: '',
      birthDate: '',
      phone: '',
      password: '',
    },
    validate: {
      emailError: '',
      cnpjError: '',
      cpfError: '',
    },
    loading: false,
    valid: true,
  }
}

function nextStep() {
  if (isStepValid.value && currentStep.value < 4) {
    currentStep.value++;
    responseMessage.value = '';
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    responseMessage.value = '';
  }
}

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 1:
      return payload.value.data.email !== '' && payload.value.data.personType !== '' && payload.value.validate.emailError === '';
    case 2:
      return (
        payload.value.data.name !== '' &&
        (payload.value.data.personType === 'Pessoa Física' ? payload.value.validate.cpfError === '' : payload.value.validate.cnpjError === '') &&
        payload.value.data.birthDate !== '' &&
        payload.value.data.phone !== ''
      );
    case 3:
      return payload.value.data.password !== '';
    case 4:
      return true;
    default:
      return false;
  }
});

async function handleSubmit() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload.value.data
      }),
    });

    const data = await response.json();

    if (data.error) {
      responseMessage.value = data.error;
      return;
    }

    responseMessage.value = data.message;
    payload.value = blankPayload();
    currentStep.value = 1;
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    responseMessage.value = 'Erro ao enviar dados!';
  }
}


const { currentStep } = useFormData();




</script>

<style>
div {
  margin-bottom: 20px;
}

input {
  display: block;
  margin-bottom: 10px;
}

button {
  margin-right: 10px;
}

.error {
  color: red;
  font-size: 12px;
  margin-bottom: 0px;
}
</style>
