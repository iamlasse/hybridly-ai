<script setup lang="ts">
import { Editor, EditorContent, VueRenderer, FloatingMenu, BubbleMenu } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { ref, watch, onMounted, onBeforeUnmount, computed, h, render } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { isString } from '@vue/shared';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Mention from '@tiptap/extension-mention';
import { FontBoldIcon, FontItalicIcon } from '@radix-icons/vue';
import { Button } from '@/components/ui/button';
import { Toggle } from "@/components/ui/toggle";

import MentionList from '@/components/MentionList.vue';

import tippy from 'tippy.js';
// Add this function to handle mentions
import suggestion from '@/suggestion';

const modelValue = defineModel();

const $props = defineProps<{
    users: App.Data.UserData[]
}>()

const emit = defineEmits<{
    ( e: 'update:modelValue', value: any ): void;
}>();


const editor = ref<Editor | null>( null );

const parseContent = ( content: any ) =>
{
    if ( !content ) return {};
    if ( isString( content ) )
    {
        try
        {
            return JSON.parse( content );
        } catch ( e )
        {
            console.error( 'Failed to parse editor content:', e );
            return {};
        }
    }
    return content;
};


const fetchUsers = async ( query ) =>
{
    // TODO: Replace this with an actual API call

    return $props.users?.filter( user => user.name.toLowerCase().includes( query.toLowerCase() ) );
};


const debouncedUpdate = useDebounceFn( ( editor: Editor ) =>
{
    emit( 'update:modelValue', editor.getJSON() );
}, 10 ); // Adjust the delay (in milliseconds) as needed

const initEditor = () =>
{
    editor.value = new Editor( {
        extensions: [
            Color.configure( { types: [ TextStyle.name, ListItem.name ] } ),
            TextStyle.configure( { types: [ ListItem.name ] } ),
            Underline.configure( {
                HTMLAttributes: {
                    class: 'text-underline',
                },
            } ),
            TextAlign.configure( {
                types: [ 'heading', 'paragraph' ],
            } ),
            StarterKit,
            Mention.configure( {
                deleteTriggerWithBackspace: true,
                HTMLAttributes: {
                    class: 'text-indigo-800 bg-indigo-100 p-1 rounded-md text-sm',
                },
                renderHTML ( { options, node, ...rest } )
                {
                    return [
                        'a',
                        Object.assign( { href: route( 'dashboard' )}, options.HTMLAttributes ),
                        `${ options.suggestion.char }${ node.attrs.label ?? node.attrs.id }`,
                    ]
                },
                suggestion: suggestion( fetchUsers )

            } ),
        ],
        content: parseContent( modelValue.value ),
        onUpdate: ( { editor } ) =>
        {
            debouncedUpdate( editor );
        },
    } );
};

onMounted( () =>
{
    initEditor();
} );

onBeforeUnmount( () =>
{
    editor.value?.destroy();
} );

watch( () => modelValue.value, ( newValue ) =>
{
    const parsedValue = parseContent( newValue );
    const isSame = JSON.stringify( editor.value?.getJSON() ) === JSON.stringify( parsedValue );
    if ( editor.value && !isSame )
    {
        editor.value.commands.setContent( parsedValue, false );
    }
} );

const toggleBold = () => editor.value?.chain().focus().toggleBold().run();
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run();
const toggleUnderline = () => editor.value?.chain().focus().toggleUnderline().run();
</script>

<template>
    <div v-if=" editor " class="tiptap-editor border rounded-md overflow-hidden">
        <bubble-menu class="bubble-menu flex gap-1 bg-white" :tippy-options=" { duration: 100, placement: 'top' } "
            :editor=" editor ">
            <Toggle size="xs" :pressed=" editor.isActive( 'bold' ) " @click="editor.chain().focus().toggleBold().run()"
                :disabled=" !editor.can().chain().focus().toggleBold().run() ">
                <FontBoldIcon />
            </Toggle>
            <Toggle size="xs" :pressed=" editor.isActive( 'italics' ) "
                @click="editor.chain().focus().toggleItalic().run()"
                :disabled=" !editor.can().chain().focus().toggleItalic().run() ">
                <FontItalicIcon />
            </Toggle>
            <Toggle size="xs" :pressed=" editor.isActive( 'underline' ) "
                @click="editor.chain().focus().toggleUnderline().run()"
                :disabled=" !editor.can().chain().focus().toggleUnderline().run() ">
                U
            </Toggle>
            <Toggle size="xs" :pressed=" editor.isActive( 'heading', { level: 1 } ) "
                @click="editor.chain().focus().toggleHeading( { level: 1 } ).run()">
                H1
            </Toggle>
            <Toggle size="xs" :pressed=" editor.isActive( 'heading', { level: 2 } ) "
                @click="editor.chain().focus().toggleHeading( { level: 2 } ).run()">
                H2
            </Toggle>
            <Toggle size="xs" :pressed=" editor.isActive( 'bulletList' ) "
                @click="editor.chain().focus().toggleBulletList().run()">
                UL
            </Toggle>
            <Toggle size="xs" :pressed=" editor.isActive( 'orderedList' ) "
                @click="editor.chain().focus().toggleOrderedList().run()">
                OL
            </Toggle>
            <Toggle size="xs" @click="editor.chain().focus().undo().run()"
                :disabled=" !editor.can().chain().focus().undo().run() ">
                <v-icon name="bi-arrow-counterclockwise" scale="0.8" />
            </Toggle>
            <Toggle size="xs" @click="editor.chain().focus().redo().run()"
                :disabled=" !editor.can().chain().focus().redo().run() ">
                <v-icon name="bi-arrow-clockwise" scale="0.8" />
            </Toggle>
        </bubble-menu>

        <floating-menu :editor=" editor " :tippy-options=" { duration: 100 } " v-if=" editor ">
            <div class="floating-menu bg-slate-50 p-1">
                <Toggle size="xs" @click="editor.chain().focus().toggleBold( ).run()"
                    :class=" { 'is-active': editor.isActive( 'bold' ) } ">
                    <FontBoldIcon />
                </Toggle>
                <Toggle size="xs" @click="editor.chain().focus().toggleItalic( ).run()"
                    :class=" { 'is-active': editor.isActive( 'italic' ) } ">
                    <FontItalicIcon />
                </Toggle>
                <Toggle size="xs" :pressed=" editor.isActive( 'underline' ) "
                    @click="editor.chain().focus().toggleUnderline().run()"
                    :disabled=" !editor.can().chain().focus().toggleUnderline().run() ">
                    U
                </Toggle>
                <Toggle size="xs" @click="editor.chain().focus().toggleHeading( { level: 1 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 1 } ) } ">
                    H1
                </Toggle>
                <Toggle size="xs" @click="editor.chain().focus().toggleHeading( { level: 2 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 2 } ) } ">
                    H2
                </Toggle>
                <Toggle size="xs" @click="editor.chain().focus().toggleBulletList().run()"
                    :class=" { 'is-active': editor.isActive( 'bulletList' ) } ">
                    Bullet list
                </Toggle>
            </div>
        </floating-menu>
        <editor-content :editor=" editor " class="p-0 min-h-[150px]" />
        <div class="editor-menu flex justify-end">
            <div class="justify-self-end">
                <slot :content=" editor.getText() "></slot>
            </div>
        </div>
    </div>
</template>

<style>
.editor-wrapper {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    overflow: hidden;
}

.editor-toolbar {
    display: flex;
    padding: 0.5rem;
    background-color: #f3f4f6;
    border-bottom: 1px solid #ccc;
}

.editor-toolbar button {
    margin-right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    cursor: pointer;
}

.editor-toolbar button.is-active {
    background-color: #e5e7eb;
}

.ProseMirror {
    padding: 1rem;
    min-height: 100px;
}

.ProseMirror:focus {
    outline: none;
}
</style>

<style>
.mention {
    background-color: #e2e8f0;
    border-radius: 0.25rem;
    padding: 0.125rem 0.25rem;
    font-weight: 500;
    color: #4a5568;
}

.mentions-container {
    position: absolute;
    z-index: 10;
}

.mentions-menu {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.mention-item {
    display: block;
    padding: 0.5rem;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
}

.mention-item:hover {
    background-color: #f7fafc;
}
</style>

<style lang="scss">
/* Basic editor styles */
.tiptap {
    :first-child {
        margin-top: 0;
    }

    /* List styles */
    ul,
    ol {
        padding: 0 1rem;
        margin: 1.25rem 1rem 1.25rem 0.4rem;

        li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
        }
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
        margin-top: 2.5rem;
        text-wrap: pretty;
    }

    h1,
    h2 {
        margin-top: 3.5rem;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.4rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    h3 {
        font-size: 1.1rem;
    }

    h4,
    h5,
    h6 {
        font-size: 1rem;
    }

    /* Code and preformatted text styles */
    code {
        background-color: var(--purple-light);
        border-radius: 0.4rem;
        color: var(--black);
        font-size: 0.85rem;
        padding: 0.25em 0.3em;
    }

    pre {
        background: var(--black);
        border-radius: 0.5rem;
        color: var(--white);
        font-family: 'JetBrainsMono', monospace;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;

        code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
        }
    }

    blockquote {
        border-left: 3px solid var(--gray-3);
        margin: 1.5rem 0;
        padding-left: 1rem;
    }

    hr {
        border: none;
        border-top: 1px solid var(--gray-2);
        margin: 2rem 0;
    }
}

/* Bubble menu */
.bubble-menu {
    background-color: var(--white, #fff);
    border: 0px solid var(--gray-1);
    border-radius: 0.7rem;
    box-shadow: var(--shadow);
    display: flex;
    padding: 0.5rem;

    button {
        background-color: unset;

        &:hover {
            background-color: var(--gray-3);
        }

        &.is-active {
            background-color: var(--purple);

            &:hover {
                background-color: var(--purple-contrast);
            }
        }
    }
}

/* Floating menu */
.floating-menu {
    display: flex;
    background-color: var(--gray-3, --white);
    padding: 0.1rem;
    border-radius: 0.5rem;

    button {
        background-color: unset;
        padding: 0.275rem 0.425rem;
        border-radius: 0.3rem;

        &:hover {
            background-color: var(--gray-3);
        }

        &.is-active {
            background-color: var(--white);
            color: var(--purple);

            &:hover {
                color: var(--purple-contrast);
            }
        }
    }
}

[data-tippy-root] {
    @pply bg-white shadow-md;
    max-height: 200px;
    overflow-y: scroll;
}

.tippy-box {
    max-height: 200px;
    overflow-y: scroll;
}

.tippy-content {
    @apply overflow-y-scroll;
    max-height: 200px;
}

.tippy-content .dropdown-menu {
    max-height: 200px;
    overflow-y: scroll;
    @apply p-0;
}

.tippy-content {
    .dropdown-menu {
        button {
        }
    }
}
</style>

