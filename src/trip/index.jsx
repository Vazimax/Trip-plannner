import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Prompt, SelectBudgetList, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIModel';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onMagic=async()=>{
    const final_prompt = Prompt
    .replace('{location}',formData?.location?.label)
    .replace('{days}',formData?.days)
    .replace('{people}',formData?.people)
    .replace('{budget}',formData?.budget)
    .replace('{days}',formData?.days)
    console.log(final_prompt);

    const result = await chatSession.sendMessage(final_prompt);
    console.log(result?.response?.text());
  }

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
    </div>
  );
}

export default CreateTrip;
