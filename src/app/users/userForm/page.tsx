'use client'
import { form } from '@/interfaces/userInterfaces';
import { TextField, Alert, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const formType = {
   name: '',
   email: '',
   mobile: '',
   countryCode: '+91'
}
const Contact = () => {
   const [success, setSuccess] = useState(false);
   const [contactForm, setContactForm] = useState<form>(formType);
   const [formErrors, setformErrors] = useState<form>(formType);
   const [formTouched, setFormTouched] = useState<form>(formType);
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
      const name = event.target.name;
      setFormTouched((formDetails) => ({ ...formDetails, [name]: true }))

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

   return (
      <div className="content sidebar p-6 bg-white shadow-lg rounded-lg">
         <div className="flex items-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-800">Add user</h1>
            <div className="border-b-2 border-gray-300 flex-grow ml-4"></div>
         </div>
         {!success ? (
            <div className="card p-6 bg-gray-50 rounded-lg shadow-md">
               {alertMsg && <Alert severity="error" className="mb-4">{alertMsg}</Alert>}
               <div className="mb-4">
                  <TextField
                     id="name"
                     name="name"
                     label="Name"
                     variant="standard"
                     value={contactForm.name}
                     onBlur={onInputBlur}
                     onChange={(e) => onInputChange(e)}
                     fullWidth
                     className="border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                  />
                  <span className="text-sm text-red-500">{!contactForm.name && formTouched.name ? 'Name is required' : formErrors.name}</span>
               </div>

               <div className="mb-4">
                  <TextField
                     id="email"
                     name="email"
                     label="Email"
                     variant="standard"
                     value={contactForm.email}
                     onBlur={onInputBlur}
                     onChange={(e) => onInputChange(e)}
                     fullWidth
                     className="border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                  />
                  <span className="text-sm text-red-500">{!contactForm.email && formTouched.email ? 'Email is required' : formErrors.email}</span>
               </div>

               <div className=" flex space-x-4 mb-4">
                  <FormControl variant="standard" sx={{ minWidth: 200 }} className="flex-grow">
                     <InputLabel id="country-code-label" className="text-gray-700">Country Code</InputLabel>
                     <Select
                        labelId="country-code-label"
                        id="country-code"
                        value={contactForm.countryCode}
                        onChange={(e) => onInputChange(e)}
                        className="border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                     >
                        <MenuItem value=""><em>Select Country Code</em></MenuItem>
                        <MenuItem value="+1">+1</MenuItem>
                        <MenuItem value="+91">+91</MenuItem>
                     </Select>
                  </FormControl>

                  <TextField
                     id="mobile"
                     name="mobile"
                     label="Phone Number"
                     variant="standard"
                     value={contactForm.mobile}
                     onBlur={onInputBlur}
                     onChange={(e) => onInputChange(e)}
                     fullWidth
                     className="border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
                  />
               </div>
               <span className="text-sm text-red-500">{!contactForm.mobile && formTouched.mobile ? 'Phone number is required' : formErrors.mobile}</span>

               <div className="m-5 flex justify-end gap-3">
                  <Button variant='outlined' color='primary' onClick={onCancel}>Cancel</Button>
                  <Button variant="contained" color="primary" onClick={onSubmit}>Submit</Button>
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

   )
}

export default Contact;