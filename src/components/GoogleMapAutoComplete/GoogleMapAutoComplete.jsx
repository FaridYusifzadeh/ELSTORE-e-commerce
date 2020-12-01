// import React from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
// import Input from '../InputGroup/InputGroup.component'

// export default function GoogleMapAutoComplete() {
//   const [address, setAddress] = React.useState('');
//   const [coordinates, setCoordinates] = React.useState({
//     lat: null,
//     lng: null,
//   });

//   const handleSelect = async (value) => {
//     const results = await geocodeByAddress(value);
//     console.log(results);
//     const latLng = await getLatLng(results[0]);
//     setAddress(value);
//     setCoordinates(latLng);
//   };

//   return (
//     <div>
//       <PlacesAutocomplete
//         value={address}
//         onChange={setAddress}
//         onSelect={handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <p>Latitude: {coordinates.lat}</p>
//             <p>Longitude: {coordinates.lng}</p>

//             <Input onChange {...getInputProps({ placeholder: 'Type address' })} />

//             <div>
//               {loading ? <div>...loading</div> : null}

//               {suggestions.map((suggestion) => {
//                 const style = {
//                   backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
//                 };

//                 return (
//                   <div {...getSuggestionItemProps(suggestion, { style })}>
//                     {suggestion.description}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     </div>
//   );
// }

import React,{useState} from 'react';
// import SimpleMap from './components/SimpleMap';
// import TomTomMap from './components/tomtom-map/tomrom-map'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import mapUrlGenerator from '../../services/mapUrlGenerator';


function GoogleMapAutoComplete() {
 const [autocomplete,setavtocomplete]=useState([])

  let searchchange=(e)=>{
      let url=mapUrlGenerator(e.target.value)
      fetch(url)
      .then(async res=>{
        let data=await res.json();
        if(Array.isArray(data.results)){
          setavtocomplete([
            ...data.results
          ])
        }
        console.log(data)
      })
  }
  return (
    <>
      {/* <SimpleMap /> */}
{/*     <input type='text' onChange={searchchange}/>
      <ul>
        {
          autocomplete.map((x,i)=>{
            return <li key={i}>{x.address.freeformAddress}</li>
          })
        }
      </ul>*/}
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={autocomplete.map((option) => option.address.freeformAddress)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search input"
          margin="normal"
          variant="outlined"
          onChange={searchchange}
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
      />
      </>
  );
}

export default GoogleMapAutoComplete;
