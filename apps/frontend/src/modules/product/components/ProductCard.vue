<script setup lang="ts">
import { useCssModule } from 'vue';
import { DataList } from '#components/DataList/DataList.vue';
import { DataListItem } from '#components/DataList/DataListItem.vue';
import type { ProductResponseDto } from '#shared-types/product';

const { product } = defineProps<{ product: ProductResponseDto }>();

const classes = useCssModule();
</script>

<template>
  <div :class="classes.card">
    <div :class="classes.cardBody">
      <DataList>
        <DataListItem label="Name" :value="product.name" />

        <DataListItem label="URL">
          <a :href="product.url" target="_blank">{{ product.url }}</a>
        </DataListItem>

        <DataListItem label="id" :value="product.id" />

        <DataListItem label="Job Status" :value="product.jobStatus" />

        <DataListItem label="Cron" :value="product.cron" />
      </DataList>

      <footer :class="classes.footer">
        <slot></slot>
      </footer>
    </div>
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
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  display: flex;
  gap: 10px;
}
</style>
