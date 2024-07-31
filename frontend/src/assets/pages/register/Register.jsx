import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { FormControl, FormLabel } from "@chakra-ui/react";

import axios from "axios";

import { useToast } from "@chakra-ui/react";

const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const toast = useToast();
  const finalRef = React.useRef(null);

  const [name, setName] = useState("");
  const [candidateMobile, setCandidateMobile] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [highestLevelOfEducation, setHighestLevelOfEducation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [religion, setReligion] = useState("");
  const [groups, setGroups] = useState([]);
  const [caste, setCaste] = useState("");
  const [address, setAddress] = useState("");
  const [biodata, setBiodata] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [file, setFile] = useState(false);

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const backStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleGroupChange = (value) => {
    setGroups(value);
  };

  const groupOptions = [
    "Mann Milaap Digital Group",
    "Mann Milaap Apple Group",
    "Mann Milaap Deravasi Group",
    "Patanghad Group",
    "Only Sthanakwasi Group (1)",
    "Only Sthanakwasi Group (2)",
    "Only Canada Group",
    "H1B Visa Group",
    "NRI Group (Citizenship and Green Card Holder)",
    "Far East Group",
    "Mann Milaap Height Body Group",
    "Mann Milaap Vaishnav Group (1)",
    "Mann Milaap Vaishnav Group (2)",
    "Mann Milaap Triple Financial Group",
    "Mann Milaap CA & Engineers Group",
    "Mann Milaap Only Doctors Group",
    "Mann Milaap Divorcee Group",
    "Mann Milaap Broken Goldhana Group",
    "Mann Milaap UK Europe Group",
    "Mann Milaap Handicapped Group",
    "Mann Milaap Bigger Age Group",
    "Mann Milaap 35-65 Group",
    "Mann Milaap Biggest Age Group",
    "Mann Milaap Mangal Group",
    "Mann Milaap Out of Mumbai Group",
    "South Mumbai (Worli to Colaba) Group",
    "Mann Milaap Free Group",
    "Mann Milaap Low Education Big Business Group",
    "Mann Milaap Medical Group",
    "Mann Milaap Dharmik Group",
    "Mann Milaap Only Surat Group",
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Clicked handleSubmit");
    if (!biodata) return;
    // console.log("Clicked handleSubmit2");

    const formData = new FormData();
    formData.append("file", biodata);
    formData.append("name", name);
    formData.append("candidateMobile", candidateMobile);
    formData.append("whatsappNumber", whatsappNumber);
    formData.append("email", email);
    formData.append("birthdate", birthdate);
    formData.append("gender", gender);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("highestLevelOfEducation", highestLevelOfEducation);
    formData.append("occupation", occupation);
    formData.append("religion", religion);
    formData.append("caste", caste);
    formData.append("address", address);
    groups.forEach((group, index) => {
      formData.append(`groupRequest[${index}]`, group);
    });
    // console.log("Clicked handleSubmit3");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            mail: email,
          },
        }
      );
      console.log(response.data);
      toast({
        title: "Registration Successful.",
        description: "You will get notified when the request is approved",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Something Went wrong",
        description: "Please check the input data or try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const steps = [
    {
      label1: "Name",
      value1: name,
      onChange1: (e) => setName(e.target.value),
      label2: "Mobile Number",
      value2: candidateMobile,
      onChange2: (e) => setCandidateMobile(e.target.value),
      two_labels: "Yes",
    },
    {
      label1: "WhatsApp Number",
      value1: whatsappNumber,
      onChange1: (e) => setWhatsappNumber(e.target.value),
      label2: "Email",
      value2: email,
      onChange2: (e) => setEmail(e.target.value),
      two_labels: "Yes",
    },
    {
      label1: "Birthdate",
      value1: birthdate,
      onChange1: (e) => setBirthdate(e.target.value),
      label2: "Gender",
      value2: gender,
      onChange2: (e) => setGender(e.target.value),
      two_labels: "Yes",
    },
    {
      label1: "Father Name",
      value1: fatherName,
      onChange1: (e) => setFatherName(e.target.value),
      label2: "Mother Name",
      value2: motherName,
      onChange2: (e) => setMotherName(e.target.value),
      two_labels: "Yes",
    },
    {
      label1: "Highest Level Of Education",
      value1: highestLevelOfEducation,
      onChange1: (e) => setHighestLevelOfEducation(e.target.value),
      label2: "Occupation",
      value2: occupation,
      onChange2: (e) => setOccupation(e.target.value),
      two_labels: "Yes",
    },
    {
      label1: "Religion",
      value1: religion,
      onChange1: (e) => setReligion(e.target.value),
      label2: "Caste",
      value2: caste,
      onChange2: (e) => setCaste(e.target.value),
      two_labels: "Yes",
    },
    {
      label1: "Address",
      value1: address,
      onChange1: (e) => setAddress(e.target.value),
    },
    {
      label1: "Biodata",
      value1: biodata,
      onChange1: (e) => setBiodata(e.target.files[0]), // Change to handle file input
      two_labels: "Yes",
      isFileInput: true, // Add a flag to indicate this step contains a file input
    },
    {
      label1: "Select Groups",
      value1: groups,
      onChange1: handleGroupChange,
      extra: (
        <CheckboxGroup value={groups} onChange={handleGroupChange}>
          <Stack mt={4} mb={4}>
            {groupOptions.map((group) => (
              <Checkbox key={group} value={group}>
                {group}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      ),
    },
  ];

  const finishRegistration = () => {
    const registrationData = {
      name: name,
      candidateMobile: candidateMobile,
      whatsappNumber: whatsappNumber,
      email: email,
      birthdate: birthdate,
      gender: gender,
      fatherName: fatherName,
      motherName: motherName,
      highestLevelOfEducation: highestLevelOfEducation,
      occupation: occupation,
      religion: religion,
      groups: groups,
      caste: caste,
      address: address,
    };

    console.log(
      "Registration Data: ",
      JSON.stringify(registrationData, null, 2)
    );

    axios
      .post("/api/registration", registrationData)
      .then((response) => {
        // console.log('Registration successful:', response.data);
        toast({
          title: "Registration Successful.",
          description: "You will get notified when the request is approved",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error("There was an error registering:", error);
        toast({
          title: "Something Went wrong",
          description: "Please the input data or try again",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });

    onClose();
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-70px)]">
      <Button colorScheme="orange" onClick={onOpen}>
        Fill Up Registeration Form
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"4xl"}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            {steps[activeStep] && (
              <>
                <FormControl mt={2}>
                  <FormLabel>{steps[activeStep].label1}</FormLabel>
                  {steps[activeStep].isFileInput ? (
                    <Input
                      type="file"
                      onChange={steps[activeStep].onChange1} // Use onChange2 to handle file input
                    />
                  ) : (
                    <Input
                      value={steps[activeStep].value1}
                      onChange={steps[activeStep].onChange1}
                      placeholder={steps[activeStep].label1}
                    />
                  )}
                  {steps[activeStep].extra && steps[activeStep].extra}
                </FormControl>

                {steps[activeStep].two_labels &&
                  !steps[activeStep].isFileInput && (
                    <FormControl mt={4}>
                      <FormLabel>{steps[activeStep].label2}</FormLabel>
                      <Input
                        value={steps[activeStep].value2}
                        onChange={steps[activeStep].onChange2}
                        placeholder={steps[activeStep].label2}
                      />
                    </FormControl>
                  )}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {activeStep > 0 && (
              <Button variant="ghost" onClick={backStep}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button colorScheme="blue" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={handleSubmit}>
                Finish
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Register;
