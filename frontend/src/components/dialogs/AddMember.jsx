import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMember = ({ addMember, isLoadingAddMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers);
    const [selectMembers, setSelectMembers] = useState([]);
  
  
  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };
  
  const closeHandler = () => {}
  const addMemberSubmitHandler = () => {    }






  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {sampleUsers.length > 0 ? (
            sampleUsers.map((user) => (
              <UserItem key={user.id} user={user} handler={selectMemberHandler} 
                isAdded={
                    selectMembers.includes(user._id)
                }
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No users found</Typography>
          )}
        </Stack>
        <DialogActions direction="row">
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Add
          </Button>
        </DialogActions>
      </Stack>
    </Dialog>
  );
};

export default AddMember;
