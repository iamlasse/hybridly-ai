<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';

const props = defineProps<{
    tasks: App.Data.TaskData[];
}>();

type GantBarConfig = {
    id: number;
    label: string;
    style: {
        borderRadius: string;
        background: string;
        color: string;
        fontSize: string;
    };
}

type GantBar = {
    id: string;
    label: string;
    startDate: Date;
    endDate: Date;
    ganttBarConfig?: GantBarConfig;
}

type GantBarTask =  {
    id: number;
    label: string;
    bars: GantBar[];
}

const gantChartTasks = ref<GantBarTask[]>( [] );

function transformTasksToRows ( tasks: App.Data.TaskData[] )
{
    return tasks.filter( ( task: App.Data.TaskData ) => task.due_date ).map( ( task: App.Data.TaskData ) => ( {
        id: task.id,
        label: task.title,
        bars: [ {
            id: `task-${ task.id }`,
            label: task.title,
            startDate: new Date( task.updated_at ),
            endDate: new Date( task.due_date ),
            ganttBarConfig: {
                // hasHandles: true,
                id: task.id,
                label: task.title,
                style: {
                    borderRadius: "10px",
                    background: getStatusColor( task.status ),
                    color: "black",
                    fontSize: '14px'
                },
            }

        } ],
    } ) );
}

function getStatusColor ( status: string | null )
{
    switch ( status )
    {
        case 'pending':
            return '#eeeeee';
        case 'in_progress':
            return '#4CAF50';
        case 'completed':
            return '#2196F3';
        default:
            return '#eeeeee';
    }
}

function onDragendBar ( bar: any, event: MouseEvent, movedBars: any )
{
    console.log( 'dragend', bar, event, movedBars );
}

onMounted( () =>
{
    gantChartTasks.value = transformTasksToRows( props.tasks );
} );

watch( () => props.tasks, ( newTasks ) =>
{
    gantChartTasks.value = transformTasksToRows( newTasks );
} );
</script>

<template>
    <div class="pb-12">
        <g-gantt-chart :chart-start=" startOfWeek( new Date(), { weekStartsOn: 1 } ) "
            :chart-end=" endOfWeek( new Date(), { weekStartsOn: 1 } ) " row-height="50" precision="day" grid
            bar-start="startDate" bar-end="endDate"
            @dragend-bar="onDragendBar( $event.bar, $event.e, $event.movedBars )">
            <g-gantt-row v-for="   row in gantChartTasks   " :key=" row.id " :label=" row.label " :bars=" row.bars " />
        </g-gantt-chart>
    </div>
</template>
