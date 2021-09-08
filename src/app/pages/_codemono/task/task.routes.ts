import { Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskComponent } from './task.component';

export const TaskRoutes: Routes = [
    {
        path: '',
        component: TaskComponent,
        children: [
            {
                path: 'kaban-board',
                component: KanbanBoardComponent,
            },
            {
                path: 'create-task',
                component: CreateTaskComponent,
            }
        ],
    }
];
