import React, { useEffect, useState, useContext } from 'react';
import Input from '../InputGroup/InputGroup.component';
import '../StoreRegistr/StoreRegistr.scss';
import { Link } from 'react-router-dom';
import Selectbox from '../Select-box/SelectBox.component';
import Button from '../button/button.component';
import { useForm } from 'react-hook-form';
import { appContext } from '../../contexts/appContext';
import swal from 'sweetalert';
import UrlGenerator from '../../services/url-generator';
import GoBack from '../go-back/go-back.component';
import { useHistory } from 'react-router-dom';
import TTAutoInput from '../tomtom-autocomplete-input/tt-autocomplete-input'

const StoreRegistr = (props) => {
  
  const [position,setPositon] = useState({
    name:'',
    position:{}
  })

  useEffect(()=>{
    AppContext.events.mobileSideBarOFF()
  })
  let history = useHistory();
  function AddNumber() {
    const weple = document.querySelector('.weple');
    const div = document.createElement('div');
    div.classList.add('registr__input');
    weple.appendChild(div);
    const div1 = document.createElement('div');
    div1.classList.add('inputForm');
    div.appendChild(div1);
    const div2 = document.createElement('div');
    div2.classList.add('inputForm_iconcontainer');
    div1.appendChild(div2);
    const input = document.createElement('input');
    div2.appendChild(input);
    input.classList.add('inputForm_input');
    input.placeholder = 'Əlaqə nömrəsi';
  }

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
  } = useForm();
  //    const [texturl,setTexturl]=useState({
  //        selected:'',
  //        x:[
  //         {
  //             id:'company',
  //             name:"Korparativ"
  //         }
  //      ]
  //     })

  //    function TextUrl(e){
  //     setTexturl({
  //         ...texturl,
  //         selected:e.target.value
  //     })
  //    }

  const AppContext = useContext(appContext);

  const registerSubmit = (data) => {
    let url = UrlGenerator('az', `auth/company/register`);
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'Post',
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.ok) {
          // AppContext.events.AddToken(data)
          history.push('/');
          swal("Təbriklər", "Qeydiyyatınız uğurla tamamlandı! Zəhmət olmasa emailinizi yoxlayin!", "success");
          //document.getElementById('login__modal').style.display = 'block';
        } else {
          swal('Təəssüflər', `${data.error}`, 'error');
        }
      })
      .catch((err) => console.log(err));
  };

  const [cities, setCities] = useState({
    data: [],
  });
  const [region, setRegion] = useState({
    data: [],
  });
  const [villages, setVillages] = useState({
    data: [],
  });

  function takeSelectboxValue(e) {
    let url = UrlGenerator('az', `regions?city_id=${e.target.value}`);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setRegion({ data: data }));
  }

  function takeSelectboxValue1(e) {
    let url = UrlGenerator('az', `villages?region_id=${e.target.value}`);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setVillages({ data: data }));
  }

  const getPosition = (name,position) => {
    setPositon({
      name:name,
      position:position,
    })
 }
  useEffect(() => {
    let url = UrlGenerator('az', 'cities');
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCities({ data: data }));
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12 col-md-12 col-xs-12'>
          <div className='Store__Register'>
          <div className="nav__page">
            <GoBack link='/' text='Geri dön' />
          </div>
            <form onSubmit={handleSubmit2(registerSubmit)}>
              <div className='store__registr--text'>
                <h5>Mağaza qeydiyyatı</h5>
              </div>

              {/* <SelectBox firstopt={"Mağaza növünü seçin"}   options={texturl.x} /> */}
              <input type='hidden' value='company' />

              <div className='registr__input'>
                <Input
                  name='name'
                  type='text'
                  placeholder='Mağaza adı'
                  register={register2({
                    required: {
                      value: true,
                      message: 'Adınızı daxil etməlisiniz',
                    },
                    maxLength: { value: 255, message: 'max  255 char need' },
                  })}
                  helper={errors2.name && errors2.name.message}
                />
              </div>

              <div className='registr__input'>
                <Input
                  name='password'
                  placeholder={'Şifrə'}
                  type='password'
                  register={register2({
                    required: 'Şifrə daxil etməlisiniz',
                    minLength: { value: 5, message: 'cannot be less 8' },
                  })}
                  helper={errors2.password && errors2.password.message}
                />
              </div>
              <div className='registr__input'>
                <Input
                  name='description'
                  type='text'
                  placeholder='Mağaza haqqında ümumi məlumat'
                  register={register2({
                    required: {
                      value: true,
                      message: 'Mağazanız haqqında məlumatı daxil edin',
                    },
                    maxLength: { value: 255, message: 'max  255 char need' },
                  })}
                  helper={errors2.name && errors2.description.message}
                />
              </div>
              <div className='registr__input'>
                <Input
                  name='email'
                  placeholder={'Email'}
                  type='email'
                  register={register2({
                    required: {
                      value: true,
                      message: 'Email daxil etməlisiniz',
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'email not valid',
                    },
                  })}
                  helper={errors2.email && errors2.email.message}
                />
              </div>
              {/* <div className='registr__input'>
                <GoogleMapAutoComplete />
              </div> */}

              <div className='registr__input'>
                <Input
                  name='phones[phone]'
                  type='tel'
                  placeholder='+994707000007'
                  register={register2({
                    required: {
                      value: true,
                      message: 'Telefonunuzu daxil etməlisiniz',
                    },
                    maxLength: { value: 255, message: 'max 255 char need' },
                  })}
                  helper={errors2.name && errors2.phones['phone'].message}
                />
              </div>

              <div className='weple'></div>
              <div className='add__number' id='addedNumber' onClick={AddNumber}>
                <p>+Başqa nömrə əlavə et</p>
              </div>
              <div className='add__adress'>
                <p>Ünvan</p>
              </div>
              <div className='registr__input'>
              <TTAutoInput
              style={{'width':'284px'}}
              name="location_name"
              getPosition={getPosition}
              validation={register2({
                required: {
                  value: true,
                  message: 'adres daxil etməlisiniz',
                }
              })}
              helper={errors2.address && errors2.address.message}
              />
              </div>
              <br/>
              <div className='select__city'>
            <Selectbox
                  register={register2({
                    required: { value: true, message: 'can not be null' },
                  })}
                  name='city_id'
                  firstopt='Şəhər'
                  handleChange={takeSelectboxValue}
                  class='selectboxcheckout'
                  options={cities.data.data}
                />
  
              <input
                name='address'
                type='hidden'
                value={position.name}
                ref={register2({
                  required: { value: true, message: 'Adresinizi daxil edin' },
                })}
              />
              <input
              name='lat'
              type='hidden'
              value={position.position.lat}
              ref={register2({
                required:true
              })}
            />
              <input
              name='lng'
              type='hidden'
              value={position.position.lon}
              ref={register2({
                required:true
              })}
            />  
              </div>
              <br/>
              {region.data.data != undefined && region.data.data.length > 0 ? (
                <div className='select__city' id='region'>
                  <Selectbox
                  register={register2({
                    required: { value: true, message: 'can not be null' },
                  })}
                    firstopt='Rayon'
                    handleChange={takeSelectboxValue1}
                    class='selectboxcheckout'
                    options={region.data.data}
                  />
                </div>
              ) : null}
              <br/>
              {villages.data.data != undefined &&
              villages.data.data.length > 0 &&
              region.data.data.length > 0 ? (
                <div className='select__city' id='Qəsəbə'>
                  <Selectbox
                    id='village'
                    firstopt='Village'
                    class='selectboxcheckout'
                    options={villages.data.data}
                  />
                </div>
              ) : null}

{/*              <div className='select__city'>
                <Input
                  name='address'
                  type='text'
                  placeholder='Ünvan'
                  register={register2({
                    required: { value: true, message: 'Adresinizi daxil edin' },
                    maxLength: { value: 255, message: 'max  255 char need' },
                  })}
                  helper={errors2.name && errors2.name.message}
                />
                </div>*/}
                   <Button className='registr__button ' name='Davam Et' />
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRegistr;
