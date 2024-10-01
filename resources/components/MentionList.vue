<template>
    <div class="dropdown-menu bg-white shadow-sm p-0 border max-h-[200px] overflow-y-scroll">
        <template v-if=" items.length ">
            <button class="p-1" :class=" { '!bg-slate-100': index === selectedIndex } " v-for="( item, index) in items" :key=" index "
                @click="selectItem( index )">
                {{ item.name }}
            </button>
        </template>
        <div class="item" v-else>
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
    mounted ()
    {

    },

    data ()
    {
        return {
            selectedIndex: 0,
        };
    },

    watch: {
        items ()
        {
            this.selectedIndex = 0;
        },
    },

    methods: {
        onKeyDown ( { event } )
        {
            console.log(event.key)
            if ( event.key === 'ArrowUp' )
            {
                this.upHandler();
                return true;
            }

            if ( event.key === 'ArrowDown' )
            {
                console.log('OnKeyDown')
                this.downHandler();
                return true;
            }

            if ( event.key === 'Enter' )
            {
                this.enterHandler();
                return true;
            }

            return false;
        },

        upHandler ()
        {
            this.selectedIndex = ( ( this.selectedIndex + this.items.length ) - 1 ) % this.items.length;
        },

        downHandler ()
        {
            this.selectedIndex = ( this.selectedIndex + 1 ) % this.items.length;
        },

        enterHandler ()
        {
            this.selectItem( this.selectedIndex );
        },

        selectItem ( index )
        {
            console.log('select item', index, this.selectedIndex)
            const item = this.items[ index ];

            if ( item )
            {
                console.log(this.command)
                this.command( { id: item.id, label: item.name } );
            }
        },
    },
};
</script>

<style lang="scss">
/* Dropdown menu */
.dropdown-menu {
    background: var(--white);
    border: 1px solid var(--gray-1);
    border-radius: 0.7rem;
    box-shadow: var(--shadow);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: auto;
    padding: 0.4rem;
    position: relative;

    button {
        align-items: center;
        background-color: transparent;
        display: flex;
        gap: 0.25rem;
        text-align: left;
        width: 100%;

        &:hover,
        &:hover.is-selected {
            background-color: var(--gray-3);
        }

        &.is-selected {
            background-color: var(--gray-2);
        }
    }
}
</style>
