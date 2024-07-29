import { ref, computed } from 'vue';

function useFormData(modelValue) {
    const passwordFieldType = ref('password');
    const currentStep = ref(1);

    function validateCpf() {
        if (!isValidCpf(modelValue.value.data.cpf)) {
            modelValue.value.validate.cpfError = 'CPF inválido.';
        } else {
            modelValue.value.validate.cpfError = '';
        }
    }

    function applyCpfMask() {
        modelValue.value.data.cpf = modelValue.value.data.cpf.replace(/\D/g, '');
        modelValue.value.data.cpf = modelValue.value.data.cpf.replace(/(\d{3})(\d)/, '$1.$2');
        modelValue.value.data.cpf = modelValue.value.data.cpf.replace(/(\d{3})(\d)/, '$1.$2');
        modelValue.value.data.cpf = modelValue.value.data.cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    function validateCnpj() {
        if (!isValidCnpj(modelValue.value.data.cnpj)) {
            modelValue.value.validate.cnpjError = 'CNPJ inválido.';
        } else {
            modelValue.value.validate.cnpjError = '';
        }
    }

    function isValidCpf(cpfValue) {
        const cleanedCpf = cpfValue.replace(/\D/g, '');

        if (cleanedCpf.length !== 11) return false;

        let sum = 0;
        let remainder;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cleanedCpf.substring(9, 10))) return false;

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cleanedCpf.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cleanedCpf.substring(10, 11))) return false;

        return true;
    }

    function isValidCnpj(cnpjValue) {
        const cleanedCnpj = cnpjValue.replace(/\D/g, '');

        if (cleanedCnpj.length !== 14) return false;

        let length = cleanedCnpj.length - 2;
        let numbers = cleanedCnpj.substring(0, length);
        const digits = cleanedCnpj.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (result !== parseInt(digits.charAt(0))) return false;

        length = length + 1;
        numbers = cleanedCnpj.substring(0, length);
        sum = 0;
        pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    }

    function applyCnpjMask() {
        modelValue.value.data.cnpj = modelValue.value.data.cnpj.replace(/\D/g, '');
        modelValue.value.data.cnpj = modelValue.value.data.cnpj.replace(/(\d{2})(\d)/, '$1.$2');
        modelValue.value.data.cnpj = modelValue.value.data.cnpj.replace(/(\d{3})(\d)/, '$1.$2');
        modelValue.value.data.cnpj = modelValue.value.data.cnpj.replace(/(\d{3})(\d)/, '$1/$2');
        modelValue.value.data.cnpj = modelValue.value.data.cnpj.replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }

    function togglePasswordVisibility() {
        passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
    }

    function validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(modelValue.value.data.email)) {
            modelValue.value.validate.emailError = 'Por favor, insira um endereço de email válido.';
        } else {
            modelValue.value.validate.emailError = '';
        }
    }



    return {
        passwordFieldType,
        togglePasswordVisibility,
        validateCpf,
        applyCpfMask,
        validateCnpj,
        applyCnpjMask,
        validateEmail,
        currentStep
    };
}

export { useFormData };
