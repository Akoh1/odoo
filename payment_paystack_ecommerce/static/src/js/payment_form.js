
odoo.define('payment_paystack.payment_form', require => {
    'use strict';

    const checkoutForm = require('payment.checkout_form');
    const manageForm = require('payment.manage_form');
    const ajax = require('web.ajax');
    const core = require('web.core');
    const qweb = core.qweb;
    const _t = core._t;

    const PaystackMixin = {
        /**
         * Allow forcing redirect to authorization url for Paystack payment flow.
         *
         * @override method from payment.payment_form_mixin
         * @private
         * @param {string} provider - The code of the payment provider
         * @param {number} paymentOptionId - The id of the payment option handling the transaction
         * @param {object} processingValues - The processing values of the transaction
         * @return {undefined}
         */
        _processRedirectPayment: function(code, providerId, processingValues) {
            if (code !== 'paystack') {
                return this._super(...arguments);
            }

            console.log('processingValues: ', processingValues);
        
            try {
                const handler = new PaystackPop();
                console.log("handler: ", handler);
                    
                handler.newTransaction({
                    key: processingValues['pub_key'], // Replace with your public key
                    email: processingValues['email'],
                    currency: 'NGN',
                    // currency: processingValues['currency'],
                    amount: processingValues['amount'] * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
                    ref: processingValues['reference'],

                    onSuccess: (transaction) => { 
                        // Payment complete!
                        console.log("Response: " + transaction);
                        
                        ajax.jsonRpc("/payment/paystack/checkout/return", 'call', {
                            data: transaction,
                            // ref: response.reference;
                        }).then(function(data){
                            // window.location.href = data;
                            console.log("Payment Successful: " + data);
                            window.location.href = data;
                            
                        }).catch(function(data){
                            var msg = data && data.data && data.data.message;
                            console.log("msg: ", msg);
                            
                            var wizard = $(qweb.render('paystack.error', {'msg': msg || _t('Payment error')}));
                            wizard.appendTo($('body')).modal({'keyboard': true});
                        });
                    },
                    onCancel: () => {
                        // user closed popup
                        console.log("Transaction was not completed, window closed.");
                    },
                    onError: (error) => {
                        console.log("Error: ", error.message);
                        var msg = error && error.message || _t('Payment initialization error');
                        var wizard = $(qweb.render('paystack.error', {'msg': msg}));
                        wizard.appendTo($('body')).modal({'keyboard': true});
                    }
                });
            } catch (error) {
                console.error('Error initializing PaystackPop:', error);
                var msg = error && error.message || _t('Payment initialization error');
                var wizard = $(qweb.render('paystack.error', {'msg': msg}));
                wizard.appendTo($('body')).modal({'keyboard': true});
            }
        },
    };

    checkoutForm.include(PaystackMixin);
    manageForm.include(PaystackMixin);
});
