import React from "react";


// export const TextAreaIndex1 = ({ handleAction, label, ...props }) => {
//   return (
//     <FormGroup>
//       <Label className="mb-2 sbp1">
//         <span>{label || ""}</span>
//       </Label>
//       <Input {...props} type="textarea" onChange={handleAction} />
//     </FormGroup>
//   );
// };
// TextAreaIndex.propTypes = {
//   handleAction: PropTypes.func.isRequired,
//   label: PropTypes.string,
// };

// export const TextAreaIndex2 = ({ onChange, label, ...props }) => {
//   return (
//     <div className="form-group row">
//       <Label className="col-sm-2 col-form-label">
//         <span>{label || ""}</span>
//       </Label>
//       <div className="col-sm-10">
//         <Input {...props} type="textarea" onChange={onChange} />
//       </div>
//     </div>
//   );
// };
// TextAreaIndex.propTypes = {
//   handleAction: PropTypes.func.isRequired,
//   label: PropTypes.string,
// };

export const TextAreaIndex = ({ onChange, ...props }) => {
  return (

    <>
      
      <textarea
        {...props}
        type="textarea"
        onChange={onChange}
        
      />
    </>

   
  );
};
