import { initializeHybridly } from 'virtual:hybridly/config';
import { createHead, useHead } from '@unhead/vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import './tailwind.css';
import { FaTasks, OiCommentDiscussion, BiXLg, BiTrashFill, BiCheckCircle, BiCheckCircleFill, BiCircle, BiArrowCounterclockwise, BiArrowClockwise, BiCheck, IoCloseCircleOutline, RiMoreFill, BiPlus, IoShareSocialOutline, CoFilter, IoCloseOutline } from "oh-vue-icons/icons";

addIcons( FaTasks, OiCommentDiscussion, BiXLg, BiTrashFill, BiCheckCircle, BiCheckCircleFill, BiCircle, BiArrowCounterclockwise, BiArrowClockwise, BiCheck, IoCloseCircleOutline, RiMoreFill, BiPlus, IoShareSocialOutline, CoFilter, IoCloseOutline );
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
