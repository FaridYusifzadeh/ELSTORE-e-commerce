import React from 'react'
import "../total_sum/total_sum.scss"
import Card from '../card/card.component'
const Total_Sum = (props) => {
    return (
        <Card className={props.class}>
            <div className="text--amount">
                <div className="text__amount--count  display__flex">
                    <h5>{props.amount}</h5>
                    <p>{props.totalPrice} AZN</p>
                </div>
                <div className="text__tax-count display__flex">
                    <p>ƏDV</p>
                    <p>{props.tax} %</p>
                </div>
                <div className="bord"></div>
            </div>
            <div className="text--delivery " >
                <div className="text__delivery--count display__flex">
                    <h5>{props.delivery} </h5>
                    <p>{props.deliveryAmount} AZN</p>
                </div>
                <p>Çatdırılma ünvanına əsasən hesablanacaq.</p>
                <div className="bord"></div>
            </div>
            <div className="text__total-sum display__flex">
                <h5>{props.total}</h5>
                <p>{props.totalCount} AZN</p>
            </div>
        </Card>
    )
}

export default Total_Sum;
