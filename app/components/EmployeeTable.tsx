import styles from './EmployeeTable.module.css';
import {employeesData} from "@/app/Data";
interface EmployeeTableProps{

}
    /**
     * Author - Roie Ivri 
     * Created Date&Time - 09/09/2023 | 11:59
     */
export default function EmployeeTable(props:EmployeeTableProps){


return(
<>
    <div  className={styles.employeeRow}>
        <div className={styles.employeeNameContainer} >
            <p>Employee Name</p>
        </div>

        <div className={styles.employeePhoneContainer} >
            <p>Phone</p>
        </div>
        <div className={styles.employeeSalaryRangeContainer} >
            <p>Salary</p>
        </div>

        <div className={styles.employeeEmailContainer} >
            <p >Email</p>
        </div>

        <div className={styles.employeeCommissionContainer} >
            <p >Commission Rate</p>
        </div>

        <div className={styles.employeeBonusAmountContainer} >
            <p >Bonus</p>
        </div>

        <div className={styles.employeePerformenceRatingContainer} >
            <p >Rating</p>
        </div>

        <div className={styles.employeeExperienceContainer} >
            <p >Experience</p>
        </div>


    </div>



    <div className={styles.employeeTable}>
    {employeesData.map(employee =>
        (





            <div key={employee.employeeId*Math.random()} className={styles.employeeRow}>
                <div className={styles.employeeNameContainer} >
                    <p>{employee.firstName + employee.lastName}</p>
                </div>

                <div className={styles.employeePhoneContainer} >
                    <p>{employee.phoneNumber}</p>
                </div>
                <div className={styles.employeeSalaryRangeContainer} >
                    <p>{Math.min(...employee.fullYearSales)}$ - {Math.max(...employee.fullYearSales)}$</p>
                </div>

                <div className={styles.employeeEmailContainer} >
                    <p ><a href={'mailto:'+employee.email} >{employee.email}</a></p>
                </div>

                <div className={styles.employeeCommissionContainer} >
                    <p >{employee.commissionRate}</p>
                </div>

                <div className={styles.employeeBonusAmountContainer} >
                    <p >{employee.bonusAmount}$</p>
                </div>

                <div className={styles.employeePerformenceRatingContainer} >
                    <p >{employee.performanceRating}</p>
                </div>

                <div className={styles.employeeExperienceContainer} >
                    <p >{employee.yearsOfExperience}</p>
                </div>


            </div>

        )

    )}


</div>
</>
)
}