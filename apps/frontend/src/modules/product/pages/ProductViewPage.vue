<script setup lang="ts">
import { computed, ref } from 'vue';
import { useQuery } from '#composables/useQuery';
import { productHttpClient } from '#modules/product/services/ProductHttpClient';
import { PageLoader } from '#components/Page/PageLoader.vue';
import { PageHeader } from '#components/Page/PageHeader.vue';
import { PageContent } from '#components/Page/PageContent.vue';
import { BaseDialog } from '#components/Dialog/BaseDialog.vue';
import { DialogButtons } from '#components/Dialog/DialogButtons.vue';
import { useToggle } from '#composables/useToggle';
import { ProductChart } from '../components/ProductChart.vue';
import { ProductCard } from '../components/ProductCard.vue';
import { ProductCardModification } from '../components/ProductCardModification.vue';
import { useMutation } from '#composables/useMutation';
import { useRouter } from 'vue-router';

const { id } = defineProps<{ id: number }>();

const router = useRouter();

const [isEdit, toggleIsEdit] = useToggle();

const {
  data: product,
  isLoading: isLoadingProduct,
  error: errorProduct,
  setData: setProduct,
} = useQuery({
  params: id,
  fn: ({ params }) => productHttpClient.get(params),
});

const { mutate: saveProduct, isLoading: isLoadingSaveProduct } = useMutation({
  fn: productHttpClient.update,
  onSuccess: (newData) => {
    setProduct(newData);
    toggleIsEdit(false);
  },
});

const { mutate: deleteProduct } = useMutation({
  fn: () => productHttpClient.delete(id),
  onSuccess: router.back,
});

const {
  data: productHistoryList,
  isLoading: isLoadingProductHistoryList,
  error: errorProductHistoryList,
  refetch: refetchProductHistoryList,
} = useQuery({
  params: id,
  fn: ({ params }) => productHttpClient.getHistoryList(params),
});

const { mutate: runParser } = useMutation({
  fn: () => productHttpClient.runParser(id),
  onSuccess: refetchProductHistoryList,
});

const data = computed(() =>
  product.value != null && productHistoryList.value != null
    ? { product: product.value, productHistoryList: productHistoryList.value }
    : null,
);

const isLoading = computed(() =>
  [isLoadingProduct.value, isLoadingProductHistoryList.value].includes(true),
);

const error = computed(
  () => errorProduct.value || errorProductHistoryList.value,
);

const isOpenDialog = ref(false);
</script>

<template>
  <PageLoader :is-loading :data :error>
    <template #default="{ data: { product: p } }">
      <PageHeader title="Product">
        <button @click="runParser">Run parser</button>

        <button @click="() => (isOpenDialog = true)">Delete</button>
      </PageHeader>

      <PageContent>
        <ProductChart :data="productHistoryList" />

        <ProductCardModification
          v-if="isEdit"
          :product="p"
          :is-loading="isLoadingSaveProduct"
          @save="saveProduct"
        >
          <button @click="() => toggleIsEdit(false)">Cancel</button>
        </ProductCardModification>

        <ProductCard v-else :product="p">
          <button @click="() => toggleIsEdit(true)">Edit</button>
        </ProductCard>
      </PageContent>
    </template>

    <template #fallback="{ error }">
      {{ error }}
    </template>
  </PageLoader>

  <BaseDialog v-model="isOpenDialog">
    <h2>Do you really want to remove the product?</h2>
    <p>Product history is also deleted</p>
    <DialogButtons
      :buttons="[
        { text: 'Ok', click: () => deleteProduct() },
        { text: 'Cancel', click: () => (isOpenDialog = false) },
      ]"
    />
  </BaseDialog>
</template>
