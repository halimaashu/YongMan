import ClassDetail from '@/components/class/ClassDetail';
import { getAllClassDetail } from '@/lib/actions/api/class';
import React from 'react';
// Adjust path based on your folder structure

const classDetailPage = async ({ params }) => {
    const { id } = await params;
    const classDetail = await getAllClassDetail(id);
    
    // Fallback if class structural data is missing or failed fetching
    if (!classDetail) {
      return (
        <div className="flex justify-center items-center h-96">
          <p className="text-default-500">Class details could not be found.</p>
        </div>
      );
    }

    return (
      <ClassDetail classDetail={classDetail} />
    );
};

export default classDetailPage;