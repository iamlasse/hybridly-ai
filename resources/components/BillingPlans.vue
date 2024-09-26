<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
</script>

<template>
    <div class="flex flex-col items-center space-y-4">
        <div class="flex gap-4 p-6">
            <Card class="">
                <CardHeader>
                    <CardTitle>Usage Metrics</CardTitle>
                    <CardDescription>Current Plan: Free Plan</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Logs Used</span>
                            <span>500/1000</span>
                        </div>
                        <Progress :model-value=" 50 " class="w-full" color="" />
                    </div>
                </CardContent>
            </Card>
            <Card class="">
                <CardHeader>
                    <CardTitle>Usage Metrics</CardTitle>
                    <CardDescription>Current Plan: Free Plan</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Logs Used</span>
                            <span>500/1000</span>
                        </div>
                        <Progress :model-value=" 50 " class="w-full" color="" />
                    </div>
                </CardContent>
            </Card>
            <Card class="">
                <CardHeader>
                    <CardTitle>Usage Metrics</CardTitle>
                    <CardDescription>Current Plan: Free Plan</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Logs Used</span>
                            <span>500/1000</span>
                        </div>
                        <Progress :model-value=" 50 " class="w-full" color="" />
                    </div>
                </CardContent>
            </Card>
            <Card class="">
                <CardHeader>
                    <CardTitle>Usage Metrics</CardTitle>
                    <CardDescription>Current Plan: Free Plan</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span>Logs Used</span>
                            <span>500/1000</span>
                        </div>
                        <Progress :model-value=" 50 " class="w-full" color="" />
                    </div>
                </CardContent>
            </Card>
        </div>

        <Card class="w-full">
            <CardHeader>
                <CardTitle>Upgrade Plan</CardTitle>
                <CardDescription>Choose a plan that fits your needs</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="flex space-x-4">
                    <Card class="w-1/3">
                        <CardHeader>
                            <Avatar class="mb-2" src="/images/placeholder.svg" alt="Hobbyist Plan" width={300}
                                height={200} />
                            <CardTitle>Hobbyist</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tooltip content="Logs: 10,000">
                                <p>Logs: 10,000</p>
                            </Tooltip>
                            <Tooltip content="Seats: 2">
                                <p>Seats: 2</p>
                            </Tooltip>
                            <Tooltip content="Price: $5/month (billed yearly)">
                                <p>Price: $5/month (billed yearly)</p>
                            </Tooltip>
                        </CardContent>
                        <CardFooter>
                            <Button>Select Plan</Button>
                        </CardFooter>
                    </Card>
                    <Card class="w-1/3">
                        <CardHeader>
                            <Avatar class="mb-2" src="/images/placeholder.svg" alt="Startup Plan" width={300}
                                height={200} />
                            <CardTitle>Startup <Badge>Popular</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tooltip content="Logs: 50,000">
                                <p>Logs: 50,000</p>
                            </Tooltip>
                            <Tooltip content="Seats: 5">
                                <p>Seats: 5</p>
                            </Tooltip>
                            <Tooltip content="Price: $15/month (billed yearly)">
                                <p>Price: $15/month (billed yearly)</p>
                            </Tooltip>
                        </CardContent>
                        <CardFooter>
                            <Button>Select Plan</Button>
                        </CardFooter>
                    </Card>
                    <Card class="w-1/3">
                        <CardHeader>
                            <Avatar class="mb-2" src="/images/placeholder.svg" alt="Professional Plan" width={300}
                                height={200} />
                            <CardTitle>Professional</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tooltip content="Logs: 200,000">
                                <p>Logs: 200,000</p>
                            </Tooltip>
                            <Tooltip content="Seats: 10">
                                <p>Seats: 10</p>
                            </Tooltip>
                            <Tooltip content="Price: $30/month (billed yearly)">
                                <p>Price: $30/month (billed yearly)</p>
                            </Tooltip>
                        </CardContent>
                        <CardFooter>
                            <Button>Select Plan</Button>
                        </CardFooter>
                    </Card>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
