# -*- coding: utf-8 -*-
{
    "name": "Paystack Payment Provider",
    "category": "Accounting/Payment Providers",
    "version": "17.0.1.0.2",
    "summary": "Payment Provider: Custom Paystack Implementation",
    "author": "Samuel Akoh <ojima.asm@gmail.com>",
    "description": """Custom Paystack Payment Provider""",
    "depends": ["payment"],
    "data": [
        # 'security/ir.model.access.csv',
        "views/payment_provider_views.xml",
        "views/payment_templates.xml",
        "data/payment_provider_data.xml",
    ],
    "images": ["static/description/*.png"],
    "application": True,
    "uninstall_hook": "uninstall_hook",
    "installable": True,
    "assets": {
        "web.assets_frontend": [
            "payment_paystack_ecommerce/static/src/js/payment_form.js",
            "payment_paystack_ecommerce/static/src/xml/paystack_template.xml",
        ],
    },
    "license": "LGPL-3",
}
