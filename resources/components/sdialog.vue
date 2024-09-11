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

</script>

<template>
    <Sheet v-model:open="show">
        <SheetContent class="p-0">
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
