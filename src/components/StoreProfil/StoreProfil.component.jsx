import React, { useState, useContext, useEffect } from 'react';
import '../StoreProfil/StoreProfil.scss';
import Button from '../button/button.component';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import Input from '../InputGroup/InputGroup.component';
import { appContext } from '../../contexts/appContext';
import UrlGenerator from '../../services/url-generator';
import TTAutoInput from '../../components/tomtom-autocomplete-input/tt-autocomplete-input'
import { data } from 'jquery';

const StoreProfil = () => {
  const [update, setUpdate] = useState([]);

  const [newupdate, setNewUpdate] = useState({});

  const [adress, setAdress] = useState([
      {
          cityAdress:'Baki Sheheri'
      }
  ]);

  const AppContext = useContext(appContext);

  const { register, handleSubmit, errors } = useForm();

  const [datalar, setDatalar] = useState({
    field: {
      name: '',
      phones: '',
      old_password: '',
      password: '',
      email: '',
      address:'',
      lat:'',
      lng:''
    },
  });

  useEffect(() => {
    let url = UrlGenerator('az', `auth/me`);
    let token = AppContext.events.getToken();
    fetch(url, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
      method: 'POST',
    })
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setUpdate({
            ...data,
          });
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function updateSubmit(data) {
    let url = UrlGenerator('az', `users/update`);
    let token = AppContext.events.getToken();
    let newData = new FormData();

    for (let [key, value] of Object.entries(newupdate)) {
      if (key == 'phone') {
        newData.append(`phones[phone]`, value);
        continue;
      }
      newData.append(`${key}`, value);
    }
    fetch(url, {
      headers: {
        Authorization: `${token.token_type} ${token.access_token}`,
      },
      method: 'POST',
      body: newData,
    })
      .then(async (res) => {
        if (res.ok) {
          let data1 = await res.json();
          console.log(data1);
          setDatalar({
            field: {
              ...datalar.field,
              name: data.name,
            },
          });
        }
      })
      .catch((err) => console.log(err));
  }

  function previewFile1(e) {
    console.log(e.target.files[0]);
    setUpdate({
      ...update,
      logo: e.target.files[0],
    });
    setNewUpdate({
      ...newupdate,
      logo: e.target.files[0],
    });
    const preview = document.querySelector('.profilePhoto');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const deleteProduct = (e) => {
    let url = UrlGenerator('az', `users/request/delete`);
    let token = AppContext.app.token;

    swal({
      title: 'Hesabınızı silməyə əminsinizmi?',
      text: ' ',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(url, {
          method: 'Delete',
          headers: {
            Authorization:
              token != null ? `${token.token_type} ${token.access_token}` : '',
          },
        })
          .then(async (res) => {
            // let data=await res.json();
            if (res.ok) {
              setUpdate({
                ...update,
              });

              AppContext.events.logout();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  function nameHandler(e) {
    setUpdate({
      ...update,
      name: e.target.value,
    });
    setNewUpdate({
      ...newupdate,
      name: e.target.value,
    });
  }

  function textHandler(e) {
    setUpdate({
      ...update,
      description: e.target.value,
    });
    setNewUpdate({
      ...newupdate,
      description: e.target.value,
    });
  }

  function passwordHandler(e) {
    setUpdate({
      ...update,
      password: e.target.value,
    });
    setNewUpdate({
      ...newupdate,
      password: e.target.value,
    });
  }

  function oldpasswordHandler(e) {
    console.log(e.target.value);
    setUpdate({
      ...update,
      old_password: e.target.value,
    });
    setNewUpdate({
      ...newupdate,
      old_password: e.target.value,
    });
  }

  function numberHandler(e) {
    setUpdate({
      ...update,
      phones: {
        phone: e.target.value,
      },
    });

    setNewUpdate({
      ...newupdate,

      phone: e.target.value,
    });
  }

   const getPosition = (name, position) => {
    setNewUpdate({
      ...newupdate,
        address:name,
        lat:position.lat,
        lng:position.lon
    })
  }

  const onFo = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = 'whatever';
    }
  };

const handleUpdate = ()=>{
let cityp=document.getElementById('city')
let valuep=cityp.innerText;
cityp.style.display='none';
let inputBlock=document.getElementById('adress--data')
let inputp= document.createElement("input"); 
inputp.classList.add('changed__input')
inputp.value=valuep;
inputBlock.appendChild(inputp);
console.log('citypcitypcitypcityp',inputp)
}
  console.log('Salam eee', update);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-lg-6 col-md-12 col-xs-12'>
          <form onSubmit={handleSubmit(updateSubmit)}>
            <div className='Store__Photo--text'>
              <h5>profİl şəklİ</h5>
              <div className='profile__photo1'>
                <div className='profil__images1'>
                  <input
                    name='logo'
                    ref={register}
                    onChange={previewFile1}
                    type='file'
                  />
                  <img className='profilePhoto' src={update.logo} alt='' />
                </div>
                <div className="logouplaods">Yüklə</div>
              </div>
              <div className='borders'></div>
            </div>
            <div className='profile--image_Username emails'>
              <div className='userName_edit'>
                <h5>İstİfadəçİ adı</h5>
              </div>
              <div className='input-_area'>
                <Input
                  onChange={(e) => nameHandler(e)}
                  name='name'
                  register={register({
                    required: {
                      value: true,
                      message: 'Ad doldurmaq mecburidir',
                      type: 'text',
                    },
                  })}
                  type='text'
                  value={update.name}
                />
              </div>
              <div className='borders'></div>
            </div>
            <div className='profile--image_Store store'>
              <div className='userName_edit'>
                <h5>Mağaza haqqında</h5>
              </div>
              <div className='Store__info'>
                <textarea
                  onChange={(e) => textHandler(e)}
                  name='description'
                  register={register({
                    required: {
                      value: true,
                      message: 'Ad doldurmaq mecburidir',
                      type: 'text',
                    },
                  })}
                  type='text'
                  value={update.description}
                ></textarea>
                {/* <Input
                  onChange={(e) => textHandler(e)}
                  name='Təyinat'
                  type='text'
                  value={update.description}
                /> */}

              </div>
              <div className='borders'></div>
            </div>
            <div className='profile--image_Username mail'>
              <div className='userName_edit'>
                <h5>Email</h5>
              </div>
              <div className='input-_area'>
                <Input
                  disabled={true}
                  onfocus={(e) => onFo(e)}
                  name='email'
                  type='Email'
                  value={update.email}
                />
              </div>
              <div className='borders'></div>
            </div>
            <div className='profile--image_Username' >
            <div className='userName_edit'>
            <h5>Adres</h5>
          </div>
            <TTAutoInput
            style={{'width':'300px'}}
            name="location_name"
            getPosition={getPosition}
            validation={register({
              required: {
                value: true,
                message: 'adres daxil etməlisiniz',
              }
            })}
          />
            </div>
            <div className='profile--image_Username pass '>
              <div className='userName_edit'>
                <h5>Şİfrə</h5>
              </div>
              <div className='input-_area'>
                <Input
                  onfocus={(e) => onFo(e)}
                  onChange={(e) => oldpasswordHandler(e)}
                  value={newupdate.old_password}
                  name='old_password'
                  register={register()}
                  placeholder='*******************'
                  type='password'
                />
              </div>
              <div className='borders'></div>
            </div>
            <div className='profile--image_Username pass '>
              <div className='userName_edit'>
                <h5>Yenİ Şİfrə</h5>
              </div>
              <div className='input-_area'>
                <Input
                  onChange={(e) => passwordHandler(e)}
                  name='password'
                  register={register()}
                  type='password'
                  placeholder='**************'
                />
              </div>
              <div className='borders'></div>
            </div>
            <div className='profile--image_Username  '>
              <div className='userName_edit phone '>
                <h5>əlaqə nömrəsİ</h5>
              </div>

              <div className='input-_area'>
                <Input
                  name='phones[phone]'
                  register={register({
                    required: {
                      value: true,
                      message: 'yeni email doldurmaq mecburidir',
                      type: 'tel',
                    },
                  })}
                  type='tel'
                  onChange={(e) => numberHandler(e)}
                  value={
                    update.phones != undefined ? update.phones['phone'] : null
                  }
                  placeholder='070 700 00 07'
                />
              </div>
              <br />
              <div className='borders1'></div>
            </div>
            <Button type='submit' name='Yadda saxla' />
          </form>
          <Button
            className='button_delete--acc'
            onClick={deleteProduct}
            name='Hesabi sil'
          />
        </div>
{/*        <div className='col-lg-6 col-md-12 col-xs-12'>
          <div id='Adress__Data'>
            <div className='delivery_mapping'>
              <div className='delivery__heading'>
                <h5>ünvan</h5>
              </div>
              <div className='delivery__heading'>
                <button onClick={handleUpdate}>Düzəliş et</button>
              </div>
              <div className='delivery__edit'>
                {/* <a href="">Düzəliş et</a>
                                    <a href="">Sil</a> 
              </div>
            </div>
            
            <div id='adress--data' className='adress--data'>
              <p id='city'>Bakı şəhəri</p>
              
            </div>
            <Button type='submit' name='Yadda saxla' style={{display: "none"}} />
          </div>
                                  </div>*/}
      </div>
    </div>
  );
};

export default StoreProfil;
