<template>
    <div class="bg-white shadow-sm p-1 text-xs border flex flex-col items-start max-h-40 overflow-y-auto">
        <template v-if="items?.length">
            <button class="p-1 w-full" :class="{ '!bg-slate-100': index === selectedIndex }"
                v-for="(item, index) in items" :key="index" @click="selectItem(index)">
                {{ item.name }}
            </button>
        </template>
        <div class="item text-xs" v-else>
            No result
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },
    },
    mounted() {},

    data() {
        return {
            selectedIndex: 0,
        };
    },

    watch: {
        items() {
            this.selectedIndex = 0;
        },
    },

    methods: {
        onKeyDown({ event }) {
            if (event.key === 'ArrowUp') {
                this.upHandler();
                return true;
            }

            if (event.key === 'ArrowDown') {
                this.downHandler();
                return true;
            }

            if (event.key === 'Enter') {
                this.enterHandler();
                return true;
            }

            return false;
        },

        upHandler() {
            this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length;
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
        },

        enterHandler() {
            this.selectItem(this.selectedIndex);
        },

        selectItem(index) {
            const item = this.items[index];

            if (item) {
                this.command({ id: item.id, label: item.name });
            }
        },
    },
};
</script>

<style lang="scss">
/* Dropdown menu */
</style>
