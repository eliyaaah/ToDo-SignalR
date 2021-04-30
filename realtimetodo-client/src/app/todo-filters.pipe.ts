import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'completedTaskCount' })
export class CompletedTaskCountPipe implements PipeTransform {
    transform(value: any, completed: boolean) {
        const r = value.filter((p: any) => p.isCompleted === completed);
        return r.length;
    }
}