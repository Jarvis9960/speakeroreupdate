import React from 'react';
import './TeamMembers.css';
import axios from 'axios';
import { useState } from 'react';
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

function createData(name, calories, fat, carbs, protein, action) {
  return { name, calories, fat, carbs, protein, action };
}

const rows = [
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
  createData(123456789, 'abc@gmail.com', 'yearly', '24.01.2019', '24.01.2020', 'backlist'),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TeamMembers() {

  const [teamMemberData, setTeamMemberData] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [makeAdminId, setAdminId] = useState('');
  const [makeUserId, setmakeUserId] = useState('');

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const maketeammembertouser = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/maketeammembertouser",
      withCredentials: true,
      data: {
        userId: makeUserId,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(!loading)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const maketeammembertoadmin = () => {
    axios({
      method: "patch",
      url: "https://api.speakerore.com/api/maketeammembertoadmin",
      withCredentials: true,
      data: {
        userId: makeAdminId,
      },
    })
      .then((res) => {
        console.log(res.data);
        setLoading(!loading)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    axios ({
      method: "get",
      url: "https://api.speakerore.com/api/getallteammembers",
      withCredentials: true,
    })
      .then((res) => {
        setTeamMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    axios ({
      method: "get",
      url: "https://api.speakerore.com/api/getallteammembers",
      withCredentials: true,
    })
      .then((res) => {
        setTeamMemberData(res.data);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 404){
          setTeamMemberData('')
        }
      });
  }, [loading]);

  return (
    <div className="team-members-container">
      <div className="search-bar">
        {/* <BiSearchAlt className="search-icon" /> */}
        <input
          placeholder="Search via subscription plan"
          className="search-input"
        />
      </div>
      <div className="member-list">
      {teamMemberData ? teamMemberData.savedTeamMember.map((row) => (
          <div className="member-card" key={row.alphaUnqiueId}>
            <div className="member-info">
              <div className="info-row">
                <span className="info-label">USER ID |</span>
                <span className="info-value">{row.alphaUnqiueId}</span>
              </div>
              <div className="info-row">
                <span className="info-value">{row.calories}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email |</span>
                <span className="info-value">{row.email}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Role|</span>
                <span className="info-value">{row.role}</span>
                {/* <span className="info-label">Expiry Date|</span>
                <span className="info-value">{row.carbs}</span> */}
              </div>
              <div className="button-group">
                <button className="backlist-button" onClick={() => {
              
              handleClickOpen();
              setmakeUserId(row._id)
            }} style={{ cursor:'pointer'}}>Make User</button>
                <button className="make-member-button" onClick={() => {
               
               handleClickOpen2();
               setAdminId(row._id)
             }} style={{background:'#24754F', cursor:'pointer'}}>Make Admin</button>
              <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Are You Sure You Want To Make This Member a Normal User"}
                        </DialogTitle>
      
                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleClose();
                            }}
                            autoFocus
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              maketeammembertouser();
                            }}
                            autoFocus
                          >
                            Make User
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle id="responsive-dialog-title">
                          {"Do you want to make this Member an Admin"}
                        </DialogTitle>
      
                        <DialogActions>
                          <Button
                            onClick={() => {
                              handleClose2();
                            }}
                            autoFocus
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose2();
                              maketeammembertoadmin();
                            }}
                            autoFocus
                          >
                            Make Admin
                          </Button>
                        </DialogActions>
                      </Dialog>
              </div>
            </div>
            <hr className="divider" />
          </div>
        )) : <></>}
      </div>
    </div>
  );
}
