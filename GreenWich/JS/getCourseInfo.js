function getCourseInfo(id) {
    let req = new XMLHttpRequest();
    let link = `../PHP/getCourseInfo.php?c=${id}`;

    req.open('GET', link);
    req.send();

    return req;
}

export default {
    getCourseInfo: getCourseInfo
}