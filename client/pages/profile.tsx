import React from 'react';
import { GetServerSideProps } from 'next';
import profileService from '../services/profile.service';
import { getUidFromCookie, UidCannotBeParsedError } from '../services/cookie.service';
import styled from 'styled-components';

export const getServerSideProps: GetServerSideProps = async (context) => {
  let uid: string;
  try {
    uid = getUidFromCookie(context.req, context.res);
    const profile = await profileService.getProfileById(uid);
    return { props: { profile } };
  } catch (err) {
    console.error(err);
    return { redirect: { destination: '/login', permanent: false } }
  }
}

export default function Profile(props: any) {
  console.log({ props });
  const { profile } = props;

  return (<>
    <Container>
      <IconArea>
        <Icon>{profile.icon}</Icon>
      </IconArea>
      <DetailsSection>
        <Username>{profile.username}</Username>
        <StatList>
          <StatListItem><Count>53</Count>posts</StatListItem>
          <StatListItem><Count>53</Count>followers</StatListItem>
          <StatListItem><Count>53</Count>following</StatListItem>
        </StatList>
        <Summary>{profile.summary}</Summary>
      </DetailsSection>
    </Container>
  </>)
}

const Container = styled.div`
  display: flex;
  flex: 1;
  max-width: 700px;
  margin: 0 auto;
  margin-bottom: 11em;
`;

const IconArea = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
`;

const Icon = styled.div`
  width: 150px;
  height: 150px;
  font-size: 150px;
`;

const DetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Username = styled.h2`
  font-size: 28px;
  font-weight: 300;
  padding: 0;
  margin: 0 0 20px 0;
`;

const StatList = styled.ul`
  display: flex;
  padding: 0;
  margin: 0 0 20px 0;
`;

const StatListItem = styled.li`
  font-size: 16px;
  list-style-type: none;
  margin-right: 40px;
  padding: 8px 0;
`;

const Count = styled.span`
  font-weight: 700;
`;

const Summary = styled.div`

`;