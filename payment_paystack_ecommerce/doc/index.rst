============================
Paystack Payment for odoo
============================

Installation
------------

This addon can be installed as any other regular Odoo addon:

- Unzip the addon in one of Odoo's addons paths.
- Login to Odoo as a user with administrative privileges, go into debug mode.
- Go to *Apps -> Update Apps List*, click *Update* in the dialog window.
- Go to *Apps -> Apps*, remove the *Apps* filter in the search bar and search
  for *Paystack Payment Acquirer*. Click *Install* button on the addon.


.. note:: You you would like to use the payment acquirer in the eCommerce shop,
    make sure the *eCommerce* module (*website_sale*) is installed as well.

Configuration
-------------

Before configuring the Paystack payment acquirer, register an account on
 `paystack.com`_ for a test account and login.

Once you have logged in, click on the settings menu at the bottom left
corner of the page and select *API*.

.. image:: api_settings.png
    :alt: API Settings page.
    :class: img-responsive img-thumbnail

In this window:

- Copy the values in your Public key .
- Copy the values in your Secret key.
.

.. note:: Use the credentials on the live mode to test on odoo production servers 
and use the credentials on the test mode to test on Odoo test servers.


Now, let's configure the payment acquirer:

- Login to Odoo as a user with administrative privileges, go into debug mode.

.. image:: images/paystack-v17-1.png
    :alt: Payment Methods page.
    :class: img-responsive img-thumbnail

.. image:: images/paystack-v17-2.png
    :alt: Paystack Method Form
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnailpaystack-v17-3

    .. image:: images/paystack-v17-3.png
    :alt: Paystack Provider
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail

    .. image:: images/paystack-v17-4.png
    :alt: Paystack Provider kanban view
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail

    .. image:: images/paystack-v17-5.png
    :alt: Paystack Provider Form
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail

    .. image:: images/paystack-v17-6.png
    :alt: Confirm Order page
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail

    .. image:: images/paystack-v17-7.png
    :alt: Paystack payment window
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail

    .. image:: images/paystack-v17-8.png
    :alt: Paystack transaction
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail

    .. image:: images/paystack-v17-9.png
    :alt: Paystack transaction list
    :width: 500px
    :height: 300px
    :scale: 50%
    :align: center
    :class: img-responsive img-thumbnail


