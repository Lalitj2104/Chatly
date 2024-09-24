import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Table } from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import { dashBoardData } from '../../constants/sampleData'
import {transformImage} from '../../lib/features'

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200
},
{
  field:"avatar",
  headerName:"AVATAR",
  headerClassName:"table-header",
  width:150,
  renderCell:(params)=><Avatar alt={params.row.name} source={params.row.avatar}/>
},
{
  field:"name",
  headerName:"NAME",
  headerClassName:"table-header",
  width:200
},
{
  field:"username",
  headerName:"USERNAME",
  headerClassName:"table-header",
  width:200
},
{
  field:"friends",
  headerName:"FRIENDS",
  headerClassName:"table-header",
  width:200
},
{
  field:"groups",
  headerName:"GROUPS",
  headerClassName:"table-header",
  width:200
}
]
const UserManagement = () => {
  const [rows,setRows]=useState([]);

useEffect(()=>{
  setRows(dashBoardData.users.map(i=>({...i,id:i._id,avatar:transformImage(i.avatar,50)})));
},[])


  return (
    <AdminLayout>
        <Table heading={"All Users"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default UserManagement