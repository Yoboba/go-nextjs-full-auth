import MyAvatar from "@/components/my_ui/my_avatar";

export default function Profile() {
    return (
        <div className="flex items-center justify-center gap-3">
            <MyAvatar/>
            <div className=" flex flex-col items-start justify-center">
                <h2 className=" text-g1 text-2xl font-bold">Yobubble</h2>
                <p className=" text-g1 text-xs font-medium">
                    Thanachot.onl@student.mahidol.ac.th
                </p>
            </div>
        </div>
    )
}