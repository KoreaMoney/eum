import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth, upload } from '../../firebase/Firebase';

export default function Profile(params: any) {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState('/assets/profileAvatar.png');

  function handleChange(e: any) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser?.photoURL);
    }
    console.log('123123', photoURL);
  }, [currentUser]);
  console.log('123123', photoURL);

  return (
    <UserProfileImgContainer>
      <MyImageWrapper>
        <MyImage src={photoURL} alt="User Image" />
      </MyImageWrapper>
      <InputImgFile type="file" onChange={handleChange} />
      <ImgSubmitButton disabled={loading || !photo} onClick={handleClick}>
        확인
      </ImgSubmitButton>
    </UserProfileImgContainer>
  );
}

const UserProfileImgContainer = styled.div``;

const MyImageWrapper = styled.div`
  background-color: lightgray;
  margin: 20px auto;
  width: 202px;
  height: 202px;
  border: 2px solid lightgray;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  text-align: center;
  object-fit: cover;
  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
    color: #656565;
  }
`;

const InputImgFile = styled.input`
  margin-left: 52%;
  top: 220px;
  background-color: #656565;
  color: #fff;
  position: absolute;
  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
    color: #656565;
  }
`;

const ImgSubmitButton = styled.button`
  width: 62px;
  height: 28px;
  font-size: 100%;
  background-color: #656565;
  color: #fff;
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
    color: #656565;
  }
  &:disabled {
    cursor: auto;
    background-color: #e6e6e6;
    color: #656565;
  }
  margin-left: 52%;
  top: 248px;
  position: absolute;
`;
