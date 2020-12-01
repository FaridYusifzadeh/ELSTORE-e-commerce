import React, { useEffect, useState, useContext } from 'react';
import Card from '../components/card/card.component';
import GoBack from '../components/go-back/go-back.component';
import InputGroup from '../components/InputGroup/InputGroup.component';
import SelectBox from '../components/Select-box/SelectBox.component';
import JoditEditor from 'jodit-react';
import FileInput from '../components/file-input/file-input.component';
import UrlGenerator from '../services/url-generator';
import { appContext } from '../contexts/appContext';
import CompanyMiniImage from '../components/Compony-mini-image/CompanyMiniImage';
import Button from '../components/button/button.component';
import Tab from '../components/tab/tab-component';
import ButtonDropDown from '../components/button-dropdown/ButtonDropDown.component';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

// const product={
//   product_category_id:'',
//   product_price:'',
//   status:1,
//   product_brand_id:'',
//   discount:0,
//   product_delivery_price:'',
//   az:{
//     product_description:'',
//     product_name:''
//   },
//   en:{
//     product_description:'',
//     product_name:''
//   },
//   ru:{
//     product_description:'',
//     product_name:''
//   },
//   }
function CreateProduct(props) {
  const { register, handleSubmit, errors } = useForm();

  const AppContext = useContext(appContext);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [childcat, setChildCat] = useState([]);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const [product, setProduct] = useState({
    product_category_id: '',
    product_price: '',
    status: 1,
    product_brand_id: '',
    discount: '',
    product_delivery_price: '',
  });

  const [description,setDescription] = useState({
    az: {
      product_name: '',
      product_description: '',
    },
    en: {
      product_name: '',
      product_description: '',
    },
    ru: {
      product_name: '',
      product_description: '',
    },
  })

  useEffect(() => {
    let categories = '';
    let brandss = '';
    let cat_url = UrlGenerator('az', 'categories');
    let brand_url = UrlGenerator('az', 'brands');

    fetch(cat_url)
      .then((response) => {
        response
          .json()
          .then((r) => {
            categories = r.data;
            console.log(categories);

            fetch(brand_url)
              .then((response) => {
                response
                  .json()
                  .then((r) => {
                    brandss = r.data;
                    console.log(brandss);
                    console.log(categories);
                    setCategories(categories);
                    setBrands(brandss);
                  })
                  .catch((e) => console.log(e));
              })
              .catch((err) => console.log(err));
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => console.log(err));
    let params = props.match.params;
    if (params.id !== undefined) {
      console.log(params.id);
      let url = UrlGenerator('az', `products/edit/${params.id}/showForEdit`);
      let token = AppContext.app.token;
      console.log(token);
      fetch(url, {
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      }).then(async (res) => {
        let data = await res.json();
        console.log(data.data);

        setImageURLs([...data.images]);

        product.product_brand_id = data.data.product_brand_id;
        product.product_category_id = data.data.product_category_id;
        product.product_price = data.data.product_price;
        product.product_delivery_price = data.data.product_delivery_price;
        product.discount = data.data.discount;
        description['az'].product_name = data.translates.az.product_name;
        description['az'].product_description =
          data.translates.az.product_description;
          description['en'].product_description =
          data.translates.en.product_description;
          description['en'].product_name = data.translates.en.product_name;
          description['ru'].product_name = data.translates.ru.product_name;
          description['ru'].product_description =
          data.translates.ru.product_description;
      });
    }
  }, []);

  function readFileAsync(x) {
    var reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onerror = () => {
        reader.abort();
        reject(new DOMException('Problem parsing input file.'));
      };

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(x);
    });
  }

  useEffect(() => {
    images.forEach((x) => {
      readFileAsync(x)
        .then((res) => {
          setImageURLs([
            ...imageURLs,
            {
              name: x.name,
              product_image: res,
            },
          ]);
        })
        .catch((err) => console.log(err));
    });
  }, [images]);

  function imageLoad(e) {
    let z = [...e.target.files];
    setImages([...images, ...z]);
  }

  const removeImage = (e) => {
    let src = e.target.parentElement.previousSibling.getAttribute('src');
    let removedFile = imageURLs.find((x) => x.product_image === src);
    let newUrls = imageURLs.filter((x) => x.product_image !== src);
    let newImages = images.filter((x) => x.name !== removedFile.name);
    setImageURLs([...newUrls]);
    setImages([...newImages]);
    imageLoad(e);
  };

  const getName_az = (e) => {
    //let lang=e.target.closest('.pro-name').getAttribute('data-lang');
    let newProduct = description;
    newProduct.az.product_name = e.target.value;
    setDescription({
      ...newProduct,
    });
    //product['az'].product_name=e.target.value;
  };

  const getName_en = (e) => {
    //let lang=e.target.closest('.pro-name').getAttribute('data-lang');
    let newProduct = description;
    newProduct.en.product_name = e.target.value;
    setDescription({
      ...newProduct,
    });
  };

  const getName_ru = (e) => {
    //let lang=e.target.closest('.pro-name').getAttribute('data-lang');
    let newProduct = description;
    newProduct.ru.product_name = e.target.value;
    setDescription({
      ...newProduct,
    });
    //product['ru'].product_name=e.target.value;
  };

  const getDescription_az = (state,e) => {
    //product['az'].product_description=e
    let newProduct = description;
    newProduct.az.product_description = e;
    console.log('after',newProduct)
    setDescription({
      ...newProduct,
    });
  };

  const getDescription_en = (e) => {
    //product['en'].product_description=e
    let newProduct = description;
    newProduct.en.product_description = e;
    setDescription({
      ...newProduct,
    });
  };

  const getDescription_ru = (e) => {
    //product['ru'].product_description=e
    let newProduct = description;
    newProduct.ru.product_description = e;
    setDescription({
      ...newProduct,
    });
  };

  const getCataegory = (e) => {
    let value = e.target.value;
    let newProduct = product;
    newProduct.product_category_id = value;
    setProduct({
      ...newProduct,
    });
    let subCategories = categories.find((x) => x.id == value).children;
    if (subCategories != null) {
      setSubCat([...subCategories]);
    } else {
      setSubCat([]);
    }
  };

  function getBrands(e) {
    let newProduct = product;
    newProduct.product_brand_id = e.target.value;
    setProduct({
      ...newProduct,
    });
  }

  const getSubCataegory = (e) => {
    let value = e.target.value;
    let newProduct = product;
    newProduct.product_category_id = value;
    setProduct({
      ...newProduct,
    });
    let childCategories = subcat.find((x) => x.id == value).children;
    if (childCategories != null) {
      setChildCat([...childCategories]);
    } else {
      setChildCat([]);
    }
  };

  const getChildCataegory = (e) => {
    let value = e.target.value;
    let newProduct = product;
    newProduct.product_category_id = value;
    setProduct({
      ...newProduct,
    });
  };

  const getPrice = (e) => {
    let value = e.target.value;
    let min = Number(e.target.getAttribute('min'));
    let newProduct = product;
    newProduct.product_price = value;
    if (value > min || value === '') {
      newProduct.product_price = value;
      setProduct({
        ...newProduct,
      });
    }
  };

  const getDiscount = (e) => {
    let value = e.target.value;
    let newProduct = product;
    newProduct.discount = value;
    let max = Number(e.target.getAttribute('max'));
    let min = Number(e.target.getAttribute('min'));

    if ((value < max && value > min) || value === '') {
      newProduct.discount = value;
      setProduct({
        ...newProduct,
      });
    }
  };

  const send = (data) => {
    let newFormData = new FormData();
    for (let i = 0; i < images.length; i++) {
      newFormData.append(`images[${i}]`, images[i]);
    }

    // newFormData.append('images[]',images)
    newFormData.append(
      'az[product_description]',
      description.az['product_description']
    );
    newFormData.append('az[product_name]', description.az['product_name']);
    newFormData.append(
      'en[product_description]',
      description.en['product_description']
    );
    newFormData.append('en[product_name]', description.en['product_name']);
    newFormData.append(
      'ru[product_description]',
      description.ru['product_description']
    );
    newFormData.append('ru[product_name]', description.ru['product_name']);
    newFormData.append('product_category_id', product.product_category_id);
    newFormData.append('product_brand_id', product.product_brand_id);
    newFormData.append('discount', product.discount);
    newFormData.append('product_price', product.product_price);
    newFormData.append('status', product.status);
    console.log(newFormData);
    console.log(product);
    let url = UrlGenerator('az', 'products');
    let token = AppContext.events.getToken();

    if (token != null) {
      fetch(url, {
        method: 'Post',
        body: newFormData,
        headers: {
          Authorization: `${token.token_type} ${token.access_token}`,
        },
      })
        .then(async (res) => {
          if (res.ok) {
            let r = await res.json();

            swal({
              title: 'Əməliyyat yerinə yetirildi!',
              text: `${r.message}`,
              icon: 'success',
              timer: 6000,
              button: 'Ok',
              confirmButtonColor: '#8CD4F5',
            });

            console.log(r);
          } else {
            document.getElementById('login__modal').style.display = 'block';
          }
        })
        .catch((err) => console.log(err));
    } else {
      document.getElementById('login__modal').style.display = 'block';
    }

    setProduct({
      product_category_id: '',
      product_price: '',
      status: 1,
      product_brand_id: '',
      discount: '',
      product_delivery_price: '',
      az: {
        product_name: '',
        product_description: '',
      },
      en: {
        product_name: '',
        product_description: '',
      },
      ru: {
        product_name: '',
        product_description: '',
      },
    });
    setImageURLs([]);
  };
  console.log(product);
  console.log(description);
  return (
    <div className='container-fluid'>
      <Card>
        <form onSubmit={handleSubmit(send)}>
          <GoBack text='Mehsullara geri dön' link='/profile/products' />
          <Card.Header name='Mehsul Elave Et' />
          <div className='row'>
            <div className='col-lg-4' style={{ bottom: ' 22px' }}>
              <Tab clas='pro-name' id='name'>
                <Tab.Page id='az-name' clas='pro-name' lang='az'>
                  <InputGroup
                    name='produc_name'
                    register={register({
                      required: {
                        value: true,
                        message: 'ad məcburidir',
                        type: 'text',
                      },
                    })}
                    label='Məhsulun adı'
                    onChange={getName_az}
                    type='text'
                    placeholder='azer'
                  />
                </Tab.Page>
                <Tab.Page
                  id='en-name'
                  style={{ display: 'none' }}
                  clas='pro-name'
                  lang='en'
                >
                  <InputGroup
                    label='Product Name'
                    onChange={getName_en}
                    type='text'
                    placeholder='eng'
                  />
                </Tab.Page>
                <Tab.Page
                  id='ru-name'
                  style={{ display: 'none' }}
                  clas='pro-name'
                  lang='ru'
                >
                  <InputGroup
                    label='Product Name'
                    onChange={getName_ru}
                    type='text'
                    placeholder='rus'
                  />
                </Tab.Page>
              </Tab>
              <SelectBox
                register={register({
                  required: { value: true, message: 'brendlər məcburidir' },
                })}
                label='Brendler'
                handleChange={getBrands}
                name='brands'
                firstopt="Seçin"
                options={brands}
              />
              <SelectBox
                register={register({
                  required: { value: true, message: 'kateqorya məcburidir' },
                })}
                label='Kateqoriyalar'
                handleChange={getCataegory}
                name='categoriya'
                firstopt="Seçin"
                options={categories}
              />

              {subcat.length > 1 ? (
                <SelectBox
                  label='Alt Kateqoriya'
                  handleChange={getSubCataegory}
                  name='subcategory'
                  options={subcat}
                />
              ) : null}
              {childcat.length > 1 ? (
                <SelectBox
                  label='Alt Kateqoriya'
                  handleChange={getChildCataegory}
                  name='subcategory'
                  options={childcat}
                />
              ) : null}

              <InputGroup
                register={register({
                  required: {
                    value: true,
                    message: 'qiymət məcburidir',
                    type: Number,
                  },
                  min: 0,
                  max: { value: 9999, message: 'max deyer 9999' },
                })}
                label='Məhsulun Qiyməti'
                min='0'
                onChange={getPrice}
                type='number'
                name='price'
              />
              <InputGroup
                label='Endirim Faizi(%)'
                min='0'
                max='95'
                onChange={getDiscount}
                type='number'
                name='discount'
              />
            </div>
            <div className='col-lg-6'>
              <Tab clas='pro-desc'  style={{position: 'relative', bottom: '18px'}}  id='desc'>
                <Tab.Page id='az-desc' clas='pro-desc' lang='az'>
                  <JoditEditor
                    value={description.az.product_description}
                    name='product_description'
                    ref={register({
                      required: { value: true, message: 'teyinat məcburidir' },
                    })}
                    onChange={(e)=>getDescription_az(description,e)}
                  />
                </Tab.Page>
                <Tab.Page
                  id='en-desc'
                  style={{ display: 'none' }}
                  clas='pro-desc'
                  lang='az'
                >
                  <JoditEditor
                    value={description.en.product_description}
                    onChange={getDescription_en}
                  />
                </Tab.Page>
                <Tab.Page
                  id='ru-desc'
                  style={{ display: 'none' }}
                  clas='pro-desc'
                  lang='az'
                >
                  <JoditEditor
                    value={description.ru.product_description}
                    onChange={getDescription_ru}
                  />
                </Tab.Page>
              </Tab>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <Card>
                <Card.Header name='Mehsul Resimlerini Elave Edin' />
                <div>
                  <small>
                    Rəsimləri toplu halda seçərək əlavə edə biilərsiniz.
                  </small>{' '}
                </div>
                <br />
                <div className='d-f'>
                  {imageURLs.map((x) => {
                    return (
                      <CompanyMiniImage thum_img={x.product_image}>
                        <ButtonDropDown onchange={removeImage} />
                      </CompanyMiniImage>
                    );
                  })}
                  <FileInput
                    name='image'
                    register={register({
                      required: {
                        value: true,
                        message: 'qiymət məcburidir',
                        type: 'file',
                      },
                    })}
                    onchange={imageLoad}
                  />
                </div>
              </Card>
              <div className='col-lg-6'>
              <Button name='Əlavə Et' type='submit' className='bg-primary txt--light' />
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default React.memo(CreateProduct);
