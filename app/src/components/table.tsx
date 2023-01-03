import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import rows from '../../../data/data.json'
import clsx from 'clsx';
import Stack from '@mui/material/Stack';

const columns: GridColDef[] = [
  { field: 'ip', headerName: 'IP', width: 140 },
  { field: 'mac', headerName: 'MAC',  width: 150 },
  { field: 'vendor', headerName: 'Vendor', width: 180 },
  { field: 'hostname', headerName: 'Hostname', width: 120 },
  { field: 'count', headerName: 'Count', width: 100 },
  { field: 'online', headerName: 'Online', width: 100,
    cellClassName: (params: GridCellParams<number>) =>
      clsx('super-app', {
        online: params.value,
        offline: !params.value,
      }),
  }
];

export default function DataTable() {
  return (
  <div style={{ width: '860px'}}>
       <h1>Network Data</h1>
       <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          {/* count total online devices */}
          <span><b>Online</b>: {rows.filter(row => row.online).length}</span> 
          {/* count total offline devices */}
          <span><b>Offline</b>: {rows.filter(row => !row.online).length}</span>
          {/* count total devices */}
          <span><b>Total</b> :{rows.length}</span>
        </Stack>
        <DataGrid 
          rows={rows}
          sx={{backgroundColor: 'white', borderRadius: 5,}}
          columns={columns}
          pageSize={25}
          autoHeight
          getRowId={(row) => row.ip}
          rowsPerPageOptions={[25]}
          checkboxSelection
          disableColumnMenu={false}
          />
    </div>
  );
}
