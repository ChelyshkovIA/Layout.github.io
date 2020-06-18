function openCourseInfo(resp, number, el) {
    const curEl = el;
    const bg = document.querySelector('.courses-block__bg');
    let textBlock = curEl.querySelector('.content');

    switch(curEl.classList.contains('huge-item')) {
        case (true):
            bg.classList.remove('courses-block__bg--active');
            bg.classList.add('courses-block__bg--dying');

            setTimeout(() => {
                bg.classList.remove('courses-block__bg--dying');
            }, 500);

            curEl.classList.remove('huge-item');

            textBlock.firstChild.remove();
            let text = resp[number].description.split('');
            text = text.splice(0,150);
            text = text.join('');
            textBlock.append(text + '...');
            document.body.style.overflow = 'auto';

            break;
        case (false):
            bg.classList.add('courses-block__bg--active');
            curEl.classList.add('huge-item');
            textBlock.firstChild.remove();
            textBlock.append(resp[number].description);
            document.body.style.overflow = 'hidden';

            break;
        default:
            return;        
    }
    
}

export default {
    openCourseInfo
}