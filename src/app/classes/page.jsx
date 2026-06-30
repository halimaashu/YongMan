import { getAllApprovedClass} from '@/lib/actions/api/class';
import React from 'react';
import DisplayClass from './DisplayClass';
import { PaginationControlled } from '@/components/class/PaginationControlled';
import SearchBox from '@/components/SearchBox';
import { FileMagnifier } from '@gravity-ui/icons';


const page = async({searchParams}) => {
    const{page,search}=await searchParams;
    // console.log(params,"ppppppppppppp")
    const name="ashik";
    const classs=await getAllApprovedClass(page,search)
    const currentPage=classs.page
    const allPages=classs.totalPage
    // console.log(currentPage,allPages)

    const classes=classs.data
    return (
        <div>
            <SearchBox/>
           {
            classes.length>0?
             <DisplayClass classes={classes} />:<div className='h-screen flex flex-col justify-center items-center'>
                <FileMagnifier width={50} height={50} className='text-red-600'/>
                <h1 className='text-2xl font-medium'>No data found </h1>
             </div>
           }
            <PaginationControlled currentPage={currentPage} allPages={allPages} classes={classes} />
        </div>
    );
};

export default page;