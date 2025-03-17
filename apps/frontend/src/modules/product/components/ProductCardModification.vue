<script setup lang="ts">
import { computed, ref, toRaw, useCssModule, watch } from 'vue';
import { FormInput } from '#components/Form/FormInput.vue';
import { FormSelect } from '#components/Form/FormSelect.vue';
import { BaseLoader } from '#components/Loader/BaseLoader.vue';
import type { ProductRequestDto } from '#shared-types/product';

const { product: productProp, isLoading } = defineProps<{
  product: ProductRequestDto;
  isLoading: boolean;
}>();

const emit = defineEmits<{ save: [product: ProductRequestDto] }>();

const classes = useCssModule();

const product = ref(structuredClone(toRaw(productProp)));

const submitButtonText = computed(() => (productProp.id ? 'Save' : 'Create'));

watch(
  () => productProp,
  (newProduct) => {
    product.value = structuredClone(toRaw(newProduct));
  },
);
</script>

<template>
  <div :class="classes.card">
    <form
      :class="classes.cardBody"
      @submit.prevent="() => emit('save', product)"
    >
      <div :class="classes.content">
        <FormInput
          label="Name"
          name="name"
          v-model="product.name"
          is-required
        />

        <FormInput
          label="URL"
          name="url"
          v-model="product.url"
          is-required
          pattern="https?:\/\/(www\.)?[\-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9\(\)]{1,6}\b([\-a-zA-Z0-9\(\)!@:%_\+.~#?&\/\/=]*)"
        />

        <FormSelect
          label="Job Status"
          name="jobStatus"
          v-model="product.jobStatus"
          :options="['', 'run', 'stop'].map((it) => ({ label: it, value: it }))"
          is-required
        />

        <FormInput
          label="Cron"
          name="cron"
          v-model="product.cron"
          is-required
          pattern="(((\d+,)+\d+|([\d\*]+(\/|-)\d+)|\d+|\*) ?){5}"
        />
      </div>

      <footer :class="classes.footer">
        <button type="submit">{{ submitButtonText }}</button>

        <slot></slot>
      </footer>
    </form>

    <BaseLoader :is-loading />
  </div>
</template>

<style module>
.card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--color-background-mute);
  contain: content;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 10px;
}

.footer {
  display: flex;
  gap: 10px;
}
</style>
