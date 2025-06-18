"use client"

import { ResizablePanelGroup } from "@/components/ui/resizable"
import Header from "@/components/custom/Header/Header";
import TextAreaForNote from "@/components/custom/MainSection/TextAreaForNote";
import Footer from "@/components/custom/Footer/Footer";

export default function Page() {

    return (
        <div className="h-screen w-screen">
            <ResizablePanelGroup direction="vertical" className="h-full w-full bg-black text-white">
                <Header title="My Note 1" />
                <TextAreaForNote />
                <Footer />
            </ResizablePanelGroup>
        </div>
    );
}


