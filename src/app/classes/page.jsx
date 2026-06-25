import { getAllClass } from '@/lib/actions/api/class';
import React from 'react';
import DisplayClass from './DisplayClass';

const page = async() => {
    const name="ashik";
    const classs=await getAllClass()
    // console.log(classs,"from my all classs pahe")
    return (
        <div>
            <DisplayClass classs={classs} />
        </div>
    );
};

export default page;