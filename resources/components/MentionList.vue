<template>
  <div class="mention-list">
    <button
      v-for="item in props.items"
      :key="item.id"
      class="mention-list__item"
      :class="{ 'mention-list__item--selected': props.selected === item }"
      @click="selectItem(item)"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps(['items', 'command', 'selected']);

const selectItem = (item: any) => {
  props.command({ id: item.id, label: item.name });
};
</script>

<style scoped>
.mention-list {
  padding: 0.2rem;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0px 10px 20px rgba(0, 0, 0, 0.1);
}

.mention-list__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  cursor: pointer;
}

.mention-list__item:hover,
.mention-list__item--selected {
  background-color: #e2e8f0;
}
</style>

