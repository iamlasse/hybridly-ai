import { initializeHybridly } from 'virtual:hybridly/config';
import { createHead, useHead } from '@unhead/vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaTasks, OiCommentDiscussion, BiXLg, BiTrashFill, BiCheckCircle, BiCheckCircleFill, BiCircle } from "oh-vue-icons/icons";
import './tailwind.css';

addIcons( FaTasks, OiCommentDiscussion, BiXLg, BiTrashFill, BiCheckCircle, BiCheckCircleFill, BiCircle );
initializeHybridly( {
    devtools: true,
    viewTransition: false,
    enhanceVue: ( vue ) =>
    {
        const head = createHead();
        head.push( {
            titleTemplate: ( title ) => title ? `${ title } — Hybridly` : 'Hybridly',
        } );
        vue
            .use( head )
            .component( 'VIcon', OhVueIcon );
    },
} );
