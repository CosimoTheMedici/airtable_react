import React from 'react'

const mystyle = {
    color: "orange",
   // backgroundColor: "yellow",
    height:"3rem",
    fontFamily: "Arial",
    display:"flex",
    justifyContent:"center",
    width : "16rem",
    fontSize: "30px",
    alignItems:"center",
    marginLeft:"40%",


  };

// const Loading = styled.div`
//     width: 300px;
//     height: 100px;
//     position: relative;
//     margin: 0 auto;
//     marginTop: 25%;
//     color: white;
//     fontSize: 30px;
//     fontFamily: 'Quicksand', sans-serif;
// `;
const Loader = () => {
  return (
    <div style={mystyle}>loading...</div>
  )
}

export default Loader