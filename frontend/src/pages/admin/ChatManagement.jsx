import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Table } from '../../components/shared/Table'
import { Avatar, Stack } from '@mui/material'
import { dashBoardData } from '../../constants/sampleData'
import {transformImage} from '../../lib/features'
import AvatarCard from '../../components/shared/AvatarCard'
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
  width:300
},
{
  field:"totalMembers",
  headerName:"TOTAL MEMBERS",
  headerClassName:"table-header",
  width:120
},
{
  field:"members",
  headerName:"MEMBERS",
  headerClassName:"table-header",
  width:400, 
  renderCell:(params)=><AvatarCard  max={100}avatar={params.row.members}/>

},
{
  field:"totalMessages",
  headerName:"TOTAL MESSAGES",
  headerClassName:"table-header",
  width:200,
},
{
  field:"Creator",
  headerName:"CREATED BY",
  headerClassName:"table-header",
  width:250,
  renderCell:(params)=>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}> 
      <Avatar  src={params.row.creator.avatar}/>
      <span>{params.row.creator.name}</span>
    </Stack>
}
]
const ChatManagement = () => {
  const [rows,setRows]=useState([]);

useEffect(()=>{
  setRows(dashBoardData.chats.map((i)=>({
    ...i,
    id:i._id,
    avatar:i.avatar.map(i=>transformImage(i,50)),
    members:i.members.map(i=>transformImage(i.avatar,50)),
    creator:{
      name:i.creator.name,
      avatar:transformImage(i.creator.avatar,50)
    }
  })))
},[])


  return (
    <AdminLayout>
        <Table heading={"All Messages"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}


export default ChatManagement