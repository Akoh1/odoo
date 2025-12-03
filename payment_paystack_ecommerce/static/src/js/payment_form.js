/** @odoo-module */

import { _t } from '@web/core/l10n/translation';
import paymentForm from '@payment/js/payment_form';

paymentForm.include({
    /**
     * Redirect to Paystack payment flow using PaystackPop inline checkout.
     *
     * @override method from @payment/js/payment_form
     * @private
     * @param {string} code - The provider code
     * @param {number} paymentOptionId - The id of the payment option handling the transaction
     * @param {object} processingValues - The processing values of the transaction
     * @return {void}
     */
    async _processRedirectFlow(providerCode, paymentOptionId, paymentMethodCode, processingValues) {
        if (providerCode !== 'paystack') {
            return this._super(...arguments);
        }

        console.log('processingValues: ', processingValues);

        try {
            const handler = new PaystackPop();
            console.log("handler: ", handler);

            handler.newTransaction({
                key: processingValues['pub_key'],
                email: processingValues['email'],
                // currency: processingValues['currency'],
                amount: processingValues['amount'] * 100, // Convert to lowest currency unit (kobo)
                ref: processingValues['reference'],

                onSuccess: async (transaction) => {
                    console.log("Response: ", transaction);

                    try {
                        const response = await this.rpc("/payment/paystack/checkout/return", {
                            data: transaction,
                        });
                        console.log("Payment Successful: ", response);
                        window.location.href = response;
                    } catch (error) {
                        const msg = error && error.data && error.data.message;
                        console.log("msg: ", msg);
                        this._displayErrorDialog(
                            _t("Payment Error"),
                            msg || _t('Payment processing failed')
                        );
                    }
                },
                onCancel: () => {
                    console.log("Transaction was not completed, window closed.");
                    this._displayErrorDialog(
                        _t("Payment Cancelled"),
                        _t('You cancelled the payment. Please try again.')
                    );
                    this._enableButton();
                },
                onError: (error) => {
                    console.log("Error: ", error.message);
                    this._displayErrorDialog(
                        _t("Payment Error"),
                        error && error.message || _t('Payment initialization error')
                    );
                    this._enableButton();
                }
            });
        } catch (error) {
            console.error('Error initializing PaystackPop:', error);
            this._displayErrorDialog(
                _t("Payment Error"),
                error && error.message || _t('Payment initialization error')
            );
            this._enableButton();
        }
    },
});
