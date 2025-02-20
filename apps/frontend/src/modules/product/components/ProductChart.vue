<script setup lang="ts">
import { useIsDarkColorScheme } from '#composables/useIsDarkColorScheme';
import type { ProductHistoryResponseDto } from '#shared-types/product';
import { DateBuilder } from '#utils/DateBuilder';
import type { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-vue3';
import { computed } from 'vue';

const { data = [] } = defineProps<{
  data: ProductHistoryResponseDto[] | undefined;
}>();

const isDark = useIsDarkColorScheme();

const chartOptions = computed<AgChartOptions>(() => ({
  data,
  background: {
    visible: false,
  },
  padding: { right: 40 },
  overlays: {
    unsupportedBrowser: { enabled: false },
  },
  theme: isDark.value ? 'ag-default-dark' : 'ag-default',
  series: [
    {
      type: 'area',
      xKey: 'checkedAt',
      yKey: 'price',
      marker: {
        enabled: true,
      },
      tooltip: {
        renderer: ({ datum, yKey }) => ({
          heading: datum[yKey],
          data: [],
        }),
      },
      interpolation: {
        type: 'smooth',
      },
      fillOpacity: 0.2,
      strokeWidth: 2,
    },
  ],
  axes: [
    {
      type: 'category',
      position: 'bottom',
      label: {
        formatter: ({ value }) => {
          const date = new DateBuilder(value);
          return `${date.toFormat('DD.MM.YYYY')}\n${date.toFormat('HH:mm:ss')}`;
        },
      },
    },
    {
      type: 'number',
      position: 'left',
      gridLine: {
        enabled: false,
      },
    },
  ],
}));
</script>

<template>
  <AgCharts :options="chartOptions" />
</template>
