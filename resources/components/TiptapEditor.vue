<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { isString } from '@vue/shared'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import {Button} from '@/components/ui/button'

const modelValue = defineModel()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const editor = ref<Editor | null>(null)

const parseContent = ( content: any ) =>
{
    if ( !content ) return {}
  if (isString(content)) {
    try {
      return JSON.parse(content)
    } catch (e) {
      console.error('Failed to parse editor content:', e)
      return {}
    }
  }
  return content
}

const debouncedUpdate = useDebounceFn((editor: Editor) => {
  emit('update:modelValue', editor.getJSON())
}, 10) // Adjust the delay (in milliseconds) as needed

const initEditor = () => {
  editor.value = new Editor({
    extensions: [
        Color.configure( { types: [ TextStyle.name, ListItem.name ] } ),
        TextStyle.configure( { types: [ ListItem.name ] } ),
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        StarterKit,
    ],
    content: parseContent(modelValue.value),
    onUpdate: ({ editor }) => {
      debouncedUpdate(editor)
    },
  })
}

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(() => modelValue.value, (newValue) => {
  const parsedValue = parseContent(newValue)
  const isSame = JSON.stringify(editor.value?.getJSON()) === JSON.stringify(parsedValue)
  if (editor.value && !isSame) {
    editor.value.commands.setContent(parsedValue, false)
  }
})

const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run()
const toggleUnderline = () => editor.value?.chain().focus().toggleUnderline().run()
</script>

<template>
    <div v-if=" editor " class="border p-2 rounded-md">
        <div class="control-group">
            <div class="flex gap-2 flex-wrap">
                <Button size="xs" class="text-xxs" :variant=" editor.isActive( 'bold' )  ? 'primary': 'secondary'"
                    @click="editor.chain().focus().toggleBold().run()"
                    :disabled=" !editor.can().chain().focus().toggleBold().run() ">
                    Bold
                </Button>
                <Button size="xs" class="text-xxs" :variant=" editor.isActive( 'italic' ) ? 'primary' : 'secondary' "
                    @click="editor.chain().focus().toggleItalic().run()"
                    :disabled=" !editor.can().chain().focus().toggleItalic().run() "
                    >
                    Italic
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().toggleStrike().run()"
                    :disabled=" !editor.can().chain().focus().toggleStrike().run() "
                    :class=" { 'bg-indigo-500 text-white': editor.isActive( 'strike' ) } ">
                    Strike
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().toggleCode().run()"
                    :disabled=" !editor.can().chain().focus().toggleCode().run() "
                    :class=" { 'bg-indigo-500 text-white': editor.isActive( 'code' ) } ">
                    Code
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().unsetAllMarks().run()">
                    CL
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().clearNodes().run()">
                    Clear nodes
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().setParagraph().run()"
                    :class=" { 'is-active': editor.isActive( 'paragraph' ) } ">
                    Paragraph
                </Button>
                <Button size="xs" variant="secondary"
                    @click="editor.chain().focus().toggleHeading( { level: 1 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 1 } ) } ">
                    H1
                </Button>
                <Button size="xs" variant="secondary"
                    @click="editor.chain().focus().toggleHeading( { level: 2 } ).run()"
                    :class=" { '!bg-green-500': editor.isActive( 'bold', { level: 2 } ) } ">
                    H2
                </Button>
                <Button size="xs" variant="secondary"
                    @click="editor.chain().focus().toggleHeading( { level: 3 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 3 } ) } ">
                    H3
                </Button>
                <Button size="xs" variant="secondary"
                    @click="editor.chain().focus().toggleHeading( { level: 4 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 4 } ) } ">
                    H4
                </Button>
                <Button size="xs" variant="secondary"
                    @click="editor.chain().focus().toggleHeading( { level: 5 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 5 } ) } ">
                    H5
                </Button>
                <Button size="xs" variant="secondary"
                    @click="editor.chain().focus().toggleHeading( { level: 6 } ).run()"
                    :class=" { 'is-active': editor.isActive( 'heading', { level: 6 } ) } ">
                    H6
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().toggleBulletList().run()"
                    :class=" { 'is-active': editor.isActive( 'bulletList' ) } ">
                    Bullet list
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().toggleOrderedList().run()"
                    :class=" { 'bg-green-500': editor.isActive( 'orderedList' ) } ">
                    Ordered list
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().toggleCodeBlock().run()"
                    :class=" { 'is-active': editor.isActive( 'codeBlock' ) } ">
                    Code block
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().toggleBlockquote().run()"
                    :class=" { 'is-active': editor.isActive( 'blockquote' ) } ">
                    Blockquote
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().setHorizontalRule().run()">
                    Horizontal rule
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().setHardBreak().run()">
                    Hard break
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().undo().run()"
                    :disabled=" !editor.can().chain().focus().undo().run() ">
                    Undo
                </Button>
                <Button size="xs" variant="secondary" @click="editor.chain().focus().redo().run()"
                    :disabled=" !editor.can().chain().focus().redo().run() ">
                    Redo
                </Button>
            </div>
        </div>
        <editor-content :editor=" editor " />
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
</style>
