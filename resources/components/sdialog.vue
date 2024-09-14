<script setup lang="ts">
import
    {
        Sheet,
        SheetClose,
        SheetContent,
        SheetDescription,
        SheetFooter,
        SheetHeader,
        SheetTitle,
        SheetTrigger,
    } from '@/components/ui/sheet'
    const { show, close, unmount } = useDialog()

const handleAfterLeave = () =>
{
    console.log( 'after leave' )
    unmount()
}
</script>

<template>
    <Sheet v-model:open="show" @update:open="close">
        <SheetContent class="p-0" @interact-outside=" close " @escape-key-down=" close " @pointer-down-outside=" close "
            @after-leave=" handleAfterLeave ">
            <!-- <SheetHeader>
                <SheetTitle>
                    <slot name="title" />
                </SheetTitle>
                <SheetDescription>
                    <slot name="description" />
                </SheetDescription>
            </SheetHeader> -->
            <slot :close=" close " />
            <!-- <SheetFooter>
                <SheetClose as-child>
                    <Button type="submit">
                        Save changes
                    </Button>
                </SheetClose>
            </SheetFooter> -->
        </SheetContent>
    </Sheet>
</template>
