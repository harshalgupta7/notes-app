import { ResizablePanel } from '@/components/ui/resizable'
import React from 'react'

export default function Footer() {
    return (
        <>
            <ResizablePanel defaultSize={3} >
                <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content pl-10">
                    <aside>
                        <p className='text-[#cabbff] text-[11px] font-bold'>Copyright © {new Date().getFullYear()} - All right reserved by Harshal</p>
                    </aside>
                </footer>
            </ResizablePanel>
        </>
    )
};