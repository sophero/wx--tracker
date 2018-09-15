import React from 'react';

const Table = (props) => {
  console.log('props from Table:', props);
  
  const arr = props.data.map(loc => {
    return(
      <tr>
        <td></td>
      </tr>
    )
  });

  return (
    <table>
      <thead></thead>
      <tbody>
      </tbody>
    </table>
  )
}

export default Table;
