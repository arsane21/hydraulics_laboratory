import React from 'react'
import DataTable from 'react-data-table-component';

const TableFixedPoint = ({Data}) => {

    const Columns = [
        {
            name: 'Iteración',
            selector: 'i',  
        },
        {
            name: 'y0',
            selector: 'y0',  
        },
        {
            name: 'f(y0)',
            selector: 'fy0',  
        },
        {
            name: 'y1',
            selector: 'y1',  
        },
        {
            name: 'Error relativo',
            selector: 'relError',  
        }
    ]

  return (
    <div style={{outline:'1px solid green'}} >
        <DataTable
        columns={Columns}
        data={Data}
        fixedHeader
        />
    </div>
  )
}

export default TableFixedPoint