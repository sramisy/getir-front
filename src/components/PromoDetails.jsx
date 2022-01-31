import React from 'react';

import promo from '../assets/images/promotion-1.jpeg';

function PromoDetails() {
    return (
        <div>
            <figure>
                <img src={promo} alt="Promo 1" className="w-full rounded-lg" />
            </figure>

            <h2 className="text-lg text-primary font-semibold mt-6">Get 30 TL discount on your first Getir order!</h2>
            <h4 className="text-sm text-gray-dark mt-4">On your order over 35 TL, 30 TL discount will be applied.</h4>

            <h4 className="text-sm text-gray-dark font-semibold mt-4">Campaign Details</h4>

            <p className="text-sm text-black mt-10">
                • On orders above 35 TL, 30 TL discount will be applied.
                <br /> <br />
                Example 1: Basket amount 35 TL =&gt; 5 TL will be charged.
                <br /> <br />
                Example 2: Basket amount 40 TL =&gt; 10 TL will be charged.
                <br /> <br />
                Example 3: Basket amount 45 TL =&gt;15 TL will be charged.
                <br /> <br />
                • No maximum order limit.
                <br /> <br />
                • Valid once per user from the same device and credit card.
                <br /> <br />
                • Getir reserves the right to change promotion conditions.
                <br /> <br />
                • Cannot be joined with other promotions. After this promo, any preceding promotions can be redeemed.
                <br /> <br />
                • This campaign is defined to you automatically and may change instantly. Getir’s responsibility regarding the validity of the campaign is limited to 15 minutes after this campaign is defined to you.
            </p>
        </div>
    );
}

export default PromoDetails;
