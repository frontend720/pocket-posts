import styled from "styled-components";
import { IonCard, IonText, IonImg, IonButton } from "@ionic/react";

const Card = styled(IonCard)``;

const UsernameText = styled(IonText)`
  font-weight: 700;
  margin-left: 5px;
`;

const Timestamp = styled(IonText)``;

const PostText = styled(IonText)`
  text-align: left !important;
`;

const UserImage = styled(IonImg)`
  width: 45px;
`;

const MediaPlaybackRateButton = styled.button`
  padding: 0px 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(12, 12, 17, 0.63);
  font-weight: 600;
  color: #ffffff;
`;

const MoreButton = styled.button`
  width: 100%;
  // color: #ffffff;
  background: transparent !important;
  padding: 12px;
  font-size: 20px;
  padding-bottom: 30px;
`;

const InputContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 25px;
  border: 2px solid #44444485;
  margin-right: 6px;
  font-size: 18px;
  padding-left: 16px;
  font-family: "Ubuntu", sans-serif;
  letter-spacing: 1.25px;
`;

const AuthenticationForm = styled.form`
  width: 90%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
`;

const AuthenticationInput = styled.input`
  width: 100%;
  margin: ${({ margin }) => (margin ? margin : "16px auto")};
  font-family: 18px;
  padding: 6px;
  background: #dadada81;
  color: #ffffff;
  caret-color: #dadada;
  //   caret-shape: block
`;
const AuthenticationButton = styled.button`
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  padding: 6px;
  background: #444444;
  color: #dadada;
  border-radius: 5px;
  margin-top: 36px;
`;

const SearchButton = styled.button`
  background: transparent;
  font-size: 24px;
`;

export {
  Card,
  UsernameText,
  Timestamp,
  PostText,
  UserImage,
  MediaPlaybackRateButton,
  MoreButton,
  InputContainer,
  SearchInput,
  SearchButton,
  AuthenticationInput,
  AuthenticationButton,
  AuthenticationForm,
};
