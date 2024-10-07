declare namespace App.Data {
export type ProjectData = {
id: number;
name: string;
description: string | null;
slug: string;
status: string | null;
user: App.Data.UserData | null;
stages: any;
collaborators: any | null;
tasks_count: number | null;
tasks: any | null;
authorization: { addCollaborators: boolean; }
};
export type SecurityData = {
user: App.Data.UserData | null;
};
export type SharedData = {
security: App.Data.SecurityData;
};
export type SubscriptionData = {
id: string;
name: string | null;
description: string | null;
status: string | null;
created_at: string | null;
updated_at: string | null;
ends_at: string | null;
};
export type TaskData = {
id: number;
title: string;
description: string | null;
slug: string | null;
status: string | null;
created_by: App.Data.UserData | null;
due_date: any | string | null;
completed: boolean;
completed_at: any | null;
project: App.Data.ProjectData | null;
comments: any | null;
sub_tasks: any | null;
comments_count: number | null;
order: number;
assigned_to: App.Data.UserData | null;
dependencies?: Array<App.Data.TaskData>;
};
export type UserData = {
id: number;
name: string;
email: string;
is_premium: boolean;
avatar: string | null;
activeSubscription: App.Data.SubscriptionData | null;
email_verified_at: string | null;
};
}
