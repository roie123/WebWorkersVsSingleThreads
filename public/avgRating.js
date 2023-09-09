self.addEventListener('message', (e) => {
    const data = e.data;
    let bonusSum=0
    for (let i = 0; i < 10000000; i++) {
    }

    e.data.map(employee =>
        {
            bonusSum+=employee.performanceRating;
        }
    )

    self.postMessage((bonusSum/e.data.length).toString());
});


