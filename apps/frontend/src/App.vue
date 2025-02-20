<script setup lang="ts">
import { apiKeyService } from '#modules/identity/services/ApiKeyService';
import { httpClient } from '#services/httpClient/HttpClient';
import { useCssModule } from 'vue';
import { RouterView, useRouter } from 'vue-router';

const classes = useCssModule();

const router = useRouter();

if (apiKeyService.apiKey != null) {
  httpClient.apiKey = apiKeyService.apiKey;
}

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
