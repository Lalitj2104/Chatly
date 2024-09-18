import { Add, ArrowBack, Delete, Done, Edit } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "../components/styles/styledComponent";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/shared/UserItem";
const ConfirmDelete = lazy(() => import("../components/dialogs/ConfirmDelete"));
const AddMember = lazy(() => import("../components/dialogs/AddMember"));





const  isAddMember=false;

const Group = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    setIsMobileMenu((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenu(false);
  };
  const updateGroupName = () => {
    setIsEdit(false);
  };
  const confirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
  };
  const openAddMemberHandler = () => {};
  const removeMemberHandler = (id) => {

  };

  const closeConfirmDeleteDialog = () => setConfirmDeleteDialog(false);

  useEffect(() => {
   if(chatId){
    setGroupName(`Group Name ${chatId}`);
    setGroupNameUpdatedValue(`Group Name ${chatId}`);
   }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);
  const IconBtn = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
          }}
          onClick={navigateBack}
        >
          <ArrowBack />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            label="Group Name"
            variant="outlined"
            size="medium"
          />
          <IconButton onClick={updateGroupName}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="text"
        color="error"
        startIcon={<Delete />}
        onClick={confirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: "lavender",
        }}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} />
      </Grid>
      <Grid
        item
        sm={8}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtn}
        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Group Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100rem"}
              boxSizing={"border-box"}
              padding={{
                xs: "0.5rem",
                sm: "1rem",
                md: "1.5rem 4rem",
              }}
              spacing={"2rem"}
              // bgcolor={"lavenderblush"}
              height={"50vh"}
              overflow={"auto"}
            >

              {
                sampleUsers.map((user)=>
                 (<UserItem key={user._id} user={user} isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem 0.1rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                  handler={removeMemberHandler}
                  />)
                )
              }
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>

      {
          isAddMember && <Suspense fallback={<Backdrop open />}>
          <AddMember
            open={isAddMember}
            handleClose={openAddMemberHandler}
              alignItems={"center"}
            />
          </Suspense>
      }
      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDelete
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteDialog}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenu}
        onClose={handleMobileClose}
      >
        <GroupsList myGroups={sampleChats} chatId={chatId} w={"50vw"} />
      </Drawer>
    </Grid>
  );
};

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing="1rem" alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => {
        return <GroupListItem group={group} chatId={chatId} key={group._id} />;
      })
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);

export default Group;
