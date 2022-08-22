import { CourseDocument, ScheduleModel } from "../models/course.model";
import moment from "moment";

export type WeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday";

export const formatDate = (date = new Date()) => {
  const padTo2Digits = (num: number) => {
    return num.toString().padStart(2, "0");
  };
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("");
};

export const getFirstAndLastDayOfTheWeek = (currentDate = new Date()) => {
  const first = currentDate.getDate() - currentDate.getDay() + 1; // the day of the week - from monday
  const last = first + 4; // last day is the first day + 4 (until friday only)

  const firstday = formatDate(new Date(currentDate.setDate(first)));
  const lastday = formatDate(new Date(currentDate.setDate(last)));

  return { firstday: Number(firstday), lastday: Number(lastday) };
};

export const filterActiveWeekLessons = (courses: CourseDocument[]) => {
  const { firstday, lastday } = getFirstAndLastDayOfTheWeek();

  let activeCourses = [];
  for (let course of courses) {
    let earlyInactiveDays = course.start_date - firstday;
    let endInactiveDays =
      course.end_date && lastday >= course.end_date
        ? lastday - course.end_date
        : 0;

    activeCourses.push({
      _id: course._id,
      name: course.name,
      start_date: course.start_date,
      end_date: course.end_date,
      color: course.color,
      weekly_schedule: {
        monday:
          earlyInactiveDays > 0 || endInactiveDays > 4
            ? []
            : course.weekly_schedule.monday,
        tuesday:
          earlyInactiveDays > 1 || endInactiveDays > 3
            ? []
            : course.weekly_schedule.tuesday,
        wednesday:
          earlyInactiveDays > 2 || endInactiveDays > 2
            ? []
            : course.weekly_schedule.wednesday,
        thursday:
          earlyInactiveDays > 3 || endInactiveDays > 1
            ? []
            : course.weekly_schedule.thursday,
        friday:
          earlyInactiveDays > 4 || endInactiveDays > 0
            ? []
            : course.weekly_schedule.friday,
      },
    });
  }
  return activeCourses as CourseDocument[];
};

export type LessonCard = ScheduleModel & { name: string };

export const massageWeeklyScheduleData = (courses: CourseDocument[]) => {
  const sortByTime = (daySchedules: LessonCard[]) =>
    daySchedules.sort(
      (a, b) => Number(moment(a.start_time)) - Number(moment(b.start_time))
    );

  const lessonMapper = (day: WeekDays) => {
    let lessons: LessonCard[] = [];
    courses.forEach(
      (course) =>
        (lessons = [
          ...lessons,
          ...course.weekly_schedule[day].map((schedule) => ({
            name: course.name,
            color: course.color,
            start_time: schedule.start_time,
            end_time: schedule.end_time,
          })),
        ])
    );
    return lessons;
  };

  return {
    monday: sortByTime(lessonMapper("monday")),
    tuesday: sortByTime(lessonMapper("tuesday")),
    wednesday: sortByTime(lessonMapper("wednesday")),
    thursday: sortByTime(lessonMapper("thursday")),
    friday: sortByTime(lessonMapper("friday")),
  };
};
