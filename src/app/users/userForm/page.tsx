'use client'
import React from 'react';
import TopBar from '@/components/topBar';
import { userForm } from '@/interfaces/userInterfaces';
import { TextField, Alert, Button, InputAdornment, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formType: userForm = {
   name: '',
   email: '',
   mobile: '',
   countryCode: '+91'
}
const Contact: React.FC = () => {
   const [success, setSuccess] = useState(false);
   const [contactForm, setContactForm] = useState<userForm>(formType);
   const [formErrors, setformErrors] = useState<userForm>(formType);
   // const [formTouched, setFormTouched] = useState<userForm>(formType);
   const [alertMsg, setAlertMsg] = useState('');
   const router = useRouter();

   const onSubmit = async () => {
      if ((contactForm.name && contactForm.email && contactForm.mobile) &&
         (!formErrors.name && !formErrors.email && !formErrors.mobile)) {
         const body = {
            "name": contactForm?.name || '',
            "email": contactForm?.email || '',
            "subject": contactForm?.name + 'is requested to contact',
            "mobile": `${contactForm?.countryCode} ${contactForm?.mobile}` || ''
         }
         console.log(body);
         await successCard()
      }
      else {
         setAlertMsg('Please fill all the fields')
      }
   }
   const onCancel = () => {
      router.push('/users')
   }

   const successCard = () => {
      setSuccess(!success)
   }

   const onInputBlur = (event: { target: { name: string }; }) => {
      console.log(event)
      // const name = event.target.name;
      // setFormTouched((formDetails) => ({ ...formDetails, [name]: true }))

   }

   const onInputChange = (event: { target: { value: string; name: string; }; }) => {
      setAlertMsg('')
      const name = event.target.name;
      const value = event.target.value;
      setformErrors({ ...formErrors, [name]: '' })
      if (name == 'mobile') {
         const mobilePattren = /^[0-9]+$/
         if (!mobilePattren.test(value) || value.length > 10) {
            setformErrors({ ...formErrors, mobile: 'Please enter valid mobile number' })
         }
      }
      if (name == 'email') {
         const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
         if (!emailPattern.test(value)) {
            setformErrors({ ...formErrors, email: 'Please enter valid email' })
         }
      }
      setContactForm((formDetails) => ({ ...formDetails, [name]: value }))
   }

   return (<>
      <TopBar />
      <div className="flex justify-center m-5">
         <div className="container mx-5 p-4 bg-white shadow-lg">
            {/* <div className="content sidebar p-6 bg-white shadow-lg rounded-lg"> */}
            <div className="flex items-center mb-4">
               <h1 className="text-3xl font-semibold text-gray-800">Add user</h1>
               <div className="border-b-2 border-gray-300 flex-grow ml-4"></div>
            </div>
            {!success ? (
               <div>
                  {alertMsg && (
                     <div className="mb-6">
                        <Alert severity="error">{alertMsg}</Alert>
                     </div>
                  )}
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                     <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <TextField
                           id="name"
                           name="name"
                           label="Name"
                           size="small"
                           variant="outlined"
                           value={contactForm.name}
                           onBlur={onInputBlur}
                           onChange={onInputChange}
                           fullWidth
                           className="focus:ring focus:ring-blue-500"
                        />
                     </Grid>
                     <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <TextField
                           id="email"
                           name="email"
                           label="Email"
                           size="small"
                           variant="outlined"
                           value={contactForm.email}
                           onBlur={onInputBlur}
                           onChange={onInputChange}
                           fullWidth
                           className="focus:ring focus:ring-blue-500"
                        />
                     </Grid>
                     <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                        <TextField
                           id="mobile"
                           name="mobile"
                           label="Mobile"
                           size="small"
                           variant="outlined"
                           value={contactForm.mobile}
                           onBlur={onInputBlur}
                           onChange={onInputChange}
                           fullWidth
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <Select
                                       id="countryCode"
                                       name="countryCode"
                                       value={contactForm.countryCode}
                                       onChange={onInputChange}
                                       variant="standard"
                                       className="w-25"
                                    >
                                       <MenuItem value="">
                                          <em>Select</em>
                                       </MenuItem>
                                       <MenuItem value="+1">+1 (USA)</MenuItem>
                                       <MenuItem value="+91">+91 (India)</MenuItem>
                                       <MenuItem value="+44">+44 (UK)</MenuItem>
                                       <MenuItem value="+61">+61 (Australia)</MenuItem>
                                    </Select>
                                 </InputAdornment>
                              ),
                           }}
                           className="focus:ring focus:ring-blue-500"
                        />
                     </Grid>
                  </Grid>
                  <div className="border-b-2 border-gray-300 flex-grow my-8 w-full"></div>
                  <div className=" flex justify-end space-x-4">
                     <Button
                        variant="outlined"
                        color="primary"
                        onClick={onCancel}
                        className="transition-all hover:bg-gray-100"
                     >
                        Cancel
                     </Button>
                     <Button
                        variant="contained"
                        color="primary"
                        className="transition-all hover:shadow-md"
                        onClick={() => onSubmit()}
                     >
                        Submit
                     </Button>
                  </div>
               </div>
            ) : (
               <div className="thank-you-container p-6 bg-green-50 rounded-lg shadow-md">
                  <div className="thank-you-message text-center">
                     <h2 className="text-2xl font-semibold text-green-700 mb-4">Thank You!</h2>
                     <p className="text-gray-600 mb-4">Your message has been received. I will get back to you shortly.</p>
                     <div className='m-5'>
                        <button className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300' onClick={successCard}>Send Another Response</button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div >
   </>

   )
}

export default Contact;