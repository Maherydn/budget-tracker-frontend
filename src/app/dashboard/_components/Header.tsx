"use client"
import React from 'react'
import { LogoIcon, UserIcon } from '../_assets/icons'
import { AuthContextType, useAuth } from '@/app/_contexts/AuthContex';

export const Header = () => {

  const { user  } = useAuth() as AuthContextType;
  
  return (
    <header
        className="mx-6 h-32 flex flex-col justify-center items-start lg:flex-row lg:items-center lg:justify-between gap-2 border-b border-border/50"
      >
        <div className="h-16 flex items-center">
          <div className="h-12 w-10">
            <LogoIcon/>
          </div>
          <h1 className="text-3xl text-header font-bold font-poppins">
            Monthly <span className="text-green">budget</span>
          </h1>
        </div>
        <div className="flex h-6 items-center pl-2 gap-2">
          <div className="size-9">
           <UserIcon/>
          </div>
          <h3 className="text-header font-montserrat font-medium">
            Welcome <span className='capitalize'>{user?.username}</span>
          </h3>
        </div>
      </header>
  )
}
