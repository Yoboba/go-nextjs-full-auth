import { use } from "react";

export default function useGetMethod(baseUrl:string, endpoint: string) {
    let response = use(fetch(baseUrl + endpoint, {
        method : "GET"
    }).then((value) => value.json()))

    return response
}