import MyAvatar from "./my_avatar";
import url from "../../../constants/url";
import { getCookie } from "@/lib/cookies";

export default async function Profile() {
    const jwt = getCookie("jwt")
    const username = getCookie("username")

    async function getUser(token : string) {
        const response = await fetch(url.server.getUser, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data
    }

    if (jwt !== undefined) {
        const res = await getUser(jwt.value)
        if (res.status !== 200) {
            console.error("Error Fetching User Info : ", res.error)
            return (
                <div className="flex items-center justify-center gap-3">
                    <div className=" flex flex-col items-end justify-center">
                        <h2 className=" text-g2 text-xl font-bold">Guest</h2>
                        <p className=" text-g2 text-xs font-light">
                            °˖✧◝(⁰▿⁰)◜✧˖° 
                        </p>
                    </div>
                    <MyAvatar username={username?.value}/>
                </div>
            )
        } else {
            return (
                <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-end justify-center">
                        <h2 className="text-g2 text-xl font-bold">{res.data.username}</h2>
                        <p className="text-g2 text-xs font-light">
                            {res.data.email}
                        </p>
                    </div>
                    <MyAvatar username={username?.value}/>
                </div>
            )
        }
    } else {
        return (
            <div className="flex items-center justify-center gap-3">
                <div className=" flex flex-col items-end justify-center">
                    <h2 className=" text-g2 text-xl font-bold">Guest</h2>
                    <p className=" text-g2 text-xs font-light">
                        °˖✧◝(⁰▿⁰)◜✧˖° 
                    </p>
                </div>
                <MyAvatar username={username?.value}/>
            </div>
        )
    }
}