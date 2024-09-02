export const SelectTravelList = [
    {
        id:1,
        title:'Alone',
        people:'1'
    },
    {
        id:2,
        title:'Friends',
        people:'2 to 20'
    },
    {
        id:3,
        title:'A couple',
        people:'2'
    },
    {
        id:4,
        title:'Family',
        people:'3 to 10'
    }
]

export const SelectBudgetList = [
    {
        id:1,
        title:'Cheap',
    },
    {
        id:2,
        title:'Moderate',
    },
    {
        id:3,
        title:'Luxury',
    }
]

export const Prompt = "Generate Travel plan for {location}, for {days} days, for {people} with a {budget} budget. Give me Hotels option list with Hotel name, hotel image url, price, rating, description and suggest an itinerary with place name, place details, place image ulr, geo coorinates, ticket pricing, time to travel to each location for {days} days with each day with best time to visit in JSON format."