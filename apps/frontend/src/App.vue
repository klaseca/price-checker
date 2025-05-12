<script setup lang="ts">
import { apiKeyContext } from '#modules/identity/contexts/apiKeyContext';
import { ApiKeyService } from '#modules/identity/services/ApiKeyService';
import { httpClient } from '#services/httpClient/HttpClient';
import { useCssModule } from 'vue';
import { RouterView, useRouter } from 'vue-router';

const classes = useCssModule();

const apiKeyService = new ApiKeyService(
  localStorage,
  (apiKey) => (httpClient.apiKey = apiKey),
);

apiKeyContext.provide(apiKeyService);

const router = useRouter();

router.beforeEach(async (to) => {
  if (!apiKeyService.isAuthorized && to.path !== '/identity') {
    return { path: '/identity' };
  }
});

httpClient.onUnauthorized = () => {
  apiKeyService.unauthorize();
  router.replace('/identity');
};
</script>

<template>
  <main :class="classes.main">
    <RouterView />
  </main>
</template>

<style module>
.main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
