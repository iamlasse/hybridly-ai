<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { isString } from '@vue/shared'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'

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
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
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
const setTextAlignLeft = () => editor.value?.chain().focus().setTextAlign('left').run()
const setTextAlignCenter = () => editor.value?.chain().focus().setTextAlign('center').run()
const setTextAlignRight = () => editor.value?.chain().focus().setTextAlign('right').run()
</script>

<template>
  <div class="editor-wrapper">
    <div class="editor-toolbar">
      <button @click="toggleBold" :class="{ 'is-active': editor?.isActive('bold') }">
        Bold
      </button>
      <button @click="toggleItalic" :class="{ 'is-active': editor?.isActive('italic') }">
        Italic
      </button>
      <button @click="toggleUnderline" :class="{ 'is-active': editor?.isActive('underline') }">
        Underline
      </button>
      <button @click="setTextAlignLeft" :class="{ 'is-active': editor?.isActive({ textAlign: 'left' }) }">
        Left
      </button>
      <button @click="setTextAlignCenter" :class="{ 'is-active': editor?.isActive({ textAlign: 'center' }) }">
        Center
      </button>
      <button @click="setTextAlignRight" :class="{ 'is-active': editor?.isActive({ textAlign: 'right' }) }">
        Right
      </button>
    </div>
    <EditorContent :editor="editor" class="prose max-w-none" />
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

