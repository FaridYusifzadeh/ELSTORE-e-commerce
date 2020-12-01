import React from 'react'
import GoBack from '../components/go-back/go-back.component'
import Card from '../components/card/card.component'
import '../assets/sass/pages/about.scss'

function About() {
 return (
  <div>
   <Card>
   <GoBack text='ƏSAS SƏHİFƏYƏ GERİ DÖN' link='/' className='pd-left' />
   <br/>
   <h1>Haqqımızda</h1>
   <br/>
   <br/>
   <div className='about_paragraph'>
   <h2>Biz kimik?</h2>
   <br/>
   <p>
   El Store onlayn mağazası ölkə ərazisində mövcud olan istehsalçılar və mağazaların mərkəzləşdirilmiş məhsul satışı platformasıdır.
İstidaçilərimizə geniş məhsul çeşidləri təqdim etməklə bərabər bu məhsulların istifadəçilərimizin rahatlıqla əldə etməsini təmin etmək üçün rahat ödəmə və çatdırılma üsulları təgdim edirik.
   </p> 
   </div>
   <div className='about_paragraph'>
   <h2>Missiyamız</h2>
   <br/>
   <p>
   Ölkənin  ərazisində olan bütün istehsalçı və ticarətlə məşqul olan insanların öz bizneslərini inkişaf etdirmələrini təmin etməklə müstərilərimizə geniş məhsul çeşidi təqdim etmək.
   </p> 
   </div>
   <div className='about_paragraph'>
   <h2>Bizim saytımız kimlər üçündür?</h2>
   <br/>
      <div className='about_paragraph'>
      <h3>Alıcılar</h3>
      <br/>
        <p>
        Evindən çıxmadan saytımızda təqdim edilən məhsulları rahatlıqla əldə edə bilərlər
        </p>
      </div>
      <div className='about_paragraph'>
      <h3>Fərdi satıcılar</h3>
      <br/>
        <p>
        Mağaza sahibi olmayan lakin fərdi istehsalçı ya da məhsul sahibi insanlar öz məhsullarını rahatlıqla bizim sayt vasitəsi ilə geniş müstəri kütləmizə təqdim edə bilər
        </p>
      </div>
      <div className='about_paragraph'>
      <h3>Mağaza sahibləri</h3>
      <br/>
        <p>
        Mağaza sahibləri öz bizneslərini onlayn mühitə daşıma prosesini bizim sayt vasitəsi ilə rahatlıq təmin edə bilərlər.Biz onlara xüsusi təkliflərlə məhsullarını rahatlıqla müştərilərinə təqdim edə bilmələri üçün şərait yaradırıq
        </p>
      </div>
      <div className='about_paragraph'>
      <h3>Kuryerlər</h3>
      <br/>
        <p>
        Fərdi olaraq kuryer fəaliyyəti ilə məşqul olmaq istəyən vətəndaşlarımız bizim platforma vasitəsi ilə iş sahibi olaraq gəlir əldə edə bilərlər
        </p>
      </div>
   </div>
   </Card>
  </div>
 )
}

export default About
