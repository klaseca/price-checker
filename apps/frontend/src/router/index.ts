import { createRouter, createWebHistory } from 'vue-router';
import { ProductListPage } from '#modules/product/pages/ProductListPage.vue';
import { ProductViewPage } from '#modules/product/pages/ProductViewPage.vue';
import { ProductCreatePage } from '#modules/product/pages/ProductCreatePage.vue';
import { ApiKeyPage } from '#modules/identity/pages/ApiKeyPage.vue';
import { apiKeyService } from '#modules/identity/services/ApiKeyService';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/identity',
      component: ApiKeyPage,
    },
    {
      path: '/',
      redirect: '/product',
    },
    {
      path: '/product',
      component: ProductListPage,
    },
    {
      path: '/product/new',
      component: ProductCreatePage,
    },
    {
      path: '/product/:id(\\d+)',
      component: ProductViewPage,
      props: (route) => ({
        id: Number(route.params.id),
      }),
    },
  ],
});

router.beforeEach(async (to) => {
  if (!apiKeyService.isAuthorized && to.path !== '/identity') {
    return { path: '/identity' };
  }
});
