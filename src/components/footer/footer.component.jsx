import React from "react";
import "../footer/footer.styles.scss"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    
      <footer >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-xs-6 ">
                <div className="all__footer">
                    <div className="footer_category">
                        <div className="footer_items">
                              <h4>El Store</h4>
                              <ul>
                                <Link to='/about'>El Store haqqında</Link>
                              </ul>
                        </div>
                        <div className="footer_items">
                              <h4>Saytın xəritəsi</h4>
                              <ul>
                                <Link to="/shops">Mağazalar</Link>
                                <Link to="/campaigns">Kampaniyalar</Link>
                                <Link to="/faq">Tez-tez verilən suallar</Link>
                                <Link to="/contact">Əlaqə</Link>
                              </ul>
                        </div>
                        <div className="footer_items">
                              <h4>Partnyorluq</h4>
                              <ul>
                                <Link to="/open-store">Mağaza sahibi ol</Link>
                                <Link to="/worked-delivery">Kuryer olaraq çalış</Link>
                                
                              </ul>
                        </div>
                        <div className="footer_items">
                              <h4>Saytdan istifadə</h4>
                              <ul>
                                <Link to='/term-of-use'>İstifadə şərtləri</Link>
                                <Link to='/confidentiality'>Konfidensiallıq siyasəti</Link>
                              </ul>
                        </div>
                        <div className="footer_items">
                              <h4>Bizi izləyin</h4>
                              <ul>
                                <div>
                                  <img src={require('../../assets/images/icons/fb.svg')} alt=""/>
                                  <a href="">Facebook</a>
                                </div>
                                <div>
                                  <img src={require('../../assets/images/icons/insta.svg')} alt=""/>
                                  <a href="https://instagram.com/elstore.az?igshid=47ih700ovucw" target="_blank">İnstagram</a>
                                </div>
                                
                              </ul>
                        </div>
                    </div>
                    <div className="copy_write">
                        <p>© 2020 Elstore.</p>
                    </div>
                </div>
              
              </div>
            </div>
          </div>
      </footer>
   
  );
};

export default Footer;
