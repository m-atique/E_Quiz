import React from 'react';
import {
    AlertDialog,
  
    AlertDialogContent,
   
} from "@/components/ui/alert-dialog";
import Spinner from './spinner';

export  function Busy({ open}) {
    return (
        <AlertDialog open={open} onOpenChange={!open} >
            <AlertDialogContent className='w-36 h-36 bg-transparent outline-none border-0 shadow-none '>
               <Spinner />
            </AlertDialogContent>
        </AlertDialog>
    );
}
