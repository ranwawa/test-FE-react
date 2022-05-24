<template>
  <div>
    <a-form :label-col="{ span: 3 }">
      <a-form-item label="用户名" name="name">
        <a-input v-model="name" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input-password v-model="name" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const age = ref(28);

    return { name: 'rww2', age };
  },
  data() {
    return { name2: 'ranwawa', password: '' };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
