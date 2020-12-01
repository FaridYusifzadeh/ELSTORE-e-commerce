import React from 'react'

import './Deliver-info.component.scss';

import Db from '../../contexts/delivery_Info.json';

const data = Db.deliver;

function DeliverInfo() {
    return (
        <section className="deliver__info__section">
            {
                data.map(s=>(
                    <div>
                        <div className="deliver__info__title">
                            <h4>{s.title}</h4>
                        </div>
                        <div className="deliver__info__content__section">
                            {
                                s.deliveryChild.map(f=>(
                                    <div className="deliver__info__content">
                                        <p>{f.title}</p>
                                        <ul>
                                            {
                                                f.description.map(a=>(
                                                    <li>{a.description_child}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </section>
    )
}

export default DeliverInfo;
