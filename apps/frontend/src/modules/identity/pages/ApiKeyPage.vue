<script setup lang="ts">
import { FormInput } from '#components/Form/FormInput.vue';
import { PageContent } from '#components/Page/PageContent.vue';
import { PageHeader } from '#components/Page/PageHeader.vue';
import { useMutation } from '#composables/useMutation';
import { ref } from 'vue';
import { identityHttpClient } from '../services/IdentityHttpClient';
import { PageLoader } from '#components/Page/PageLoader.vue';
import { apiKeyService } from '../services/ApiKeyService';
import { useRouter } from 'vue-router';

const router = useRouter();

const apiKey = ref('');

const { mutate: checkApiKey, isLoading: isLoadingCheckApiKey } = useMutation({
  fn: identityHttpClient.checkApiKey,
  onSuccess: () => {
    apiKeyService.authorize(apiKey.value);
    router.replace('/');
  },
});
</script>

<template>
  <PageLoader :is-loading="isLoadingCheckApiKey" data="" :error="undefined">
    <PageHeader title="Enter api key" />

    <PageContent>
      <form @submit.prevent="() => checkApiKey({ apiKey })">
        <FormInput
          v-model="apiKey"
          name="api-key"
          label="Api key"
          is-required
        />

        <button type="submit">Check</button>
      </form>
    </PageContent>
  </PageLoader>
</template>
