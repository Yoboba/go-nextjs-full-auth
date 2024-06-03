import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import url from "@/constants/url"

export default async function Filter() {
    async function getTags() {
        const response = await fetch(url.server.getTag, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return data
    }

    const res = await getTags()

    return (
        <Menubar className="border border-g2/50 rounded-lg text-g2">
            <MenubarMenu>
                <MenubarTrigger>tags</MenubarTrigger>
                <MenubarContent>
                    {res.data.map((tag: any) => (
                        <MenubarItem key={tag.id}>{tag.name}</MenubarItem>
                    ))}
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>sort</MenubarTrigger>
                <MenubarContent>
                    <MenubarSub>
                        <MenubarSubTrigger>Article&apos;s Name</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>ascended</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>descended</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Tag&apos;s Name</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>ascended</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>descended</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}