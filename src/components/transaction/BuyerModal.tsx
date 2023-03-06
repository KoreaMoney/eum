import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { viewModalAtom } from '../../atom';
import { onSalePostType } from '../../types';
import { CustomModal } from '../modal/CustomModal';

const BuyerModal = ({ newSalePosts }: { newSalePosts: onSalePostType[] }) => {
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useRecoilState(viewModalAtom);
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = isModalActive ? 'hidden' : 'auto';
      return () => {
        body.style.overflow = 'auto';
      };
    }
  }, [isModalActive]);

  const getTimeGap = (posting: number) => {
    const time = new Date(posting);
    const mm = time.toJSON().substring(5, 7);
    const dd = time.toJSON().substring(8, 10);
    const result = `${mm.replace(/^0+/, '')}월 ` + `${dd.replace(/^0+/, '')}일`;
    return result;
  };
  console.log(
    'newSalePosts?.[0].buyerNickName: ',
    newSalePosts?.[0]?.buyerNickName
  );
  console.log('프롭스로가져옴: ', newSalePosts);

  return (
    <>
      {isModalActive ? (
        <CustomModal
          modal={isModalActive}
          setModal={setIsModalActive}
          width="672"
          height="719"
          element={
            <>
              <Container>
                <ModalTitle>구매한 사람들</ModalTitle>
                <ModalContent>
                  <span>수제 딸기우유 슬라임 팔아요</span> 를 구매한
                  사람들이에요.
                </ModalContent>
                <ModalContent>
                  바로가기 버튼을 누르면 진행 상황을 수정할 수 있어요.
                </ModalContent>
                <ListContainer>
                  <ListTitleContainer>
                    <ListDay>일시</ListDay>
                    <ListNickName>닉네임</ListNickName>
                    <ListPrice>금액</ListPrice>
                  </ListTitleContainer>
                  <ListContentsContainer>
                    {newSalePosts.map((salePosts) => {
                      return (
                        <ListContentContainer>
                          <Day>{getTimeGap(salePosts?.createdAt)}</Day>
                          <NickName>{salePosts?.buyerNickName}</NickName>
                          <Price>{salePosts?.price}원</Price>
                          <MoveButton
                            onClick={() =>
                              navigate(
                                `/detail/${salePosts?.category}/${salePosts?.postsId}/${salePosts?.buyerUid}/${salePosts?.id}`
                              )
                            }
                          >
                            바로가기
                          </MoveButton>
                        </ListContentContainer>
                      );
                    })}
                  </ListContentsContainer>
                </ListContainer>
              </Container>
            </>
          }
        />
      ) : (
        ''
      )}
    </>
  );
};

export default BuyerModal;

const ComponentSpace = styled.div`
  color: black;
`;

const Container = styled.div`
  width: 512px;
  height: 559px;
  margin: 0 auto;
  text-align: center;
`;

const ModalTitle = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.title32};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  line-height: ${(props) => props.theme.lineHeight.title32};
  margin-bottom: 32px;
`;

const ModalContent = styled.p`
  color: ${(props) => props.theme.colors.gray20};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
  margin-bottom: 8px;

  span {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSize.title18};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    line-height: ${(props) => props.theme.lineHeight.title18};
  }
`;

const ListContainer = styled.div`
  width: 512px;
  height: 412px;
`;

const ListTitleContainer = styled.div`
  height: 48px;
  padding-bottom: 24px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray20};
  display: flex;
  gap: 8px;
  margin-top: 32px;
  text-align: left;
  margin-bottom: 24px;
`;

const ListDay = styled.p`
  width: 120px;
  color: ${(props) => props.theme.colors.gray20};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
`;
const ListNickName = styled.p`
  width: 160px;
  color: ${(props) => props.theme.colors.gray20};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
`;
const ListPrice = styled.p`
  width: 216px;
  color: ${(props) => props.theme.colors.gray20};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
`;

const ListContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ListContentContainer = styled.div`
  display: flex;
  gap: 8px;
  text-align: left;
  align-items: center;
`;

const Day = styled.p`
  width: 120px;
  color: ${(props) => props.theme.colors.gray30};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
`;
const NickName = styled.p`
  width: 160px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
`;
const Price = styled.p`
  width: 104px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSize.title16};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title16};
`;

const MoveButton = styled.button`
  width: 88px;
  height: 28px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.gray20};
  color: ${(props) => props.theme.colors.gray20};
  border-radius: 10px;
  font-size: ${(props) => props.theme.fontSize.title14};
  font-weight: ${(props) => props.theme.fontWeight.regular};
  line-height: ${(props) => props.theme.lineHeight.title14};
  cursor: pointer;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.orange02Main};
    color: ${(props) => props.theme.colors.orange02Main};
    border-radius: 10px;
  }
`;