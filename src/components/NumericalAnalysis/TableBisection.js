import React from 'react'
import DataTable from 'react-data-table-component';

const TableBisection = ({Data}) => {

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
            name: 'f(y1)',
            selector: 'fy1',  
        },
        {
            name: 'ym',
            selector: 'ym',  
        },
        {
            name: 'f(ym)',
            selector: 'fym',  
        }
    ];
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

export default TableBisection;