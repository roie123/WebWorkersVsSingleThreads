self.addEventListener('message', (e) => {
    const data = e.data;
    let bonusSum=0

    for (let i = 0; i < 1_000_00; i++) {
        console.log(i);
    }
    
    
    e.data.map(employee =>
        {
            bonusSum+=employee.bonusAmount;
        }
    )


    self.postMessage((bonusSum/e.data.length).toString());
});


