"use client"
import { useEffect, useState, use } from "react";

export default function useGET(baseUrl:string, endpoint: string) {
    const [result ,setResult] = useState([])
    let response = use(fetch(baseUrl + endpoint, {
        method : "GET"
    }).then((value) => value.json()))

    useEffect(() => {
        setResult(response)
    },[])

    return result
}