import { getAllApprovedClass} from '@/lib/actions/api/class';
import React from 'react';
import DisplayClass from './DisplayClass';
import { PaginationControlled } from '@/components/class/PaginationControlled';
import SearchBox from '@/components/SearchBox';


const page = async({searchParams}) => {
    const params=await searchParams;
    console.log(params,"ppppppppppppp")
    const name="ashik";
    const classs=await getAllApprovedClass(params.page,params.search)
    const currentPage=classs.page
    const allPages=classs.totalPage
    console.log(currentPage,allPages)

    const classes=classs.data
    return (
        <div>
            <SearchBox/>
            <DisplayClass classes={classes} />
            <PaginationControlled currentPage={currentPage} allPages={allPages} classes={classes} />
        </div>
    );
};

export default page;