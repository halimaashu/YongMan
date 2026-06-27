import React from 'react';
import AdminUserManagePage from './AdminUserManagePage';
import { GetAllUsers } from '@/lib/actions/api/user';

const AdminUserPage =async () => {
    const users=await GetAllUsers()
    console.log(users)
    return (
        <div>
            <AdminUserManagePage AllUser={users}/>
        </div>
    );
};

export default AdminUserPage;