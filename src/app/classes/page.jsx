import { getAllApprovedClass} from '@/lib/actions/api/class';
import React from 'react';
import DisplayClass from './DisplayClass';
import { PaginationControlled } from '@/components/class/PaginationControlled';

const page = async() => {
    const name="ashik";
    const classs=await getAllApprovedClass()
    // console.log(classs,"from my all classs pahe")
    return (
        <div>
            <DisplayClass classs={classs} />
            <PaginationControlled/>
        </div>
    );
};

export default page;