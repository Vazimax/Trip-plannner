import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetList, SelectTravelList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreateTrip() {
  const [place,setPlace] = useState();
  const [formData,SetFormData] = useState([]);
  const handleInputChange = (name,value) => {
    SetFormData({
      ...formData,
      [name]:value
    })
  };
  useEffect(()=>{
    console.log(formData);
  },[formData])
  return (
    <div className='sm:px-10 md:px-30 px-5 mt-5'>
      <h1>Create the Trip here</h1>
      <p className='mt-3 text-gray-600'>Choose your dream destination and get the best trip plan!</p>
      <div className='mt-20 '>
        <div>
          <h2>Choose the destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v);handleInputChange('location',v)}
            }}
          />
        </div>
        <div>
            <h2>Choose the duration</h2>
              <Input placeholder={'e.g:7'} type='number' onChange={(e)=>handleInputChange('days',e.target.value)} />
        </div>
      </div>
      <div>
        <div>
            <h2>Choose the option</h2>
            <div className='grid grid-cols-3 gap-5 mt-5'>
              {SelectTravelList.map((item,index)=>(
                <div key={index} className='p-4 border rounded-lg hover:shadow-lg'
                onChange={(e)=>handleInputChange('days',item.people)}
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
              {SelectBudgetList.map((item,index)=>(
                <div key={index} className='p-4 border rounded-lg hover:shadow-lg'
                onChange={()=>handleInputChange('days',item.title)}>
                  <h2>{item.id}</h2>
                  <h2>{item.title}</h2>
                </div>
              ))}
            </div>
          </div>
      </div>
      <div className='my-20 justify-end'>
        <Button>Magic</Button>
      </div>
    </div>
  )
}

export default CreateTrip
