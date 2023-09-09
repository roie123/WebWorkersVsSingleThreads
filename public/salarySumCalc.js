
self.addEventListener('message', (e) => {
    const data = e.data;
    let salarySum=0
    for (let i = 0; i < 10000000; i++) {
        let result = i*i;
    }


    e.data.map(employee => salarySum += employee.salary)


    self.postMessage((salarySum/e.data.length).toString());
});


