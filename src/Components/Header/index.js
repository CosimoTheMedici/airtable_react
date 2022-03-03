import React from 'react'
import { GoPlus } from 'react-icons/go';

const Header = ({headers}) => {
    
  return (
   <>
        <thead>
            <tr>

                {headers.map(head => (
                   <th key={head.field}>{head.name}</th> 
                ))}
                
                
            </tr>
        </thead>
   </>
  )
}

export default Header