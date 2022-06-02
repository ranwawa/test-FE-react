<template>
  <div>
    <Form
      ref="formRef"
      layout="inline"
      :model="formState"
      :rules="rules"
      @finish="handleSubmit"
    >
      <FormItem has-feedback label="用户名" name="name">
        <Input v-model:value="formState.name" @input="clearValidate('name')" />
      </FormItem>
      <FormItem has-feedback label="密码" name="password">
        <InputPassword
          v-model:value="formState.password"
          @input="clearValidate('password')"
        />
      </FormItem>
      <FormItem label="记住密码" name="remember">
        <Checkbox
          v-model:checked="formState.remember"
          type="checkbox"
        ></Checkbox>
      </FormItem>
      <FormItem>
        <Button html-type="submit" type="primary" block> 确定 </Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  Checkbox,
} from 'ant-design-vue';
import { useUser } from '../store';
import { REG_MOBILE, REG_PASSWORD } from '../utils';

const user = useUser();
const formRef = ref();
const formState = reactive({
  name: user.name,
  password: user.password,
  remember: false,
});
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    {
      pattern: REG_MOBILE,
      message: '用户名必须是手机号',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      pattern: REG_PASSWORD,
      message: '密码必须是6到16位字符',
      trigger: 'blur',
    },
  ],
};
const router = useRouter();

const handleSubmit = (e) => {
  if (e.remember) {
    localStorage.setItem('name', e.name);
    localStorage.setItem('password', e.password);

    user.$reset();
  }
};

const clearValidate = (field) => {
  formRef.value.clearValidate(field);
};

onMounted(() => {
  router.push('./profile');
});
</script>
