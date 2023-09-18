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
        <img src={'/multi-threading.jpg'} />
        <div className={styles.mainTitle}>
            <h1>Web Workers Vs The Main Thread Example</h1>
            <p>This is a simple demonstration of the benefits of using a multi thread approach to calculating real-time values in the frontend</p>
            <p>1.Choose a method to calculate the real-time values</p>
            <p>2.Try to press the <span>' Click me to check the main thread ! '</span> button to see if the thread is busy calculating</p>
            <p>3.Try to notice the differences like the button not being "press-able" when the main thread is busy  </p>
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
