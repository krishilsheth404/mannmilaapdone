import React, { useEffect, useState } from "react";
import { getCurrentUserDetails, logOut } from "../../../utils/userDetails";
import { Card, CardBody, Flex, Box, Stack, Heading, Button, Image, Center,Text,UnorderedList,ListItem, Divider} from '@chakra-ui/react';
import Image1 from '../../images/Banner.png';
import AboutusImg from '../../images/design1.png'
import Image2 from '../../images/MannMilap.png';
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [userInfo, setUserInfo] = useState(false);
  const navigate=useNavigate();

  // const getDetails = async () => {
  //   try {
  //     const user = await getCurrentUserDetails();
  //     if (!user) {
  //       window.location.href = "/login";
  //     } else {
  //       setUserInfo(user.data.user);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     logOut();
  //     window.location.href = "/login";
  //   }
  // };

  // useEffect(() => {
  //   getDetails();
  // }, []);

  return (
    <div className="p-10">
      {/* {JSON.stringify(userInfo)} */}
      <Card h='fit-content' box-shadow ='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);' variant='unstyle'>
        <CardBody p={10} style={{backgroundColor:'',borderRadius:'15px'}} marginBottom="30px">
          <Flex justify='center' flexWrap="wrap">
          <Image
                src={Image2}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
                            <Image
                src={Image1}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
          </Flex>
        </CardBody>
        {/* <Text fontFamily='serif' textAlign='center' fontSize='xx-large' marginTop='50px' marginBottom="20px">Find Your Perfect Partner Clicks Away</Text> */}
        <Button variant='solid' colorScheme='orange' w='100%' maxWidth="400px" style={{margin:"auto"}} onClick={()=>navigate('/register')}>Register Now</Button>
      </Card>
      <Card marginTop='20px' padding='10px' variant='unstyle'>
           <Text fontWeight='500' fontSize='xxx-large' textAlign='center' fontFamily='cursive'>About Us</Text>
           <div style={{backgroundColor:'grey',borderRadius:'100%',width:'20%',height:'2px',margin:"auto"}}></div>
           <Flex justifyContent='center' alignItems='center' variant='unstyle' >
           <Image
                src={AboutusImg}
                alt='Green double couch with wooden legs'
                borderRadius='100%'
                w='10%'
              />
           <Card w='100%' variant='unstyle'>
           <Text textAlign='center' marginTop="30px" fontFamily='sans-serif' fontSize='larger' justifyContent='left' marginLeft='10px' marginRight='10px'><span style={{fontWeight:'800',color:'orange'}}>"MannMilap"</span> is  matchmaking platform exclusively for the Jain community. Our platform is designed to facilitate meaningful connections and empower individuals within the Jain community find compatible life partners who share their values, beliefs, aspirations.The primary goal of MannMilap is to spread happiness and strengthen bonds within the Jain community, without functioning as a matrimonial bureau.</Text>
           </Card>

           <Image
                src={AboutusImg}
                alt='Green double couch with wooden legs'
                borderRadius='100%'
                w='10%'
              />
           </Flex>

      </Card>
      <Card marginTop='20px' padding='10px' variant='unstyle'>
      <Text fontWeight='500' fontSize='xxx-large' textAlign='center' fontFamily='cursive'>Our Categories</Text>
      <div style={{backgroundColor:'grey',borderRadius:'100%',width:'20%',height:'2px',margin:"auto",marginBottom:'10px'}}></div>
           
           <Text textAlign='center' fontFamily='sans-serif' fontSize='larger' w='100%' margin='auto' marginBottom="20px">We have <span style={{fontWeight:'600',color:'orange'}}>23</span> unique categories based on profession, age group, location etc  You can join any number of groups but are required to pay the fee accordingly.</Text>

           <Flex padding='5px'  flexWrap="wrap" margin="auto" >
           <UnorderedList padding='2px' marginRight='10px' fontSize='large' fontFamily='serif'  styleType="none">
                <ListItem>MannMilap Digital Group</ListItem>
                <ListItem>MannMilap Apple Group</ListItem>
                <ListItem>MannMilap Deravasi Group</ListItem>
                <ListItem>MannMilap Patanghad Group</ListItem>
                <ListItem>MannMilap NRI Group</ListItem>
            </UnorderedList>
            <UnorderedList padding='2px' marginRight='10px' fontSize='large' fontFamily='serif'  styleType="none">
                <ListItem>MannMilap Sthankwasi Group</ListItem>
                <ListItem>MannMilap CA & Engineers Group</ListItem>
                <ListItem>MannMilap Only Doctors Group</ListItem>
                <ListItem>MannMilap South Mumbai(Worli to Colaba) Group</ListItem>
                <ListItem>MannMilap H1B Group</ListItem>
            </UnorderedList>
            <UnorderedList padding='2px' marginRight='10px' fontSize='large' fontFamily='serif'  styleType="none">
                <ListItem>MannMilap Triple Financial Group</ListItem>
                <ListItem>MannMilap Mangal Group</ListItem>
                <ListItem>MannMilap Low Education Big Business Group</ListItem>
                <ListItem>MannMilap Dharmik Group</ListItem>
                <ListItem>MannMilap Canada Group</ListItem>
            </UnorderedList>
            <UnorderedList padding='2px' marginRight='18px' fontSize='large' fontFamily='serif'  styleType="none">
                <ListItem>MannMilap Height Body Group</ListItem>
                <ListItem>MannMilap Divorcee Group</ListItem>
                <ListItem>MannMilap Jain Deravasi Friendship Group</ListItem>
                <ListItem>MannMilap Vaishanav Group</ListItem>
                <ListItem>MannMilap Bigger Age Group</ListItem>
                <ListItem>MannMilap America Group</ListItem>
                <ListItem>MannMilap Australia New-Zealand Group</ListItem>
            </UnorderedList>
           </Flex>
           <Button width='100%' maxWidth="400px" margin='auto' marginTop='20px' colorScheme="orange"><a href="https://drive.google.com/file/d/16piKk-BB_PeSTo9Ux-h2TvEAAjNDJkyb"target="_blank">Click Here to know more about Groups</a></Button>
      </Card>

      <Card marginTop='20px' padding='10px'>

           <Text fontWeight='500' fontSize='xxx-large' textAlign='center' fontFamily='cursive'>How MannMilap Works</Text>
           <div style={{backgroundColor:'grey',borderRadius:'100%',width:'20%',height:'2px',margin:"auto",marginBottom:'10px'}}></div>
           <Flex justifyContent='space-evenly' padding='50px' flexWrap="wrap">
              <Card padding='10px' margin='10px' w="100%" bg="orange.400" maxW="300px">
                  <Flex direction='column'>
                    <Text  textAlign='center' fontSize='x-large' fontWeight='600' color='white' fontFamily='sans-serif'>Create Account</Text>
                    <Text color='white' textAlign="center" fontFamily='serif'>Create Account with all the information correctly filled , Ensure all the required fields are filled.Once done proceed to upload biodata</Text>
                  </Flex>
              </Card>

              <Card padding='10px' margin='10px'  w="100%" bg="orange.400" maxW="300px">
                  <Flex direction='column'>
                    <Text textAlign='center' fontSize='x-large' fontWeight='600' color='white' fontFamily='sans-serif'>Upload BioData</Text>
                    <Text color='white' textAlign="center" fontFamily='serif'>Upload Biodata on the website which will be circulated, Boys share their biodata every Saturday , while Girls share their every Sunday.</Text>
                  </Flex>
              </Card>

              <Card padding='10px' margin='10px'  w="100%" bg="orange.400" maxW="300px">
                  <Flex direction='column'>
                    <Text  textAlign='center' fontSize='x-large' fontWeight='600' color='white' fontFamily='sans-serif'>Select Groups</Text>
                    <Text color='white' textAlign="center" fontFamily='serif'>We have 23 Unique categories based on profession,age group,location,etc. You can join any number of groups but are required to pay the fee accordingly</Text>
                  </Flex>
              </Card>

              <Card padding='10px' margin='10px' className="bg-[var(--yellow)]" bg="orange.400" w="100%" maxW="300px">
                  <Flex direction='column'>
                    <Text  textAlign='center' fontSize='x-large' fontWeight='600' color='white' fontFamily='sans-serif'>Create Profile</Text>
                    <Text color='white' textAlign="center" fontFamily='serif'>once approved you will be provided with password with which you can login your Profile.</Text>
                  </Flex>
              </Card>

           </Flex>

           <Card marginTop='20px' padding='10px' variant='unstyle'>
           <Text fontWeight='500' fontSize='xxx-large' textAlign='center' fontFamily='cursive'>Contact Us</Text>
           <div style={{backgroundColor:'grey',borderRadius:'100%',width:'20%',height:'2px',margin:"auto"}}></div>
           <Flex justifyContent='center' alignItems='center' variant='unstyle' flexDirection="column">
               
               <Button colorScheme="orange" marginTop='10px'><Text fontSize='x-large' fontFamily='serif' marginTop='5px'>Nisha Shah - +91 9821123191</Text></Button>
               <Button colorScheme="orange" marginTop='10px'><Text fontSize='x-large' fontFamily='serif' marginTop='5px'>Parthiv Shah - +91 9137240341</Text></Button>
               <Button colorScheme="orange" marginTop='10px'><Text fontSize='x-large' fontFamily='serif' marginTop='5px'>mannmilap.official@gmail.com</Text></Button>

           </Flex>
      </Card>

      </Card>


    </div>
  );
};

export default Landing;
