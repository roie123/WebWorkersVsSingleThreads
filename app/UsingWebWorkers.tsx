import styles from "@/app/page.module.css";
import EmployeeTable from "@/app/components/EmployeeTable";
import {useEffect, useState} from "react";
import {getAvgBonus, getAvgRating, getAvgSalary} from "@/app/Services/CalculationsService";
import {employeesData} from "@/app/Data";

interface UsingWebWorkersProps{

}
    /**
     * Author - Roie Ivri
     * Created Date&Time - 09/09/2023 | 18:34
     */
export default function UsingWebWorkers(props:UsingWebWorkersProps){

        const [usingMainThread,setusingMainThread] =useState<boolean>(false);
        const [avgBonus,setavgBonus] =useState<number>(0 );
        const [avgSales,setavgSales] =useState<number>(0);
        const [avgSalary,setavgSalary] =useState<number>(0);
        const [avgRating,setavgRating] =useState<number>(0);



        useEffect(()=>
            {
                if (usingMainThread){
                    setavgRating(getAvgBonus(employeesData));
                    setavgBonus(getAvgBonus(employeesData));
                    setavgSalary(getAvgSalary(employeesData));
                    setavgRating(getAvgRating(employeesData));

                }else {




                    const worker = new Worker('salarySumCalc.js', { type: 'module' });
                    worker.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgSalary(result);
                    });

                    // Send data to the web worker
                    worker.postMessage(employeesData); // Example data to send to the worker

                    // Clean up the worker when the component unmounts


                    const avgBonusCalc = new Worker('avgBonusCalc.js', { type: 'module' });
                    avgBonusCalc.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgBonus(result);

                    });

                    // Send data to the web worker
                    avgBonusCalc.postMessage(employeesData); // Example data to send to the worker





                    const avgRating = new Worker('avgRating.js', { type: 'module' });
                    avgRating.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgRating(result);

                    });

                    // Send data to the web worker
                    avgRating.postMessage(employeesData); // Example data to send to the worker




                    const avgSale = new Worker('avgSalesCalc.js', { type: 'module' });
                    avgSale.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgSales(result);

                    });

                    // Send data to the web worker
                    avgSale.postMessage(employeesData); // Example data to send to the worker




                    // Clean up the worker when the component unmounts
                    return () => {
                        worker.terminate();
                        avgRating.terminate()
                        avgBonusCalc.terminate();
                        avgSale.terminate();
                    };







                }

            }
            ,[usingMainThread])

        /**
         * This Method will switch back and forth between WEBWORKERS and the main thread
         * @author : Roie Ivri
         * @Created At 09/09/2023 17:56
         */
        function switchCalculatingMethod() {

            setavgRating(0);
            setavgBonus(0);
            setavgSalary(0);
            setavgRating(0);


            setusingMainThread(prevState => (!prevState));
        }


return(
<>
    <div className={styles.statisticsCont}>


        <div className={styles.singleStatistic}>
            <p className={styles.statisticName} >AVG Salary</p>



            <div className={styles.statisticValueCont} >
                <p  className={styles.statisticValue}>
                    {avgSalary.toString()}

                </p>

            </div>



        </div>



        <div className={styles.singleStatistic}>
            <p className={styles.statisticName} >AVG Sales</p>



            <div className={styles.statisticValueCont} >
                <p  className={styles.statisticValue}>

                    {avgSales}

                </p>

            </div>



        </div>







        <div className={styles.singleStatistic}>
            <p className={styles.statisticName} >AVG Rating</p>



            <div className={styles.statisticValueCont} >
                <p  className={styles.statisticValue}>
                    {avgRating}



                </p>

            </div>



        </div>




        <div className={styles.singleStatistic}>
            <p className={styles.statisticName} >AVG Bonus</p>



            <div className={styles.statisticValueCont} >
                <p  className={styles.statisticValue}>
                    {avgBonus}


                </p>

            </div>



        </div>


    </div>










    <div className={styles.employeeTableContainer} >

        <EmployeeTable/>
    </div>

</>
)
}