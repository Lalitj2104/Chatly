import {
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";


const NewGroup = () => {
  const groupName = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectMembers, setSelectMembers] = useState([]);

  const submitHandler = () => {};

  const closeHandler = () => {};

  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id) ? prev.filter((i) => i != id) : [...prev, id]
    );
  };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle variant="h4" textAlign={"center"}>
          New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant={"caption"}>Members</Typography>

        <Stack>
          {members.map((i) => (
            <UserItem
              key={i._id}
              user={i}
              handler={selectMemberHandler}
              isAdded={selectMembers.includes(i._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
