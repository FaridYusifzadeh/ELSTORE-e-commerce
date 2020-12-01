import React, { useEffect } from 'react'
import './faq.component.scss'


function Faq() {

    
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="faq_title">
                            <h1>Tez-tez verilən suallar</h1>
                        </div>
                        <div className="faq_accordion">
                            <button class="accordion">Sual nümunəsi 1</button>
                            <div class="panel">
                                <p>It is a long established fact that a reader will be distracted by the readable content 
                                    of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less 
                                    normal distribution of letters, 
                                    as opposed to using 'Content here, content here', making it look like readable English.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq
