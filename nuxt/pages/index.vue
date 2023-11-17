<script lang="ts" setup>
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
  const {data, error, refresh, pending} = await useFetch("back:5000/appeal", {
    method: "POST",
    retry: false,
    body: JSON.stringify(model.value),
    server: false
  });
  console.log(data.value, error.value, pending.value);
}
</script>

<template>
  <ClientOnly>
    <UContainer class="pt-2">
      <h1 class="text-3xl text-center mb-5">Обращения граждан!</h1>
      <UForm :state="model" class="flex flex-col justify-center items-center p-4">
        <UFormGroup class="w-full" label="Тема обращения">
          <UInput v-model="model.title"/>
        </UFormGroup>

        <UFormGroup class="w-full mt-3" label="Ваше обращение">
          <UTextarea v-model="model.body" autoresize/>
        </UFormGroup>
        <UButton class="flex justify-center mt-3" @click.prevent="sendAppeal">Отправить</UButton>
      </UForm>
    </UContainer>
  </ClientOnly>
</template>

<style scoped>
</style>
