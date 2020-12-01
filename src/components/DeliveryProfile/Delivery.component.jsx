import React, { useState, useContext, useEffect } from 'react';
import Button from '../button/button.component';
// import "../ProfilInfo/ProfilInfo.scss"
import './DelveryProfile.scss';
import Input from '../InputGroup/InputGroup.component';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { appContext } from '../../contexts/appContext';
import UrlGenerator from '../../services/url-generator';
import DeliveryOrders from '../../pages/delivery-orders';

function DeliveryInfo(props) {
  const [update, setUpdate] = useState({});
  const [newupdate, setNewUpdate] = useState({});
  const { register, handleSubmit, errors } = useForm();

  const AppContext = useContext(appContext);

  useEffect(() => {
    AppContext.events.mobileSideBarOFF();
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
          let data1 = await res.json();
          setUpdate({
            ...data1,
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [datalar, setDatalar] = useState({
    field: {
      name: '',
      phones: '',
      old_password: '',
      password: '',
      email: '',
    },
  });

  const [allData, SetallData] = useState({
    field: {
      şəhər: '',
      rayon: '',
      qəsəbə: '',
      mənzil: '',
    },
  });

  function Personal() {
    let profile__info_update = document.getElementById('profile_info--update');
    let adress__info_clicked = document.getElementById('adress');
    let orders__info_clicked = document.getElementById('orders');
    let active__border = document.querySelector('.active--border');
    let simple__border = document.querySelector('.simple--border');
    let act = document.querySelector('.act');
    profile__info_update.style.display = 'block';
    adress__info_clicked.style.display = 'none';
    orders__info_clicked.style.display = 'none';
    act.style.border = '2px solid #D0D0D0';
    simple__border.style.border = '2px solid #D0D0D0';
    active__border.style.border = '2px solid #6472B8';
  }
  function Adress() {
    let profile__info_update = document.getElementById('profile_info--update');
    let adress__info_clicked = document.getElementById('adress');
    let orders__info_clicked = document.getElementById('orders');
    let active__border = document.querySelector('.active--border');
    let simple__border = document.querySelector('.simple--border');
    let act = document.querySelector('.act');
    profile__info_update.style.display = 'none';
    orders__info_clicked.style.display = 'none';
    adress__info_clicked.style.display = 'block';
    act.style.border = '2px solid #6472B8';
    active__border.style.border = '2px solid #D0D0D0';
  }

  function orders() {
    let profile__info_update = document.getElementById('profile_info--update');
    let adress__info_clicked = document.getElementById('adress');
    let orders__info_clicked = document.getElementById('orders');
    let active__border = document.querySelector('.active--border');
    let simple__border = document.querySelector('.simple--border');
    let act = document.querySelector('.act');
    profile__info_update.style.display = 'none';
    adress__info_clicked.style.display = 'none';
    orders__info_clicked.style.display = 'block';
    act.style.border = '2px solid #D0D0D0';
    simple__border.style.border = '2px solid #6472B8';
    active__border.style.border = '2px solid #D0D0D0';
  }

  function previewFile(e) {
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

  const Itir = () => {
    let button__adress = document.querySelector('.button__adress');
    let text__form = document.getElementById('text__form');
    button__adress.style.display = 'none';
    text__form.style.display = 'block';
  };

  const myhandleSubmit = (e) => {
    e.preventDefault();
    let Adress__Data = document.getElementById('Adress__Data');
    let text__form = document.getElementById('text__form');
    text__form.style.display = 'none';
    Adress__Data.style.display = 'block';
  };
  
  const handleChange = (e) => {
    e.preventDefault();
    SetallData({
      field: {
        ...allData.field,
        [e.target.name]: e.target.value,
      },
    });
  };

  const deleteProduct = (e) => {
    let url = UrlGenerator('az', `users/request/delete`);
    let token = AppContext.app.token;
    console.log(token);

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

  function updateSubmit(data) {
    let url = UrlGenerator('az', `users/update`);
    let token = AppContext.events.getToken();
    let newData = new FormData();

    for (let [key, value] of Object.entries(newupdate)) {
      if (key == 'phone') {
        newData.append('phones[phone]', value);
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
        
          swal({
            title: 'Əməliyyat yerinə yetirildi!',
            icon: 'success',
            button: 'Ok',
            timer: 6000,
            confirmButtonColor: '#8CD4F5',
          });
          setDatalar({
            field: {
              ...datalar.field,
              name: data.name,
            },
          });
        } else {
          swal('Təəssüf!', `${data.errors}`, 'error');
        }
      })
      .catch((err) => console.log(err));
  }

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
  console.log(update.phones);

  const onFo = (event) => {
    if (event.target.autocomplete) {
      event.target.autocomplete = 'whatever';
    }
  };
  return (
    <>
      <div className='row'>
        <div className='col-lg-9 col-md-12 col-xs-12'>
          <div className='profil__info-owner'>
            <div className='profil__info--offer'>
              {/* <div onClick={orders} id='adress__info-orders'>
                <h5>Sifarişlər</h5>
                <div className='simple--border'></div>
              </div> */}
              {/* <div onClick={Personal} id='profile__info-clikced'>
                <h5>Info</h5>
                <div className='active--border'></div>
              </div> */}
              {/* <div onClick={Adress} id='adress__info-clicked'>
                <h5>ünvan</h5>
                <div className='simple--border act'></div>
              </div> */}
              {/* <div>
                                        <h5>ödəmə üsulu</h5>
                                        <div className="simple--border"></div>
                                    </div> */}
            </div>
            <section id='profile__info--update'>
              <form onSubmit={handleSubmit(updateSubmit)}>
                <div className='profile--image'>
                  <h5>profİl şəklİ</h5>
                  <div className='profile__photo'>
                    <div className='profil__images'>
                      <input
                        name='logo'
                        // value="Yüklə"
                        ref={register}
                        onChange={(e) => previewFile(e)}
                        type='file'
                      />
                      <img className='profilePhoto' src={update.logo} alt='' />
                    </div>
                    <div className="logouplaods">Yüklə</div>
                  </div>
                  <div className='borders'></div>
                </div>
                <div className='profile--image_Username '>
                  <div className='userName_edit'>
                    <h5>Email</h5>
                  </div>
                  <Input
                    disabled={true}
                    onfocus={(e) => onFo(e)}
                    name='email'
                    type='Email'
                    value={update.email}
                  />
                  <div className='borders'></div>
                </div>
                <div className='profile--image_Username emails'>
                  <div className='userName_edit'>
                    <h5>İstİfadəçİ adı</h5>
                  </div>
                  <Input
                    onChange={(e) => nameHandler(e)}
                    name='name'
                    register={register({
                      required: {
                        value: true,
                        message: 'name doldurmaq mecburidir',
                        type: 'text',
                      },
                    })}
                    type='text'
                    value={update.name}
                  />

                  <div className='borders'></div>
                </div>
                <div className='profile--image_Username passw'>
                  <div className='userName_edit'>
                    <h5>Köhnə Şİfrə</h5>
                  </div>
                  <Input
                    onfocus={(e) => onFo(e)}
                    onChange={(e) => oldpasswordHandler(e)}
                    value={newupdate.old_password}
                    name='old_password'
                    register={register()}
                    type='password'
                    placeholder='**************'
                  />
                  <div className='borders'></div>
                </div>
                <div className='profile--image_Username odlpassw'>
                  <div className='userName_edit'>
                    <h5>Yeni Şİfrə</h5>
                  </div>
                  <Input
                    onChange={(e) => passwordHandler(e)}
                    name='password'
                    register={register()}
                    type='password'
                    placeholder='******'
                  />
                  <div className='borders'></div>
                </div>
                <div className='profile--image_Username '>
                  <div className='userName_edit'>
                    <h5>Nömrə</h5>
                  </div>
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
                  />
                  <div className='borders'></div>
                </div>
                <Button type='submit' name='Yadda saxla' />
              </form>
              <Button
                onClick={deleteProduct}
                className='button_delete--acc'
                name='Hesabi sil'
              />
            </section>
           
            {/* <section id='orders'>
              <DeliveryOrders />
            </section> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryInfo;