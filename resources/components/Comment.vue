<template>
    <div class="flex items-start gap-2">
        <!-- <img :src=" comment.user?.profile_photo_url " :alt=" comment.user?.name " class="w-12 h-12 rounded-full mr-4"> -->
        <Avatar>
            <AvatarImage :src=" comment.user?.profile_photo_url " :alt=" comment.user?.name " />
        </Avatar>
        <div class="flex-1">
            <div class="text-sm">
                <span class="font-bold">{{ comment.user.name }}</span>
                <span class="text-gray-600 ml-2">{{ comment.readable_created_time }}</span>
            </div>
            <!-- <div class="text-sm text-gray-600 line-clamp-2" v-html=" parsedBody "></div> -->
            <TiptapRenderer :content=" comment.body " />
        </div>
    </div>
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
import
    {
        Avatar,
        AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar'
// import TiptapRenderer from './TiptapRenderer.vue';

const $props = defineProps<{
  comment: {
    id: number;
    body: string;
    user: {
      name: string;
    };
    created_at: string;
  };
}>();

// const parsedBody = computed( () =>
// {
//     if ( !$props.comment.body ) return '';
//     const descriptionObj = JSON.parse(  $props.comment.body ) ;
//     console.log( descriptionObj )
//     // return ''
//     return generateHTML( descriptionObj, [
//         StarterKit,
//         Underline,
//         TextAlign.configure( {
//             types: [ 'heading', 'paragraph' ],
//         } ),
//         Color.configure( { types: [ TextStyle.name, ListItem.name ] } ),
//         TextStyle.configure( { types: [ ListItem.name ] } ),
//         Mention.configure( {
//             HTMLAttributes: {
//                 class: 'mention',
//             },
//         } ),
//      ] );
// } );

// const parsedContent = computed(() => {
//     try
//     {

//         const descriptionObj = JSON.parse( $props.comment.body );
//         return generateHTML( descriptionObj, [
//             StarterKit,
//             Mention.configure( {
//                 HTMLAttributes: {
//                     class: 'mention',
//                 },
//             } ),
//         ])
//   } catch (e) {
//     console.error('Failed to parse comment body:', e);
//     // return { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: props.comment.body }] }] };
//   }
// });

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

</script>
