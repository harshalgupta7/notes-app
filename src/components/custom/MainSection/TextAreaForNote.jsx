import React from 'react'
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Textarea } from "@/components/ui/textarea";


export default function TextAreaForNote() {
    return (
        <>
            <ResizablePanel defaultSize={50}>
                <div className="h-full w-full p-6 flex flex-col bg-black text-[#8a83a3]">
                    <Textarea
                        id="message"
                        placeholder="Type your message here."
                        className="flex-1 resize-none "
                    />
                </div>
            </ResizablePanel>
        </>
    )
};