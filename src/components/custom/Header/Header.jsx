import React from 'react'
import { ResizablePanel } from "@/components/ui/resizable"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header({ title }) {
    return (
        <>
            <ResizablePanel
                defaultSize={4}
                minSize={4}
                maxSize={10}
                className="border-r mt-2"
            >
                <div className="flex h-full items-center justify-between p-6">

                    <div className="justify-between">
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="cursor-pointer m-2" >
                                        <MenuSvg />
                                        <span className='font-mono'>Menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-[#1d192e] text-white font-mono" align="start">
                                    <DropdownMenuLabel>Home</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            New Note
                                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Notes
                                            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Search
                                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Trash
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Settings
                                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>About Us</DropdownMenuItem>
                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Need Help?</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className="bg-[#1d192e] text-white font-mono">
                                                    <DropdownMenuItem>FAQ's</DropdownMenuItem>
                                                    <DropdownMenuItem>Contact Us</DropdownMenuItem>
                                                    <DropdownMenuItem>Found a bug?</DropdownMenuItem>
                                                    <DropdownMenuItem>Leave a review</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Export</DropdownMenuItem>
                                    <DropdownMenuItem>Save</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem disabled>
                                        Log out
                                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <Popover>
                        <PopoverTrigger className="text-[#cabbff] flex items-center gap-2">
                            <span>
                                <p className='font-mono text-xl font-bold'>
                                    {title}
                                </p>
                            </span>
                        </PopoverTrigger>

                        <PopoverContent className=" text-white bg-[#1d192e] font-mono">
                            <div className="grid gap-4">

                                <div className="space-y-2">
                                    <h4 className="leading-none font-medium">Note Title</h4>
                                    <p className="text-muted-foreground text-sm">
                                        Set the title for your note.
                                    </p>
                                </div>

                                <div className="grid gap-3">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Input
                                            id="width"
                                            defaultValue={title}
                                            className="col-span-2 h-8"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Select>
                                            <SelectTrigger className="w-[163px]">
                                                <SelectValue placeholder="Select Visibility" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#1d192e] text-white">
                                                <SelectGroup>
                                                    <SelectItem value="public">Public</SelectItem>
                                                    <SelectItem value="private">Private</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="flex justify-center text-[#6554a1]">
                                        <Button>
                                            Save
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex justify-between gap-2.5">
                        <div>
                            <Button variant="ghost" className=" cursor-pointer" >
                                <Loader2Icon className="animate-spin" />
                                <span className='font-mono'>Saving</span>
                            </Button>
                        </div>

                        <div>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="ghost" className='cursor-pointer'>
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/evilrabbit.png"
                                                alt="@evilrabbit"
                                            />
                                            <AvatarFallback className="text-white">HG</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DrawerTrigger>
                                <DrawerContent className="bg-[#060607]">
                                    <DrawerHeader>
                                            <DrawerTitle className="text-white">Profile</DrawerTitle>
                                        <DrawerDescription>Your profile details</DrawerDescription>
                                    </DrawerHeader>
                                    
                                        <DrawerFooter>
                                            <Button>Submit</Button>
                                            <DrawerClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                        </div>
                    </div>

                </div>
            </ResizablePanel>
        </>
    );
};

const MenuSvg = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0 0 256 256"
        style={{ fill: "#7950F2" }}
    >
        <g
            fill="#7950F2"
            fillRule="nonzero"
            stroke="none"
            strokeWidth="1"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
            style={{ mixBlendMode: "normal" }}
        >
            <g transform="scale(5.12,5.12)">
                <path d="M5,8c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,23c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175zM5,38c-0.72127,-0.0102 -1.39216,0.36875 -1.75578,0.99175c-0.36361,0.623 -0.36361,1.39351 0,2.01651c0.36361,0.623 1.0345,1.00195 1.75578,0.99175h40c0.72127,0.0102 1.39216,-0.36875 1.75578,-0.99175c0.36361,-0.623 0.36361,-1.39351 0,-2.01651c-0.36361,-0.623 -1.0345,-1.00195 -1.75578,-0.99175z" />
            </g>
        </g>
    </svg>
);
