declare namespace App.Data {
export type ProjectData = {
id: number | null;
name: string;
description: string | null;
slug: string | null;
status: string | null;
user: App.Data.UserData | null;
stages: any | null;
collaborators: any | null;
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
};
export type UserData = {
id: number | null;
name: string;
email: string;
email_verified_at: string | null;
};
}
