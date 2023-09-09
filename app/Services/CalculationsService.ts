import exp from "constants";
import {Employee} from "@/app/Data";


export function getAvgSalary(employees: Employee[]): number {
    let salarySum: number = 0;
    employees.map(employee => salarySum += employee.salary);


    return (salarySum / employees.length);
}

export function getAvgSales(employees: Employee[]): number {
    let salesSum: number = 0;
    for (let i = 0; i < 1_000_00; i++) {
        console.log(i);
    }
    employees.map(employee =>
        employee.fullYearSales.map(sale => {
                salesSum += sale
            }
        )
    );


    return (salesSum / 12 / employees.length);
}

export function getAvgRating(employees: Employee[]): number {
    let ratingSum: number = 0;
    for (let i = 0; i < 1_000_00; i++) {
        console.log(i);
    }
    employees.map(employee =>
        ratingSum += employee.performanceRating
    );


    return (ratingSum / employees.length);
}

export function getAvgBonus(employees: Employee[]): number {
    let bonusSum: number = 0;
    for (let i = 0; i < 1_000_00; i++) {
        console.log(i);
    }
    employees.map(employee =>
        bonusSum += employee.bonusAmount
    );


    return (bonusSum / employees.length);
}



