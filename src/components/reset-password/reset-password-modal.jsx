import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import Card from '../card/card.component';
import Input from '../InputGroup/InputGroup.component';
import Button from '../button/button.component';
import { useForm } from 'react-hook-form';
import './reset-password.scss';
import UrlGenerator from '../../services/url-generator';
import swal from 'sweetalert';

function ResetPasswordModal() {
  const { errors, handleSubmit, register } = useForm();
  const submit = (data) => {
    let url = UrlGenerator('az', 'auth/sendResetToken');
    fetch(url, {
      method: 'Post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.ok) {
          console.log(data);
          document
            .getElementById('reset-password-modal')
            .classList.toggle('d-flex');
          swal({
            title: 'Əməliyyat yerinə yetirildi!',
            icon: 'success',
            button: 'Ok',
            timer: 6000,
            confirmButtonColor: '#8CD4F5',
          });
        } else {
          swal('Təəssüflər', `${data.message}`, 'error');
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    let rpm = document.getElementById('reset-password-modal');
    document.getElementsByTagName('body')[0].addEventListener('click', (e) => {
      if (e.target === rpm) {
        document
          .getElementById('reset-password-modal')
          .classList.toggle('d-flex');
      }
    });
  });
  return ReactDom.createPortal(
    <div id='reset-password-modal'>
      <div className='rpm-content'>
        <Card className='card-shadow'>
          <form onSubmit={handleSubmit(submit)}>
            <Input
              type='email'
              name='email'
              required={true}
              placeholder='email'
              register={register({
                required: { value: true, message: 'email məcburidir' },
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'email düzgün deyil',
                },
              })}
              helper={errors.email && errors.email.message}
            />
            <Button
              className='bg-primary txt--light'
              type='submit'
              name='Göndər'
            />
          </form>
        </Card>
      </div>
    </div>,
    document.getElementById('reset-modal')
  );
}

export default ResetPasswordModal;
