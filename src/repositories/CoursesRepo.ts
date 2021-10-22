import { Course } from '../models/Course';
import { Lesson } from '../models/Lesson';

class CoursesRepo {

    getAllCourses(options: any) {
        return Course.findAll(options);
    }

    getById(courseId: any) {
        return Course.findByPk(courseId, {
            include: [
                {
                    model: Lesson,
                    as: 'lessons'
                },
            ],
        });
    }

    createCourse(props: any) {
        return Course.create(props);
    }
}

export default new CoursesRepo();
