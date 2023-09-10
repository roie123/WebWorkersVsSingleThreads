
self.addEventListener('message', (e) => {
    const data = e.data;
    let salarySum=0
    for (let i = 0; i < 1_000_00; i++) {
        console.log(i);
    }

    e.data.map(employee => salarySum += employee.salary)


    self.postMessage((salarySum/e.data.length).toString());
});


