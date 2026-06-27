import React from 'react';
import ManageTrainerPage from './ManageTrainerPage';
import { getAllUserTrainerForm } from '@/lib/actions/api/user';

const AdminManageTrainerPage =async () => {
    const allTrainerForm=await getAllUserTrainerForm()
    console.log(allTrainerForm)
    return (
        <div>
            <ManageTrainerPage allTrainerForm={allTrainerForm}/>
        </div>
    );
};

export default AdminManageTrainerPage;