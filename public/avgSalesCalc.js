self.addEventListener('message', (e) => {
    let salesSum=0

    for (let i = 0; i < 100000; i++) {
        for (let j = 0; j < 10000; j++) {

        }
    }
    
    
    e.data.map(employee =>
        {
            employee.fullYearSales.map(sale => salesSum+=sale);
        }
    )


    self.postMessage((salesSum/12/e.data.length).toString());
});


