'use client'
import Image from 'next/image'
import styles from './page.module.css'
import EmployeeTable from "@/app/components/EmployeeTable";
import {useEffect, useRef, useState} from "react";
import {getAvgBonus, getAvgRating, getAvgSalary, getAvgSales} from "@/app/Services/CalculationsService";
import {employeesData} from "@/app/Data";
import {func} from "prop-types";
import Link from "next/link";

export interface calculation{
  avgSalary:number,
  avgSales:number,
  avgRating:number,
  avgBonus:number,

}
export default function Home() {


  return (
    <main className={styles.main}>
        <div className={styles.mainTitle}>
            <h1>Web Workers Vs The Main Thread Example</h1>
        </div>
      <div className={styles.mainButtons} >
        <button>
          <Link href="/using-main-thread" >
            Use Main Thread
          </Link>
         </button>

        <button  >
        <Link href="/using-web-worker" >
          Use Web worker
        </Link>
     </button>

      </div>


    </main>
  )
}
