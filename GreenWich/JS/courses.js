import getCourses from './getCourses.js';
import Courses from './renderCourses.js';
import openCourseInfo from './openCourseInfo.js';

window.addEventListener('DOMContentLoaded', function() {
    
    getCourses.getCourses().then(data => {
        return new Promise(function(resolve) {
            Courses.renderCourses(resolve, data);
        });
    })
    .then(data => {
        let courses = document.getElementsByClassName('item');
        let coursesLength = courses.length;

        for(let i = 0; i < coursesLength; i++) {
            courses[i].addEventListener('click', function(e) {
                openCourseInfo.openCourseInfo(data, i, e.currentTarget);
            });
        }
    });
});