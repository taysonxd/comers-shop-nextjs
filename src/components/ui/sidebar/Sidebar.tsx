'use client'

import { useUiStore } from "@/store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { LogoutButton } from "../logout-button/LogoutButton"

export const Sidebar = () => {

    const { isSideMenuOpen, closeSideMenu } = useUiStore();
    
    
    return (
        <div>
            {
                isSideMenuOpen && (
                    <>                    
                        {/*  backdrop */}
                        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                    </>
                )
            }

            {
                isSideMenuOpen && (
                    <>                    
                        {/* blur */}
                        <div
                            onClick={ closeSideMenu }
                            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                        />
                    </>
                )
            }


            <nav
                className={
                    clsx(
                        "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                        {
                            "translate-x-full": !isSideMenuOpen
                        }
                    )
                }
            >

                <IoCloseOutline
                    size={40}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={ closeSideMenu }
                />               

                {/* Menu */}                
                <LogoutButton />

                {/* Line separator */}
                <div className="w-full h-px bg-gray-200 my-10"/>



            </nav>
        </div>
    )
}
