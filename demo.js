const path = '/user-management/add-user';

const paths = path.split('/');

console.log(paths);

paths.forEach(pa => {
    if (pa) console.log(pa);
    else console.log('path is null');
});

