self.addEventListener('message', (e) => {
    let salesSum=0

    for (let i = 0; i < 1_000_00; i++) {
        console.log(i);
    }
    
    
    e.data.map(employee =>
        {
            employee.fullYearSales.map(sale => salesSum+=sale);
        }
    )


    self.postMessage((salesSum/12/e.data.length).toString());
});


