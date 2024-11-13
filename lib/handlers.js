
const formvalidator = (...fields)=>{
    fields.forEach((field,idx)=>{
        if (field.current) { // Check if the current field ref is defined
          
            field.current.focus(); // Apply focus to the field
            field.current.classList.add('border-red-500', 'animate-pulse');
        } else {
            console.log(`Field at index ${idx} is not initialized`);
        }
    })
}

export {formvalidator}