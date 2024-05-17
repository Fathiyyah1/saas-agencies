import React from 'react';
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'

type Props = {
    user?: null | User
} 

const Navigation = ({user}: Props) => {
    return (
        <div className='p-4 flex items-center justify-between relative'>
            <aside className='flex itemx-center gap-2'>
                <img
                src={'./assets/plura-logo.svg'}
                width={40}
                height={40}
                alt="plur logo"
                />
            </aside>
        </div>
    )
}

export default Navigation