import { initializeHybridly } from 'virtual:hybridly/config';
import { createHead } from '@unhead/vue';
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaTasks, OiCommentDiscussion } from "oh-vue-icons/icons";
import './tailwind.css';
addIcons(FaTasks, OiCommentDiscussion);
initializeHybridly({
    devtools: true,
    viewTransition: false,
    enhanceVue: (vue) => {
        const head = createHead();
        head.push({
            titleTemplate: (title) => title ? `${title} — Hybridly` : 'Hybridly',
        });
        vue
            .use(head)
            .component('VIcon', OhVueIcon);
    },
});
//# sourceMappingURL=main.js.map