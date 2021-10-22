import { Lesson } from '../models/Lesson';

class LessonsRepo {

    getAllLessons(options: any) {
        return Lesson.findAll(options);
    }

    getLessonById(id: any) {
        return Lesson.findByPk(id);
    }

    getLessonByCourse(id: any) {
        return Lesson.findAll({where: {courseId: id}});
    }

    createLesson(props: any) {
        return Lesson.create(props);
    }

    updateLesson(id: number, props: any) {
        return Lesson.update(props, {where: {id: id.toString()}});
    }

    deleteLesson(id: number) {
        return Lesson.destroy({where: {id: id.toString()}});
    }
}

export default new LessonsRepo();
