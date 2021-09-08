import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { TaskRoutes } from './task.routes';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from './task.component';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { CreateTaskComponent } from './create-task/create-task.component';

@NgModule({
  declarations: [TaskComponent, KanbanBoardComponent, CreateTaskComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    RouterModule.forChild(TaskRoutes),
    NgbModule
  ],
  bootstrap: [TaskComponent],
})
export class TaskModule { }
