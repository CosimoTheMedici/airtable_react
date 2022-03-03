import React from "react";


export const TextInputIndex = ({
  inputType,
  onChange,
  onBlur,
  borderRadius,
  placeHolder,
  ...props
}) => {
  return (
    < >
      

      <input
        {...props}
        type={inputType}
        onChange={onChange}
        onBlur={onBlur}
        placeholder = {placeHolder}
        className={borderRadius ? "form-control-rounded" : ""}
      />
    </>
  );
};


export const TextInputIndex1 = ({
  inputType,
  onChange,
  onBlur,
  borderRadius,
  placeHolder,
  ...props
}) => {
  return (
    < >
      

      <input
        {...props}
        type={inputType}
        onChange={onChange}
        onBlur={onBlur}
        placeholder = {placeHolder}
        className={borderRadius ? "form-control-rounded" : ""}
      />
    </>
  );
};

export const TextInputIndexDate = ({
 
  onChange,
  onBlur,
  placeHolder,
  ...props
}) => {
  return (
    < >
      

      <input
        {...props}
        type="date"
        onChange={onChange}
        onBlur={onBlur}
        placeholder = {placeHolder}
        className={ "form-control-rounded" }
      />
    </>
  );
};
export const TextInputIndexnumber = ({
 
  onChange,
  onBlur,
  borderRadius,
  placeHolder,
  ...props
}) => {
  return (
    < >
      

      <input
        {...props}
        type="number"
        onChange={onChange}
        onBlur={onBlur}
        placeholder = {placeHolder}
        className={"form-control-rounded" }
      />
    </>
  );
};

export const TextInputCheckBox = ({
  inputType,
  onChange,
  onBlur,
  borderRadius,
  
  
  ...props
}) => {
  return (
    < >
      

      <input
        {...props}
        type="checkbox"
        onChange={onChange}
        onBlur={onBlur}
        //checked ={check===true?"checked":""}
        className={borderRadius ? "form-control-rounded" : ""}
      />
    </>
  );
};

export const ImageShow = ({
  source,
  imgWidth,
  imgheight,
  ...props
}) => {
  return (
    < >
      

      <img 
      src={source}
      width= {imgWidth}
      height={imgheight}
      />
    </>
  );
};
