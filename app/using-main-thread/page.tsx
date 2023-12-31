'use client'
import styles from "../page.module.css";
import EmployeeTable from "@/app/components/EmployeeTable";
import {useEffect, useState} from "react";
import {getAvgBonus, getAvgRating, getAvgSalary, getAvgSales} from "@/app/Services/CalculationsService";
import {employeesData} from "@/app/Data";
import Link from "next/link";

interface UsingWebWorkersProps{

}
    /**
     * Author - Roie Ivri
     * Created Date&Time - 09/09/2023 | 18:34
     */
export default function Page(props:UsingWebWorkersProps){
        const currentTime = Date.now();

        const [usingMainThread,setusingMainThread] =useState<boolean>(true);
        const [avgBonus,setavgBonus] =useState<number>(0 );
        const [avgSales,setavgSales] =useState<number>(0);
        const [avgSalary,setavgSalary] =useState<number>(0);
        const [avgRating,setavgRating] =useState<number>(0);
        const [timeItTookForCalc,settimeItTookForCalc] =useState<string>(' ');


        useEffect(()=>{
                if (avgBonus!==0 && avgSalary!==0 && avgSales!==0 && avgRating!==0){
                    settimeItTookForCalc((currentTime-Date.now()).toString())
                }
            },
            [avgBonus,avgSalary,avgSales,avgRating])




        useEffect(()=>
            {
                if (usingMainThread){
                    setavgBonus(getAvgBonus(employeesData));
                    setavgSalary(getAvgSalary(employeesData));
                    setavgRating(getAvgRating(employeesData));
                    setavgSales(getAvgSales(employeesData))

                }else {




                    const worker = new Worker('salarySumCalc.js', { type: 'module' });
                    worker.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgSalary(result);
                    });


                    worker.postMessage(employeesData);


                    const avgBonusCalc = new Worker('avgBonusCalc.js', { type: 'module' });
                    avgBonusCalc.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgBonus(result);

                    });


                    avgBonusCalc.postMessage(employeesData);





                    const avgRating = new Worker('avgRating.js', { type: 'module' });
                    avgRating.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgRating(result);

                    });


                    avgRating.postMessage(employeesData);




                    const avgSale = new Worker('avgSalesCalc.js', { type: 'module' });
                    avgSale.addEventListener('message', (e) => {
                        const result = e.data;
                        setavgSales(result);

                    });


                    avgSale.postMessage(employeesData);





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




        function checkMainThread(){
                alert('Main Thread is free to use')
        }



return(
<>
    <div className={styles.pageWrapper}>

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

            <button>
                <Link href='/'>
                    Go Back To Selection

                </Link>
            </button>

    </div>

    <div className={styles.timeCont}>
        <button onClick={()=> checkMainThread()} >Click me to check the main thread !</button>
        <h1>Time to finish calculating :: {timeItTookForCalc}</h1>

    </div>
</>
)
}