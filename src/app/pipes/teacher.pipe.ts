import { Pipe, PipeTransform } from '@angular/core';
import { Teacher } from '../models/teacher.model'
@Pipe({
  name: 'teacherFilter'
})
export class TeacherPipe implements PipeTransform {

  transform(datas: Teacher[], text: string): Teacher[] {
    if( text.length === 0) { return datas; }

    text = text.toLocaleLowerCase();

    return datas.filter( data => {
      return data.TeacherName.toLocaleLowerCase().includes(text);
    });
  }

}
