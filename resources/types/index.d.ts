export interface User
{
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type Project = {
    id: number;
    name: string;
    description: string;
    status: string;
    tasks_count: number;
    created_at: string;
    updated_at: string;
};

export interface Comment
{
    id: number;
    user: User;
    body: string;
    comment: string;
    readable_created_time: string;
    updated_at: string;
}

export type Task = {
    id: number;
    name: string;
    status: string;
    description: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    comments: Comment[];
    order: number;
};

export interface Stage
{
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}


export type Column = {
    id: number;
    order: number;
    tasks: Task[];
};
