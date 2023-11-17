<script setup lang="ts">
import type {Ref} from "vue";

interface Appeal {
  title: string
  body: string
}

const model: Ref<Appeal> = useState("appeal", () => {
  return {
    title: "",
    body: ""
  }
});

const sendAppeal = async () => {
  console.log(model.value.title, model.value.body)
  const {data, refresh, pending} = await useFetch("localhost:5000/appeals", {
    method: "POST",
    retry: false,
    body: JSON.stringify(model.value),
    server: false
  });
  console.log(data.value, pending.value);
}
</script>

<template>
  <ClientOnly>
    <UContainer class="pt-2">
      <h1 class="text-3xl text-center mb-5">Обращения граждан!</h1>
      <UForm class="flex flex-col justify-center items-center p-4" :state="model">
        <UFormGroup label="Тема обращения" class="w-full">
          <UInput v-model="model.title"/>
        </UFormGroup>

        <UFormGroup label="Ваше обращение" class="w-full mt-3">
          <UTextarea autoresize v-model="model.body"/>
        </UFormGroup>
        <UButton class="flex justify-center mt-3" @click.prevent="sendAppeal">Отправить</UButton>
      </UForm>
    </UContainer>
  </ClientOnly>
</template>

<style scoped>
</style>
