import {useState, useRef} from 'react';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import RecyclingIcon from '@mui/icons-material/Recycling';
import "./MainPage.css";

type recycleRequestsType = {
  id: number;
  status: string;
  deliverName: string;
  bottlesAmount: number;
}[];

const MainPage = () => {
    // take picture
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const inputRef = useRef();
    const [previousRequests, setPreviousRequests] = useState<recycleRequestsType>([
      {
        id: 1,
        status: "בטיפול",
        deliverName: "דויד",
        bottlesAmount: 59
      }
    ]);

    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
        setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleTakePicture = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          const videoElement = document.createElement('video');
          videoElement.srcObject = stream;
          videoElement.play();
    
          const canvas = document.createElement('canvas');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
          const dataUrl = canvas.toDataURL('image/png');
          setSelectedImage(dataUrl);
    
          stream.getVideoTracks()[0].stop();
        } catch (error) {
          console.error('Error accessing camera:', error);
        }
    };

  return (
    <div className='buisiness-main-page'>
      
      



        <div className='buisiness-main-page-header'>
            <h2> מכולת יוסי </h2>
            <h2 className='main-page-hello-title'> !שלום </h2>
            <Avatar sx={{ marginTop: "2vh", marginLeft: "5vw"}}>
                <AccountCircleIcon />
            </Avatar>
        </div>
        <h5 className="open-req-title">בקשות פתוחות</h5>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {previousRequests.map((reqObj) => (
          <ListItem
            key={reqObj.id}
            disableGutters
            // secondaryAction={
            //   <RecyclingIcon sx={{ color: "#a0a0a0"}}/>
            // }
          >
            <ListItemText sx={{direction: "rtl", fontSize: "10px", direction: "flex", flexDirection: "row", justifyContent: "center"}}
            primary={`מספר הבקבוקים: ${reqObj.bottlesAmount} שם השליח: ${reqObj.deliverName} סטטוס הבקשה: ${reqObj.status}`} 
            />
          </ListItem>
          ))}
        </List>
        <div className='main-page-req-btn'>
            <input ref={inputRef} type="file" accept="image/*;capture=camera" onChange={handleImageChange} style={{display: "none"}} title='פתח בקשה לאיסוף'/>
            <Button  variant='contained' sx={{ marginLeft: "14.5vw", marginTop: "10vh", width: "280px"}} onClick={() => {
inputRef?.current?.click();
            }} onChange={handleImageChange}>פתח בקשה לאיסוף</Button>
            {selectedImage ? <img style={{ marginLeft: "14.5vw", width: "280px", height: "280px"}} src={selectedImage} alt="Selected" />
            :
            <Button variant="outlined" onClick={handleTakePicture} sx={{ marginLeft: "14.5vw", width: "280px", height: "280px"}}> <CameraAltIcon sx={{width: "60px", height: "60px"}}/> </Button>
            }
        </div>
    </div>
  )
}

export default MainPage;