<script setup lang="ts">
import { useCssModule } from 'vue';
import { RouterLink } from 'vue-router';
import { useQuery } from '#composables/useQuery';
import { productHttpClient } from '#modules/product/services/ProductHttpClient';
import { PageLoader } from '#components/Page/PageLoader.vue';
import { PageContent } from '#components/Page/PageContent.vue';
import { PageHeader } from '#components/Page/PageHeader.vue';

const classes = useCssModule();

const { data, isLoading, error } = useQuery({ fn: productHttpClient.getList });
</script>

<template>
  <PageLoader :is-loading :data :error>
    <template #default="{ data: list }">
      <PageHeader title="Product list">
        <RouterLink to="/product/new">Create product</RouterLink>
      </PageHeader>

      <PageContent>
        <ul :class="classes.list">
          <li v-for="item of list" :key="item.id">
            <RouterLink :class="classes.listItem" :to="`/product/${item.id}`">
              {{ item.name }}
            </RouterLink>
          </li>
        </ul>
      </PageContent>
    </template>
  </PageLoader>
</template>

<style module>
.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
}

.list-item {
  display: flex;
  background-color: var(--color-background-mute);
  padding: 10px;
  overflow-wrap: anywhere;
}
</style>
