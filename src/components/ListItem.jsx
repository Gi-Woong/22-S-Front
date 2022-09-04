import { Box, Button } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ListItem(props) {
  console.log(props.pageState);
  const id = props.id;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const type = localStorage.getItem('type');
  return props.pageState === 'Board' ? (
    <Box
      sx={{ display: 'flex', textAlign: 'center', border: '0.5px solid', margin: '1.3%', borderRadius: '0.2em' }}
      onClick={() =>
        navigate(`/board/${props.id}`, {
          state: {
            id: props.id,
          },
        })
      }
    >
      <Box sx={{ width: '33%' }}>{props.title}</Box>
      <Box sx={{ width: '33%' }}>{props.artist}</Box>
      <Box sx={{ width: '33%' }}>{props.genre}</Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', textAlign: 'center', border: '0.5px solid', margin: '1.3%', borderRadius: '0.2em' }}>
      <Box sx={{ width: '33%' }}>{props.title}</Box>
      <Box sx={{ width: '33%' }}>{props.album}</Box>
      <Box sx={{ width: '33%' }}>
        {type === 'Producer' ? (
          <Button color="secondary" onClick={() => console.log('정산 컨트렉트는 여기!!')}>
            settle
          </Button>
        ) : (
          <Button
            color="secondary"
            onClick={async () =>
              await axios
                .get(
                  `http://${process.env.REACT_APP_BACKEND_URL}/api/v1/purchase/${id}
`,
                  {
                    headers: {
                      Authorization: token,
                    },
                  },
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                  // navigate('/403');
                })
            }
          >
            download
          </Button>
        )}
      </Box>
    </Box>
  );
}
