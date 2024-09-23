declare namespace App.Data {
export type ProjectData = {
id: number;
name: string;
description: string | null;
slug: string;
status: string | null;
user: App.Data.UserData;
stages: any;
collaborators: any | null;
tasks_count: number | null;
tasks: Array<App.Data.TaskData> | null;
authorization: { addCollaborators: boolean; }
};
export type SecurityData = {
user: App.Data.UserData | null;
};
export type SharedData = {
security: App.Data.SecurityData;
};
export type TaskData = {
id: number | null;
title: string;
description: string | null;
slug: string | null;
status: string | null;
project: App.Data.ProjectData | null;
comments: any | null;
comments_count: number | null;
order: number;
};
export type UserData = {
id: number;
name: string;
email: string;
is_premium: boolean;
avatar: string | null;
activeSubscription: any | null;
email_verified_at: string | null;
};
}
