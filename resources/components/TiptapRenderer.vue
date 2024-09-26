<template>
  <div class="tiptap-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { generateHTML } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Mention from '@tiptap/extension-mention';
import { Badge } from '@/components/ui/badge';

const $props = defineProps<{
  content: any;
}>();

const renderedContent = computed( () =>
{
    if ( !$props.content ) return '';
    const descriptionObj = JSON.parse( $props.content );
    console.log(descriptionObj)
    return generateHTML( descriptionObj, [
        StarterKit,
            Underline,
            TextAlign.configure({
              types: ['heading', 'paragraph'],
            }),
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            TextStyle.configure({ types: [ListItem.name] }),
            Mention.configure({
              HTMLAttributes: {
                class: 'text-indigo-800 bg-indigo-100 p-1 rounded mr-1 text-sm',
                },
                renderHTML({ options, node, ...rest }) {
                    console.log('render option: ', node.attrs, node, rest)
                    return [
                        'a',
                        Object.assign({ href: route('dashboard') }, options.HTMLAttributes),
                        `${node.attrs.label ?? node.attrs.id} `,
                    ];
                },
                renderText({ options, node, ...rest }) {
                    return `${node.attrs.label ?? node.attrs.id} `;
                }
            }),
     ] );
} );
</script>

<style scoped>
.tiptap-content :deep(*) {
  margin-bottom: 0.5em;
}

.tiptap-content :deep(ul), .tiptap-content :deep(ol) {
  padding-left: 1em;
}

.tiptap-content :deep(.mention) {
  color: #4a5568;
  background-color: #e2e8f0;
  border-radius: 0.25rem;
  padding: 0.125rem 0.25rem;
  font-weight: 500;
  text-decoration: none;
}
</style>

