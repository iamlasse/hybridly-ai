<script setup lang="ts">
import
    {
        Sheet,
        SheetContent,
        SheetDescription,
        SheetHeader,
        SheetTitle,
} from '@/Components/ui/sheet';

defineProps<{
    open: boolean
}>()

const emit = defineEmits(['update:open'])
const handleOpenChange = ( open: boolean ) =>
{
    console.log( 'handleOpenChange', open )
    emit('update:open', open)
}
</script>

<template>
    <Sheet :open="open" @onOpenChange="handleOpenChange">
        <SheetContent side="right">
            <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    </Sheet>
</template>
