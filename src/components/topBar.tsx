"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const TopBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [ActiveRouter, setActiveRouter] = useState("");
    const paths = [
        { label: 'Brands', path: '/brands' },
        { label: 'Transcations', path: '/transcations' }
    ];
    const logout = () => {
        router.replace('/')
    }
    useEffect(() => {
        setActiveRouter(pathname)
    }, [])
    return (<>
        <div className="bg-gray-100 p-4 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">User form</h1>
            </div>
            {/* <div className="flex justify-center flex-grow">
                {paths.map(({ label, path }) => (
                    <Link key={path} href={path}>
                        <span
                            className={`mx-2 py-1  cursor-pointer ${ActiveRouter === path ? 'border-b-4 border-black' : ''}`}
                        >
                            {label}
                        </span>
                    </Link>
                ))}
            </div> */}
            <div className="flex justify-end items-center space-x-2 text-blue-500 cursor-pointer" onClick={logout}>
                <i className="ri-logout-box-fill text-2xl"></i>
                Logout
            </div>
        </div>
    </>)
}
export default TopBar;