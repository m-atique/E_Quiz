import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Modal({ open, onClose, title, detail ,cancel,  ok,onOk ,type ='success' }) {
    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className={`${type === "success" ? 'text-qblue' : 'text-spred'}  text-xl`}>{title}</AlertDialogTitle>
                    <AlertDialogDescription className={`text-qblack text-md`}>{detail}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* <AlertDialogCancel onClick={onClose}>{cancel}</AlertDialogCancel> */}
                  
{cancel && <AlertDialogCancel className={`${type === "success" ? 'bg-qblue' : 'bg-spred'} w-1/5`}>{cancel}</AlertDialogCancel>}
<AlertDialogAction className={`${type === "success" ? 'bg-qblue' : 'bg-spred'} w-1/5`} onClick={onOk||onClose}>{ok}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
