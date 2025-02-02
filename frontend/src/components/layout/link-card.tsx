import React from 'react'
import { MdContentCopy } from "react-icons/md";
import { Card, CardContent } from '../ui/card'
import { GoLink } from "react-icons/go";
import { Button } from '../ui/button';
import { PiCursorClickLight } from "react-icons/pi";
import { FiMoreVertical } from "react-icons/fi";
import { Badge } from '@/components/ui/badge';

type Props = {}

const LinkCard = (props: Props) => {
    return (
        <>

            {/* CARD */}
            <Card className="link-card hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out cursor-pointer p-0">
                <CardContent className='flex justify-between items-center gap-4 p-4'>

                    {/* CARD ICON */}
                    <div className="card-icon">
                        <GoLink className='w-10 h-10 bg-gray-100 p-2.5 rounded-full' />
                    </div>

                    {/* CARD DETAILS */}
                    <div className="card-details grow">

                        {/* SOURCE LINK */}
                        <div className='source-link flex justify-start items-center gap-1'>
                            <h5 className='text-base font-medium'>
                                dub.sh/karanmistryyy
                            </h5>
                            <Button
                                variant={'link'}
                                className='p-1 hover:bg-[#f3f3f3] h-auto'
                            >
                                <MdContentCopy />
                            </Button>
                        </div>

                        {/* DESTINATION LINK */}
                        <div className="destination-link">
                            <a
                                href='https://karanmistryyy.pythonanywhere.com/'
                                className='destination-link text-sm hover:underline'
                                target='_blank'
                            >
                                https://karanmistryyy.pythonanywhere.com/
                            </a>
                        </div>
                    </div>

                    {/* CARD BUTTONS */}
                    <div className="card-buttons flex justify-center items-center gap-4">

                        {/* LINK STATUS */}
                        <Badge
                            className='link-status'
                            variant={'default'}
                        >
                            Active
                        </Badge>

                        {/* LINK CLICKS */}
                        <Button
                            className='link-clicks gap-1'
                            variant={'outline'}
                        >
                            <PiCursorClickLight />
                            <span>
                                8 Clicks
                            </span>
                        </Button>

                        {/* SHOW MORE */}
                        <Button
                            className='show-more hover:bg-[#f3f3f3] p-2'
                            variant={'link'}
                        >
                            <FiMoreVertical />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default LinkCard