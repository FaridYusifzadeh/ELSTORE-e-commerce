import React, { useEffect, useState } from 'react';
import UrlGenerator from '../services/url-generator';
import swal from 'sweetalert';
import Card from '../components/card/card.component';
import InputGroup from '../components/InputGroup/InputGroup.component';
import { useForm } from 'react-hook-form';
import Button from '../components/button/button.component';
import { useHistory } from 'react-router-dom';

function PasswordReset(props) {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState({});
  const { register, handleSubmit, errors, watch } = useForm();
  const History = useHistory();
  password.current = watch('password', '');

  const submit = (data) => {
    let url = UrlGenerator('az', 'auth/resetPassword');
    let token = props.match.params.token;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'Post',
      body: JSON.stringify({ code: token, password: data.password }),
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.ok) {
          History.push('/');
          swal({
            title: 'Əməliyyat yerinə yetirildi!',
            text: `${data.message}`,
            icon: 'success',
            button: 'Ok',
            confirmButtonColor: '#8CD4F5',
          });

          document.getElementById('login__modal').style.display = 'block';
        } else {
          swal('Təssüflər', `${data.message}`, 'error');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let token = props.match.params.token;
    let url = UrlGenerator('az', `auth/checkResetCode?code=${token}`);
    fetch(url).then(async (res) => {
      let data = await res.json();
      if (res.ok) {
        setChecked(true);
      } else {
        swal('Təssüflər', `${data.message}`, 'error');
      }
    });
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {checked ? (
        <div style={{ width: '33.33%' }}>
          <Card className='card-shadow'>
            <form onSubmit={handleSubmit(submit)}>
              <InputGroup
                type='password'
                name='password'
                label='şifrə'
                required={true}
                register={register({
                  required: { value: true, message: 'şifrə məcburidir' },
                  min: { value: 6, message: 'şifrə 6 simvoldan az ola bilməz' },
                  max: {
                    value: 255,
                    message: 'şifrə 6 simvoldan çox ola bilməz',
                  },
                })}
                helper={errors.password && errors.password.message}
              />

              <InputGroup
                type='password'
                name='repeatPassword'
                label='təkrar şifrə'
                required={true}
                register={register({
                  required: { value: true, message: 'şifrə məcburidir' },
                  minLength: {
                    value: 6,
                    message: 'şifrə 6 simvoldan az ola bilməz',
                  },
                  maxLength: {
                    value: 255,
                    message: 'şifrə 6 simvoldan çox ola bilməz',
                  },
                  validate: (value) =>
                    value === password.current || 'şifrə uyğun deyil',
                })}
                helper={errors.repeatPassword && errors.repeatPassword.message}
              />

              <Button name='Göndər' className='bg-primary' type='submit' />
            </form>
          </Card>
        </div>
      ) : null}
    </div>
  );
}

export default PasswordReset;
