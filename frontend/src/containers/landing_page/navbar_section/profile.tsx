import MyAvatar from "@/components/my_ui/my_avatar";
import url from "@/constants/url";
import { getCookie } from "@/lib/cookies";

export default async function Profile() {
    if (getCookie("token")) { 
        const response = await fetch(url.getUser, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
        }})
        const data = await response.json()
        if (response.ok) {
            return (
                <div className="flex items-center justify-center gap-3">
                    <MyAvatar/>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-g1 text-2xl font-bold">{data.name}</h2>
                        <p className="text-g1 text-xs font-medium">
                            {data.email}
                        </p>
                    </div>
                </div>
            )
        } else {
            console.error(data.error)
        }
    } else {
        return (
            <div className="flex items-center justify-center gap-3">
                <MyAvatar/>
                <div className=" flex flex-col items-start justify-center">
                    <h2 className=" text-g1 text-2xl font-bold">Guest</h2>
                    <p className=" text-g1 text-xs font-medium">
                        x www x 
                    </p>
                </div>
            </div>
        )
    }
}