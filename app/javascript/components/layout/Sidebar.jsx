// import {Divider, Drawer, ListItem, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
// import React from "react";
// import {List} from "@mui/icons-material";
// import InboxIcon from '@mui/icons-material/Inbox';
// import MailIcon from '@mui/icons-material/Mail';
//
// const SideBar = () => {
//     const drawerWidth = 240
//     return (
//         <Drawer
//             sx={{
//                 width: drawerWidth,
//                 flexShrink: 0,
//                 '& .MuiDrawer-paper': {
//                     width: drawerWidth,
//                     boxSizing: 'border-box',
//                 },
//             }}
//             variant="persistent"
//             anchor="left"
//         >
//             <Toolbar />
//             <Divider />
//             <List>
//                 {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//             <Divider />
//             <List>
//                 {['All mail', 'Trash', 'Spam'].map((text, index) => (
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                         </ListItemIcon>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Drawer>
//     )
// }
//
// export default SideBar
