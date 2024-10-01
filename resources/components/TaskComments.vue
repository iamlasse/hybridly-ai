<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { Comment } from "@/types";
import { useForm } from "@inertiajs/vue3";
import { useToast } from "@/components/ui/toast/use-toast";
import CommentItem from "@/components/Comment.vue";
import TiptapEditor from "@/components/TiptapEditor.vue";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const props = defineProps<{
    task: App.Data.TaskData;
    comments: Comment[];
    users: App.Data.UserData[];
}>();

const emit = defineEmits<{
    (e: 'update:task', task: App.Data.TaskData): void;
}>();

const { toast } = useToast();
const flash = useProperty("flash");

watch(flash, (val: any) => {
    const { error = null, success = null, warning = null, info = null } = val;
    if (error) {
        toast({
            title: "Error",
            description: error,
            variant: "destructive",
        });
    }

    if (success) {
        toast({
            title: "Success",
            description: success,
            variant: "success",
        });
    }
});

const commentForm = useForm({
    method: "POST",
    fields: {
        body: "",
        commentable_id: props.task.id,
        commentable_type: "task",
    },
});

const onSubmit = () => {
    commentForm.submitWith({
        transform: (fields) => ({
            ...fields,
            body: JSON.stringify(fields.body),
        }),
    });
};

onMounted(() => {
    document.addEventListener("click", hideContextMenu);
});

onUnmounted(() => {
    document.removeEventListener("click", hideContextMenu);
});

const hideContextMenu = () => {
    contextMenu.value.show = false;
};

const contextMenu = ref<{
    show: boolean;
    x: number;
    y: number;
    commentId: number | null;
}>({ show: false, x: 0, y: 0, commentId: null });

const showContextMenu = (event: MouseEvent, commentId: number | null) => {
    event.preventDefault();
    contextMenu.value = {
        show: true,
        x: event.clientX,
        y: event.clientY,
        commentId,
    };
};

</script>

<template>
    <div class="pb-4 bg-slate-100">
        <Tabs default-value="comments" class="w-full">
            <TabsList class="border-b border-b-slate-300 rounded-none w-full p-0">
                <TabsTrigger value="comments">Comments</TabsTrigger>
                <TabsTrigger value="activity">All Activity</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
                <section class="px-4">
                    <div class="flex items-start gap-2 mb-4">
                        <Avatar>
                            <AvatarImage v-if="props.task.user?.avatar" :src="props.task.user.avatar"
                                :alt="props.task.user?.name" />
                            <AvatarFallback v-else>
                                <v-icon name="bi-person-circle"></v-icon>
                            </AvatarFallback>
                        </Avatar>
                        <div class="flex gap-2">
                            <span class="text-slate-500 text-sm font-semibold">{{ props.task.user?.email || 'Unknown' }}</span>
                            <span class="text-sm ml-1 text-slate-600">created this task</span>
                        </div>
                    </div>
                    <CommentItem v-for="comment in props.comments" :key="comment.id" :comment="comment"
                        @contextmenu="showContextMenu($event, comment.id)"></CommentItem>
                </section>
            </TabsContent>
        </Tabs>
    </div>
    <div class="bg-slate-100 border-t pb-4 sticky bottom-0">
        <div class="p-2">
            <form @submit.prevent="onSubmit">
                <div class="flex flex-col gap-2 p-2">
                    <span class="text-sm font-semibold">Add Comment</span>
                    <TiptapEditor :users="props.users" class="border-0 w-full" type="text" name="body"
                        v-model="commentForm.fields.body">
                        <template #default="{ content }">
                            <div>
                                <Button size="sm" :disabled="!content" type="submit">Comment</Button>
                            </div>
                        </template>
                    </TiptapEditor>
                </div>
            </form>
        </div>
    </div>
</template>
