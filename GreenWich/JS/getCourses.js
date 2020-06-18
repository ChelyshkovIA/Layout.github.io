function getCourses() {
    let req = new XMLHttpRequest();
    let link = '../PHP/getCourses.php';

    req.open('GET', link);
    req.send();

    return new Promise(function(resolve) {
        req.addEventListener('load', function() {
            let resp = req.response;
    
            if(resp == 'db_err') {
                window.location.href = '../db_err.html';
                return;
            }
    
            resp = JSON.parse(resp);
            resolve(resp);
        });
    });
}

export default {
    getCourses: getCourses
}