function renderCourses(resolve, resp) {
    let courseBlock = document.querySelector('.courses-block');
    resp.forEach(element => {
        let course = document.createElement('div');
        course['data-id'] = element.id;
        course.className = 'courses-block__item item';

        let bg = document.createElement('div');
        bg.className = 'item__bg';

        let h3 = document.createElement('h3');
        h3.className = 'item__title';
        h3.append(element.title);

        let content = document.createElement('p');
        content.className = 'item__content content';
        let text = element.description.split('');
        text = text.splice(0,150);
        text = text.join('');
        content.append(text + '...');

        let readMore = document.createElement('p');
        readMore.className = 'item__read-more read-more';
        let icon = document.createElement('span');
        icon.className = 'icon-plus-circled';
        readMore.append(icon);

        course.append(bg);
        course.append(h3);
        course.append(content);
        course.append(readMore);

        courseBlock.append(course);
    });
    resolve(resp);
}

export default {
    renderCourses: renderCourses
}