# coding: utf-8
import requests, json, logging
from tokenize import group
from werkzeug.urls import url_join

from odoo import api, fields, service, models, _
from odoo.exceptions import ValidationError

_logger = logging.getLogger(__name__)


class PaymentProvider(models.Model):
    _inherit = "payment.provider"

    code = fields.Selection(
        selection_add=[("paystack", "Paystack")], ondelete={"paystack": "set default"}
    )
    pstack_public_key = fields.Char(
        required_if_provider="paystack", groups="base.group_user"
    )
    pstack_secret_key = fields.Char(
        required_if_provider="paystack", groups="base.group_system"
    )

    @api.model
    def _get_paystack_api_url(self):
        self.ensure_one()
        """ PaystackURLs"""
        return "https://api.paystack.co"

    def _pstack_get_request(self, endpoint, method="GET", offline=False):
        self.ensure_one()

        url = url_join("https://api.paystack.co", endpoint)
        headers = {
            "AUTHORIZATION": f"Bearer {self.pstack_secret_key}",
            "Content-Type": "application/json",
        }

        try:
            response = requests.request(
                method, url, data=None, headers=headers, timeout=60
            )
            response.raise_for_status()
        except requests.exceptions.RequestException:
            _logger.exception("Unable to communicate with Paystack: %s", url)
            raise ValidationError(
                "Paystack: " + _("Could not establish the connection to the API.")
            )
        return response.json()
