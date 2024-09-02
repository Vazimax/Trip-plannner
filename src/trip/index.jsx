import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Prompt, SelectBudgetList, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';  // Make sure axios is imported

function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (tokenInfo) => {
      console.log(tokenInfo);
      await GetProfile(tokenInfo);
      localStorage.setItem('user', JSON.stringify(tokenInfo));
      setOpenDialog(false); // Close dialog after successful login
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const GetProfile = async (tokenInfo) => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      console.log(res.data); // Log the user data
      localStorage.setItem('user',JSON.stringify(res.data));
      setOpenDialog(false)
      onMagic();
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const onMagic = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    const final_prompt = Prompt
      .replace('{location}', formData?.location?.label)
      .replace('{days}', formData?.days)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget);

    console.log(final_prompt);

    const result = await chatSession.sendMessage(final_prompt);
    const responseText = await result?.response?.text();
    console.log(responseText);
  };

  return (
    <div className='sm:px-10 md:px-30 px-5 mt-5'>
      <h1>Create the Trip here</h1>
      <p className='mt-3 text-gray-600'>Choose your dream destination and get the best trip plan!</p>

      <div className='mt-20'>
        <div>
          <h2>Choose the destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>
        <div>
          <h2>Choose the duration</h2>
          <Input placeholder={'e.g:7'} type='number' onChange={(e) => handleInputChange('days', e.target.value)} />
        </div>
      </div>

      <div>
        <div>
          <h2>Choose the option</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange('people', item.people)}
                className='p-4 border rounded-lg hover:shadow-lg cursor-pointer'
              >
                <h2>{item.id}</h2>
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2>Choose the budget</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetList.map((item, index) => (
              <div key={index}
                className='p-4 border rounded-lg hover:shadow-lg cursor-pointer'
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2>{item.id}</h2>
                <h2>{item.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='my-20 justify-end'>
        <Button onClick={onMagic}>Magic</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="" />
              <h2>Google Sign In</h2>
              <p>Sign In with Google auth</p>
              <Button
                onClick={login} // Trigger the login process
                className="mt-5" variant='outline'>Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
