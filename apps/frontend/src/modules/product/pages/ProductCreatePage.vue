<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { PageHeader } from '#components/Page/PageHeader.vue';
import { PageContent } from '#components/Page/PageContent.vue';
import { ProductCardModification } from '../components/ProductCardModification.vue';
import { productHttpClient } from '../services/ProductHttpClient';
import { useMutation } from '#composables/useMutation';
import type { ProductRequestDto } from '#shared-types/product';

const router = useRouter();

const product = reactive<ProductRequestDto>({
  name: '',
  url: '',
  cron: '',
  jobStatus: 'run',
});

const { mutate: createProduct, isLoading: isLoadingCreateProduct } =
  useMutation({
    fn: productHttpClient.create,
    onSuccess: router.back,
  });
</script>

<template>
  <PageHeader title="Create Product" />

  <PageContent>
    <ProductCardModification
      :product
      :is-loading="isLoadingCreateProduct"
      @save="createProduct"
    />
  </PageContent>
</template>
