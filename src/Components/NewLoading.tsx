import { Spinner } from '@/imported_components/ui/spinner';
import React from 'react';

const NewLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <Spinner className='h-20 w-20 text-frost-white' />
    </div>
  );
};

export default NewLoading;