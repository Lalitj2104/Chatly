import { Skeleton, Stack } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
export const LayoutLoader = () => {
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item  sm={4} md={3}  height={"100%"}>
          <Skeleton variant="rectangular" height={"100vh"} animation="wave" />
        </Grid>
        <Grid item xs={12} sm={8}  lg={5} height={"100vh"}>
          <Stack spacing={"0.5em"}>
            {Array.from({ length: 15 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                height={"3rem"}
                animation="wave"
              />
            ))}
          </Stack>
        </Grid>
        <Grid item  md={3} lg={4} height={"100%"}>
          <Skeleton variant="rectangular" height={"100vh"} animation="wave" />
        </Grid>
      </Grid>
    </>
  );
};

//  <Grid container height={"calc(100vh - 4rem)"} justifyContent="space-between" spacing={"1rem"} sx={{
//           bgcolor: 'rgba(255, 255, 255, 0.1)',
//         }}>
//       <Grid
//         sm={4}
//         md={3}
//         sx={{ display: { xs: "none", sm: "block" }, bgcolor: 'rgba(255, 255, 255, 0.1)', }}
//         height={"100%"}>
//         <Skeleton variant="rectangular" height={"100vh"} animation="wave"/>
//       </Grid>
//       <Grid item  xs ={12} sm={8} lg={8} height={"100%"} sx={{
//           bgcolor: 'rgba(255, 255, 255, 0.1)',
//         }}>
//         <Stack spacing={"1rem"}>
//         {Array.from({length:10}).map((_,index)=>(
//             <Skeleton key={index} variant="rectangular" height={"5rem"}sx={{
//               borderRadius: '1rem', // add border radius to skeleton
//             }}/>

//         ))}
//         </Stack>
//       </Grid>
//       <Grid item md={3} lg={4} sx={{ display: { xs: "none", md: "block" }, bgcolor: 'rgba(255, 255, 255, 0.1)',

//     }}
//       height={"100%"}><Skeleton variant="rectangular" height={"100vh"}sx={{
//               borderRadius: '1rem', // add border radius to skeleton
//             }}/></Grid>
//     </Grid>
