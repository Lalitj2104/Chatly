import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import {Table} from '../../components/shared/Table'
import { dashBoardData } from '../../constants/sampleData'
import { fileFormat, transformImage } from '../../lib/features'
import moment from 'moment'
import { Avatar, Box, Stack } from '@mui/material'
import  RenderAttachment from '../../components/shared/RenderAttachment'

const columns=[{
  field:"id",
  headerName:"ID",
  headerClassName:"table-header",
  width:200
},
{
  field:"attachments",
  headerName:"ATTACHMENTS",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>{
      const {attachments}=params.row;
      return attachments?.length>0? attachments.map((i)=>{
          const url=i.url;
          const file=fileFormat(url);
        return <Box>
          <a href={url}
          download
          target='_blank'
          style={{
            color:"black",
            textDecoration:"none"
          }}
          >
            {RenderAttachment(file,url)}
          </a>
        </Box>
  })
      :"No Attachments"

    
  }
},
{
  field:"content",
  headerName:"CONTENT",
  headerClassName:"table-header",
  width:400
},
{
  field:"sender",
  headerName:"SENT BY",
  headerClassName:"table-header",
  width:200,
  renderCell:(params)=>
    <Stack direction={"row" } spacing={"1rem"} alignItems={"center"}>
      <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
      <span>{params.row.sender.name}</span>
    </Stack>
},
{
  field:"chat",
  headerName:"CHAT",
  headerClassName:"table-header",
  width:220
},
{
  field:"groupChat",
  headerName:"GROUP CHAT",
  headerClassName:"table-header",
  width:200
},
{
  field:"createdAt",
  headerName:"Time",
  headerClassName:"table-header",
  width:250
}
]

const MessageManagement = () => {

  const [rows,setRows] =useState([]);
  useEffect(()=>{
    
    setRows(dashBoardData.messages.map((i)=>({
      ...i,
      id:i._id,
      
      sender:{
        name:i.sender.name,
        avatar:transformImage(i.sender.avatar)
      },
      createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a")
      
    })))
  },[])
  return (
    <AdminLayout>
        <Table heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>
    </AdminLayout>
  )
}

export default MessageManagement