<script setup lang="ts">
import
    {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog'

const isOpen = defineModel( { default: false, required: true } );

const {show, close, unmount} = useDialog();

</script>

<template>
    <Dialog v-model:open="isOpen" @update:open="close">
        <DialogContent @interact-outside=" close " @escape-key-down=" close " @pointer-down-outside=" close ">
            <DialogHeader>
                <DialogTitle>
                    <slot name="title"/>
                </DialogTitle>
                <DialogDescription>
                    <slot name="description"/>
                </DialogDescription>
            </DialogHeader>
            <slot :close=" close " />
            <DialogFooter>
                <slot name="footer" />
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
.animate__animated.animate__slideInUp {
  --animate-duration: 0.3s;
}

.animate__animated.animate__slideOutDown {
  --animate-duration: 0.3s;
}
</style>
